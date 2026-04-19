import { useState, useCallback } from 'react';
import { MaterialLine, HardwareLine, ExpenseConfig, KitchenProject, Template } from '@/types/kitchen';
import { DEFAULT_MATERIALS, DEFAULT_HARDWARE, DEFAULT_TEMPLATES } from '@/data/defaults';
import Icon from '@/components/ui/icon';

interface CalculatorProps {
  expenses: ExpenseConfig;
  onSaveProject: (project: KitchenProject) => void;
}

const generateId = () => Math.random().toString(36).slice(2, 10);

function calcExpensesPerOrder(exp: ExpenseConfig) {
  const monthlyFixed = exp.rentMonthly + exp.adsMonthly + exp.otherMonthly;
  return monthlyFixed / Math.max(exp.ordersPerMonth, 1);
}

export default function Calculator({ expenses, onSaveProject }: CalculatorProps) {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [projectName, setProjectName] = useState('');
  const [notes, setNotes] = useState('');
  const [materials, setMaterials] = useState<MaterialLine[]>([]);
  const [hardware, setHardware] = useState<HardwareLine[]>([]);
  const [workCost, setWorkCost] = useState<number>(0);
  const [saved, setSaved] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const materialsCost = materials.reduce((s, m) => s + m.quantity * m.price, 0);
  const hardwareCost = hardware.reduce((s, h) => s + h.quantity * h.price, 0);
  const subtotal = materialsCost + hardwareCost + workCost;
  const expensePerOrder = calcExpensesPerOrder(expenses);
  const installCost = subtotal * (expenses.installPercent / 100);
  const staffCost = subtotal * (expenses.staffPercent / 100);
  const taxCost = subtotal * (expenses.taxPercent / 100);
  const baseTotal = subtotal + expensePerOrder + installCost + staffCost + taxCost + expenses.deliveryBase;
  const marginCost = baseTotal * (expenses.marginPercent / 100);
  const totalCost = baseTotal + marginCost;

  const addMaterial = () => {
    const def = DEFAULT_MATERIALS[0];
    setMaterials(prev => [...prev, { id: generateId(), materialId: def.id, name: def.name, quantity: 1, unit: def.unit, price: def.price }]);
  };

  const updateMaterial = (id: string, field: keyof MaterialLine, value: string | number) => {
    setMaterials(prev => prev.map(m => {
      if (m.id !== id) return m;
      if (field === 'materialId') {
        const found = DEFAULT_MATERIALS.find(dm => dm.id === value);
        if (found) return { ...m, materialId: found.id, name: found.name, unit: found.unit, price: found.price };
      }
      return { ...m, [field]: value };
    }));
  };

  const removeMaterial = (id: string) => setMaterials(prev => prev.filter(m => m.id !== id));

  const addHardware = () => {
    const def = DEFAULT_HARDWARE[0];
    setHardware(prev => [...prev, { id: generateId(), name: def.name, quantity: 1, unit: def.unit, price: def.price }]);
  };

  const updateHardware = (id: string, field: keyof HardwareLine, value: string | number) => {
    setHardware(prev => prev.map(h => {
      if (h.id !== id) return h;
      if (field === 'name') {
        const found = DEFAULT_HARDWARE.find(dh => dh.name === value);
        if (found) return { ...h, name: found.name, unit: found.unit, price: found.price };
      }
      return { ...h, [field]: value };
    }));
  };

  const removeHardware = (id: string) => setHardware(prev => prev.filter(h => h.id !== id));

  const loadTemplate = (tpl: Template) => {
    setMaterials(tpl.materials.map(m => ({ ...m, id: generateId() })));
    setHardware(tpl.hardware.map(h => ({ ...h, id: generateId() })));
    setWorkCost(tpl.workCost);
    setProjectName(tpl.name);
    setShowTemplates(false);
  };

  const handleSave = () => {
    const project: KitchenProject = {
      id: generateId(),
      name: projectName || `Кухня от ${new Date().toLocaleDateString('ru')}`,
      clientName,
      clientPhone,
      createdAt: new Date().toISOString(),
      materials,
      hardware,
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
      {/* Шапка с клиентом */}
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
                  className="text-left p-3 bg-white rounded-lg border border-border hover:border-primary hover:shadow-sm transition-all"
                >
                  <p className="font-semibold text-sm text-foreground">{tpl.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{tpl.description}</p>
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

      {/* Материалы */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
              <Icon name="Layers" size={16} className="text-amber-600" />
            </div>
            <h3 className="font-semibold text-foreground">Материалы</h3>
            <span className="badge-amber">{materials.length} позиций</span>
          </div>
          <button onClick={addMaterial} className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
            <Icon name="Plus" size={14} />
            Добавить
          </button>
        </div>

        {materials.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="PackageOpen" size={36} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">Добавьте материалы или выберите шаблон</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            <div className="grid grid-cols-12 gap-2 px-5 py-2 bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <div className="col-span-5">Материал</div>
              <div className="col-span-2 text-center">Кол-во</div>
              <div className="col-span-2 text-center">Ед.</div>
              <div className="col-span-2 text-right">Цена/ед.</div>
              <div className="col-span-1"></div>
            </div>
            {materials.map(m => (
              <div key={m.id} className="grid grid-cols-12 gap-2 px-5 py-2.5 items-center hover:bg-muted/30 transition-colors">
                <div className="col-span-5">
                  <select
                    className="input-field text-sm"
                    value={m.materialId}
                    onChange={e => updateMaterial(m.id, 'materialId', e.target.value)}
                  >
                    {DEFAULT_MATERIALS.map(dm => (
                      <option key={dm.id} value={dm.id}>{dm.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    className="input-field text-sm text-center"
                    value={m.quantity}
                    min={0}
                    step={0.1}
                    onChange={e => updateMaterial(m.id, 'quantity', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="col-span-2">
                  <span className="text-sm text-muted-foreground text-center block">{m.unit}</span>
                </div>
                <div className="col-span-2 text-right">
                  <input
                    type="number"
                    className="input-field text-sm text-right"
                    value={m.price}
                    onChange={e => updateMaterial(m.id, 'price', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="col-span-1 flex justify-end">
                  <button onClick={() => removeMaterial(m.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                    <Icon name="X" size={14} />
                  </button>
                </div>
              </div>
            ))}
            <div className="px-5 py-3 flex justify-end bg-amber-50/50">
              <span className="text-sm font-semibold text-foreground">Итого: {fmt(materialsCost)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Комплектующие */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <Icon name="Settings2" size={16} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-foreground">Комплектующие и фурнитура</h3>
            <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{hardware.length} позиций</span>
          </div>
          <button onClick={addHardware} className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
            <Icon name="Plus" size={14} />
            Добавить
          </button>
        </div>

        {hardware.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="Wrench" size={36} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">Добавьте петли, ящики, ручки и фурнитуру</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            <div className="grid grid-cols-12 gap-2 px-5 py-2 bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <div className="col-span-5">Наименование</div>
              <div className="col-span-2 text-center">Кол-во</div>
              <div className="col-span-2 text-center">Ед.</div>
              <div className="col-span-2 text-right">Цена/ед.</div>
              <div className="col-span-1"></div>
            </div>
            {hardware.map(h => (
              <div key={h.id} className="grid grid-cols-12 gap-2 px-5 py-2.5 items-center hover:bg-muted/30 transition-colors">
                <div className="col-span-5">
                  <select
                    className="input-field text-sm"
                    value={h.name}
                    onChange={e => updateHardware(h.id, 'name', e.target.value)}
                  >
                    {DEFAULT_HARDWARE.map(dh => (
                      <option key={dh.id} value={dh.name}>{dh.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    className="input-field text-sm text-center"
                    value={h.quantity}
                    min={0}
                    onChange={e => updateHardware(h.id, 'quantity', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="col-span-2">
                  <span className="text-sm text-muted-foreground text-center block">{h.unit}</span>
                </div>
                <div className="col-span-2 text-right">
                  <input
                    type="number"
                    className="input-field text-sm text-right"
                    value={h.price}
                    onChange={e => updateHardware(h.id, 'price', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="col-span-1 flex justify-end">
                  <button onClick={() => removeHardware(h.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                    <Icon name="X" size={14} />
                  </button>
                </div>
              </div>
            ))}
            <div className="px-5 py-3 flex justify-end bg-blue-50/50">
              <span className="text-sm font-semibold text-foreground">Итого: {fmt(hardwareCost)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Работа и заметки */}
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
            placeholder="Особые пожелания, условия, договорённости..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </div>
      </div>

      {/* Итоговый блок */}
      <div className="bg-white rounded-2xl border-2 border-primary/20 shadow-sm overflow-hidden">
        <div className="px-5 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-primary/10">
          <h3 className="section-title text-primary">Итоговый расчёт</h3>
        </div>
        <div className="p-5 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Материалы</span>
            <span className="font-medium">{fmt(materialsCost)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Комплектующие</span>
            <span className="font-medium">{fmt(hardwareCost)}</span>
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
            <span className="text-muted-foreground">Накладные расходы (аренда, реклама и пр.)</span>
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
            <span className="font-display font-bold text-lg text-foreground">ИТОГО</span>
            <span className="font-display font-black text-2xl text-primary">{fmt(totalCost)}</span>
          </div>
        </div>
        <div className="px-5 pb-5 flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
          >
            <Icon name={saved ? 'Check' : 'Save'} size={18} />
            {saved ? 'Сохранено!' : 'Сохранить проект'}
          </button>
        </div>
      </div>
    </div>
  );
}
