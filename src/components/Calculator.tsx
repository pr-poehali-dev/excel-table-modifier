import { useState } from 'react';
import { ProjectLine, ExpenseConfig, KitchenProject, Template } from '@/types/kitchen';
import { CATALOG, DEFAULT_TEMPLATES } from '@/data/defaults';
import Icon from '@/components/ui/icon';

interface CalculatorProps {
  expenses: ExpenseConfig;
  onSaveProject: (project: KitchenProject) => void;
}

const generateId = () => Math.random().toString(36).slice(2, 10);

function calcExpensesPerOrder(exp: ExpenseConfig) {
  return (exp.rentMonthly + exp.adsMonthly + exp.otherMonthly) / Math.max(exp.ordersPerMonth, 1);
}

function AddLineDialog({ onAdd, onClose }: { onAdd: (line: ProjectLine) => void; onClose: () => void }) {
  const [catId, setCatId] = useState(CATALOG[0].id);
  const [groupId, setGroupId] = useState(CATALOG[0].groups[0].id);
  const [variantId, setVariantId] = useState(CATALOG[0].groups[0].variants[0].id);
  const [qty, setQty] = useState<number>(1);

  const cat = CATALOG.find(c => c.id === catId)!;
  const group = cat.groups.find(g => g.id === groupId) ?? cat.groups[0];
  const variant = group.variants.find(v => v.id === variantId) ?? group.variants[0];

  const handleCatChange = (id: string) => {
    const c = CATALOG.find(x => x.id === id)!;
    setCatId(id);
    setGroupId(c.groups[0].id);
    setVariantId(c.groups[0].variants[0].id);
  };

  const handleGroupChange = (id: string) => {
    const g = cat.groups.find(x => x.id === id)!;
    setGroupId(id);
    setVariantId(g.variants[0].id);
  };

  const isCountable = variant.unit === 'шт' || variant.unit === 'пара';

  const handleAdd = () => {
    onAdd({
      id: generateId(),
      categoryId: cat.id,
      categoryName: cat.name,
      groupName: group.name,
      variantLabel: variant.label,
      quantity: qty,
      unit: variant.unit,
      price: variant.price,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-white">
          <h3 className="font-display font-bold text-foreground">Добавить позицию</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1 transition-colors">
            <Icon name="X" size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Категория */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Категория</label>
            <div className="grid grid-cols-3 gap-2">
              {CATALOG.map(c => (
                <button
                  key={c.id}
                  onClick={() => handleCatChange(c.id)}
                  className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    catId === c.id
                      ? 'border-primary bg-accent text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${c.color}`}>
                    <Icon name={c.icon} size={14} />
                  </div>
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Группа */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Тип</label>
            <div className="grid grid-cols-2 gap-2">
              {cat.groups.map(g => (
                <button
                  key={g.id}
                  onClick={() => handleGroupChange(g.id)}
                  className={`text-left p-3 rounded-xl border text-sm transition-all ${
                    groupId === g.id
                      ? 'border-primary bg-accent'
                      : 'border-border hover:border-primary/40'
                  }`}
                >
                  <p className="font-semibold text-foreground leading-tight">{g.name}</p>
                  {g.description && (
                    <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{g.description}</p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Вариант */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Вариант</label>
            <div className="space-y-1.5">
              {group.variants.map(v => (
                <button
                  key={v.id}
                  onClick={() => setVariantId(v.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm transition-all ${
                    variantId === v.id
                      ? 'border-primary bg-accent'
                      : 'border-border hover:border-primary/40'
                  }`}
                >
                  <span className={`font-medium ${variantId === v.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {v.label}
                  </span>
                  <span className={`font-bold tabular-nums text-right ${variantId === v.id ? 'text-primary' : 'text-foreground'}`}>
                    {v.price.toLocaleString('ru-RU')} ₽/{v.unit}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Количество */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
              Количество ({variant.unit})
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty(q => Math.max(isCountable ? 1 : 0.1, parseFloat((q - (isCountable ? 1 : 0.1)).toFixed(1))))}
                className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors shrink-0"
              >
                <Icon name="Minus" size={16} />
              </button>
              <input
                type="number"
                className="input-field text-center text-xl font-bold flex-1"
                value={qty}
                min={isCountable ? 1 : 0.1}
                step={isCountable ? 1 : 0.1}
                onChange={e => setQty(parseFloat(e.target.value) || 0)}
              />
              <button
                onClick={() => setQty(q => parseFloat((q + (isCountable ? 1 : 0.1)).toFixed(1)))}
                className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors shrink-0"
              >
                <Icon name="Plus" size={16} />
              </button>
            </div>
            <div className="mt-3 p-3 bg-muted rounded-xl text-center">
              <span className="text-sm text-muted-foreground">Сумма: </span>
              <span className="font-display font-black text-lg text-primary">
                {(qty * variant.price).toLocaleString('ru-RU')} ₽
              </span>
            </div>
          </div>
        </div>

        <div className="px-5 pb-5 sticky bottom-0 bg-white pt-2 border-t border-border">
          <button
            onClick={handleAdd}
            className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-sm"
          >
            Добавить в расчёт
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Calculator({ expenses, onSaveProject }: CalculatorProps) {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [projectName, setProjectName] = useState('');
  const [notes, setNotes] = useState('');
  const [lines, setLines] = useState<ProjectLine[]>([]);
  const [workCost, setWorkCost] = useState<number>(0);
  const [showAdd, setShowAdd] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [saved, setSaved] = useState(false);

  const addLine = (line: ProjectLine) => setLines(prev => [...prev, line]);
  const removeLine = (id: string) => setLines(prev => prev.filter(l => l.id !== id));
  const updateQty = (id: string, qty: number) =>
    setLines(prev => prev.map(l => l.id === id ? { ...l, quantity: qty } : l));
  const updatePrice = (id: string, price: number) =>
    setLines(prev => prev.map(l => l.id === id ? { ...l, price } : l));

  const loadTemplate = (tpl: Template) => {
    setLines(tpl.lines.map(l => ({ ...l, id: generateId() })));
    setWorkCost(tpl.workCost);
    setProjectName(tpl.name);
    setShowTemplates(false);
  };

  const grouped = CATALOG.map(cat => ({
    cat,
    lines: lines.filter(l => l.categoryId === cat.id),
  })).filter(g => g.lines.length > 0);

  const materialTotal = lines.reduce((s, l) => s + l.quantity * l.price, 0);
  const subtotal = materialTotal + workCost;
  const expensePerOrder = calcExpensesPerOrder(expenses);
  const installCost = subtotal * (expenses.installPercent / 100);
  const staffCost = subtotal * (expenses.staffPercent / 100);
  const taxCost = subtotal * (expenses.taxPercent / 100);
  const baseTotal = subtotal + expensePerOrder + installCost + staffCost + taxCost + expenses.deliveryBase;
  const marginCost = baseTotal * (expenses.marginPercent / 100);
  const totalCost = baseTotal + marginCost;

  const handleSave = () => {
    const project: KitchenProject = {
      id: generateId(),
      name: projectName || `Кухня от ${new Date().toLocaleDateString('ru')}`,
      clientName,
      clientPhone,
      createdAt: new Date().toISOString(),
      lines,
      workCost,
      notes,
      totalCost,
      status: 'draft',
    };
    onSaveProject(project);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const fmt = (n: number) => n.toLocaleString('ru-RU', { maximumFractionDigits: 0 }) + ' ₽';

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Клиент */}
      <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Новый расчёт</h2>
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
          >
            <Icon name="LayoutTemplate" size={15} />
            Шаблоны
          </button>
        </div>

        {showTemplates && (
          <div className="mb-4 p-4 bg-muted rounded-xl border border-border animate-fade-in">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Выберите шаблон</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {DEFAULT_TEMPLATES.map(tpl => (
                <button
                  key={tpl.id}
                  onClick={() => loadTemplate(tpl)}
                  className="text-left p-3 bg-white rounded-xl border border-border hover:border-primary hover:shadow-sm transition-all"
                >
                  <p className="font-semibold text-sm text-foreground">{tpl.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{tpl.description}</p>
                  <p className="text-xs font-bold text-primary mt-2">{tpl.lines.length} позиций</p>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Название проекта</label>
            <input className="input-field" placeholder="Кухня Ивановых" value={projectName} onChange={e => setProjectName(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Клиент</label>
            <input className="input-field" placeholder="Иванов Иван" value={clientName} onChange={e => setClientName(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Телефон</label>
            <input className="input-field" placeholder="+7 900 000 00 00" value={clientPhone} onChange={e => setClientPhone(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Позиции */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">Позиции расчёта</h3>
            {lines.length > 0 && <span className="badge-amber">{lines.length} поз.</span>}
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-1.5 text-sm px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-semibold shadow-sm"
          >
            <Icon name="Plus" size={15} />
            Добавить
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-3">
              <Icon name="PackageOpen" size={28} className="opacity-40" />
            </div>
            <p className="font-medium text-foreground">Расчёт пустой</p>
            <p className="text-sm mt-1">Нажмите «Добавить» или выберите шаблон</p>
          </div>
        ) : (
          <div>
            {/* Шапка таблицы */}
            <div className="grid grid-cols-12 gap-2 px-5 py-2 bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
              <div className="col-span-5">Позиция</div>
              <div className="col-span-2 text-center">Кол-во</div>
              <div className="col-span-1 text-center">Ед.</div>
              <div className="col-span-2 text-right">Цена</div>
              <div className="col-span-1 text-right">Сумма</div>
              <div className="col-span-1" />
            </div>

            {grouped.map(({ cat, lines: catLines }) => (
              <div key={cat.id}>
                <div className="flex items-center gap-2 px-5 py-2 border-b border-border bg-muted/20">
                  <div className={`w-5 h-5 rounded flex items-center justify-center ${cat.color}`}>
                    <Icon name={cat.icon} size={11} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{cat.name}</span>
                  <span className="ml-auto text-xs font-bold text-foreground">
                    {fmt(catLines.reduce((s, l) => s + l.quantity * l.price, 0))}
                  </span>
                </div>

                {catLines.map(line => (
                  <div key={line.id} className="grid grid-cols-12 gap-2 px-5 py-2.5 items-center border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <div className="col-span-5 min-w-0">
                      <p className="text-sm font-medium text-foreground leading-tight truncate">{line.groupName}</p>
                      <p className="text-xs text-muted-foreground leading-tight mt-0.5 truncate">{line.variantLabel}</p>
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        className="input-field text-sm text-center px-1"
                        value={line.quantity}
                        min={0}
                        step={line.unit === 'шт' || line.unit === 'пара' ? 1 : 0.1}
                        onChange={e => updateQty(line.id, parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="col-span-1 text-center">
                      <span className="text-xs text-muted-foreground">{line.unit}</span>
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        className="input-field text-sm text-right px-1"
                        value={line.price}
                        onChange={e => updatePrice(line.id, parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="col-span-1 text-right">
                      <span className="text-xs font-bold text-foreground tabular-nums">
                        {fmt(line.quantity * line.price)}
                      </span>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <button
                        onClick={() => removeLine(line.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded-lg hover:bg-red-50"
                      >
                        <Icon name="X" size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <div className="px-5 py-3 flex justify-between items-center bg-amber-50/50">
              <span className="text-sm text-muted-foreground">Итого по позициям</span>
              <span className="font-display font-bold text-base text-foreground">{fmt(materialTotal)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Работа + заметки */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <Icon name="Hammer" size={16} className="text-green-600" />
            </div>
            <h3 className="font-semibold text-foreground">Стоимость работ</h3>
          </div>
          <input
            type="number"
            className="input-field text-lg font-semibold"
            placeholder="0"
            value={workCost || ''}
            onChange={e => setWorkCost(parseFloat(e.target.value) || 0)}
          />
          <p className="text-xs text-muted-foreground mt-2">Сборка, монтаж, подключение</p>
        </div>
        <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <Icon name="FileText" size={16} className="text-purple-600" />
            </div>
            <h3 className="font-semibold text-foreground">Заметки</h3>
          </div>
          <textarea
            className="input-field resize-none h-20 text-sm"
            placeholder="Особые пожелания, условия..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </div>
      </div>

      {/* Итог */}
      <div className="bg-white rounded-2xl border-2 border-primary/20 shadow-sm overflow-hidden">
        <div className="px-5 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-primary/10">
          <h3 className="section-title text-primary">Итоговый расчёт</h3>
        </div>
        <div className="p-5 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Материалы и комплектующие</span>
            <span className="font-medium">{fmt(materialTotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Работа</span>
            <span className="font-medium">{fmt(workCost)}</span>
          </div>
          <div className="h-px bg-border my-2" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Сотрудники ({expenses.staffPercent}%)</span>
            <span className="font-medium text-amber-600">+ {fmt(staffCost)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Монтаж ({expenses.installPercent}%)</span>
            <span className="font-medium text-amber-600">+ {fmt(installCost)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Налоги ({expenses.taxPercent}%)</span>
            <span className="font-medium text-amber-600">+ {fmt(taxCost)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Накладные на заказ</span>
            <span className="font-medium text-amber-600">+ {fmt(expensePerOrder)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Доставка</span>
            <span className="font-medium text-amber-600">+ {fmt(expenses.deliveryBase)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Маржа ({expenses.marginPercent}%)</span>
            <span className="font-medium text-green-600">+ {fmt(marginCost)}</span>
          </div>
          <div className="h-px bg-border my-2" />
          <div className="flex justify-between items-center">
            <span className="font-display font-bold text-lg">ИТОГО</span>
            <span className="font-display font-black text-2xl text-primary">{fmt(totalCost)}</span>
          </div>
        </div>
        <div className="px-5 pb-5">
          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
          >
            <Icon name={saved ? 'Check' : 'Save'} size={18} />
            {saved ? 'Сохранено!' : 'Сохранить проект'}
          </button>
        </div>
      </div>

      {showAdd && <AddLineDialog onAdd={addLine} onClose={() => setShowAdd(false)} />}
    </div>
  );
}
