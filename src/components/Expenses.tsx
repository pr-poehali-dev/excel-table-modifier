import { ExpenseConfig } from '@/types/kitchen';
import Icon from '@/components/ui/icon';

interface ExpensesProps {
  expenses: ExpenseConfig;
  onChange: (e: ExpenseConfig) => void;
}

interface Field {
  key: keyof ExpenseConfig;
  label: string;
  hint: string;
  suffix: string;
  icon: string;
  color: string;
  min: number;
  max?: number;
  step: number;
}

const FIELDS: Field[] = [
  { key: 'staffPercent', label: 'Процент сотрудникам', hint: 'От суммы материалов + работ', suffix: '%', icon: 'Users', color: 'bg-blue-100 text-blue-600', min: 0, max: 100, step: 1 },
  { key: 'installPercent', label: 'Монтаж и установка', hint: 'Процент за выезд и монтаж', suffix: '%', icon: 'Wrench', color: 'bg-green-100 text-green-600', min: 0, max: 100, step: 1 },
  { key: 'taxPercent', label: 'Налоги', hint: 'УСН или ОСНО ставка', suffix: '%', icon: 'Receipt', color: 'bg-red-100 text-red-600', min: 0, max: 30, step: 0.5 },
  { key: 'marginPercent', label: 'Маржа (прибыль)', hint: 'Желаемая наценка на итог', suffix: '%', icon: 'TrendingUp', color: 'bg-emerald-100 text-emerald-600', min: 0, max: 200, step: 1 },
  { key: 'rentMonthly', label: 'Аренда в месяц', hint: 'Офис, склад, шоурум', suffix: '₽', icon: 'Building2', color: 'bg-purple-100 text-purple-600', min: 0, step: 500 },
  { key: 'adsMonthly', label: 'Реклама в месяц', hint: 'Яндекс, ВКонтакте, Instagram', suffix: '₽', icon: 'Megaphone', color: 'bg-orange-100 text-orange-600', min: 0, step: 500 },
  { key: 'otherMonthly', label: 'Прочие расходы в месяц', hint: 'Коммунальные, интернет, ПО', suffix: '₽', icon: 'MoreHorizontal', color: 'bg-slate-100 text-slate-600', min: 0, step: 500 },
  { key: 'deliveryBase', label: 'Доставка за заказ', hint: 'Фиксированная сумма за доставку', suffix: '₽', icon: 'Truck', color: 'bg-cyan-100 text-cyan-600', min: 0, step: 100 },
  { key: 'ordersPerMonth', label: 'Заказов в месяц', hint: 'Для распределения накладных', suffix: 'шт', icon: 'ClipboardList', color: 'bg-amber-100 text-amber-600', min: 1, step: 1 },
];

export default function Expenses({ expenses, onChange }: ExpensesProps) {
  const update = (key: keyof ExpenseConfig, val: number) => {
    onChange({ ...expenses, [key]: val });
  };

  const monthlyFixed = expenses.rentMonthly + expenses.adsMonthly + expenses.otherMonthly;
  const perOrder = monthlyFixed / Math.max(expenses.ordersPerMonth, 1);

  const percents = [
    { label: 'Сотрудники', val: expenses.staffPercent, color: 'bg-blue-400' },
    { label: 'Монтаж', val: expenses.installPercent, color: 'bg-green-400' },
    { label: 'Налоги', val: expenses.taxPercent, color: 'bg-red-400' },
    { label: 'Маржа', val: expenses.marginPercent, color: 'bg-emerald-400' },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Сводка */}
      <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
        <h2 className="section-title mb-4">Сводка накладных расходов</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {percents.map(p => (
            <div key={p.label} className="bg-muted rounded-xl p-3">
              <div className="text-2xl font-display font-black text-foreground">{p.val}%</div>
              <div className="text-xs text-muted-foreground mt-0.5">{p.label}</div>
              <div className={`h-1.5 rounded-full mt-2 ${p.color}`} style={{ width: `${Math.min(p.val * 2, 100)}%` }} />
            </div>
          ))}
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
          <Icon name="Calculator" size={20} className="text-amber-600 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">Накладные на 1 заказ: <span className="text-primary">{perOrder.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽</span></p>
            <p className="text-xs text-muted-foreground">Фиксированные расходы {monthlyFixed.toLocaleString('ru-RU')} ₽ / {expenses.ordersPerMonth} заказов</p>
          </div>
        </div>
      </div>

      {/* Поля настройки */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIELDS.map(f => (
          <div key={f.key} className="bg-white rounded-2xl border border-border p-4 shadow-sm card-hover">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${f.color}`}>
                <Icon name={f.icon} size={16} />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{f.label}</p>
                <p className="text-xs text-muted-foreground">{f.hint}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="input-field text-lg font-bold flex-1"
                value={expenses[f.key]}
                min={f.min}
                max={f.max}
                step={f.step}
                onChange={e => update(f.key, parseFloat(e.target.value) || 0)}
              />
              <span className="text-sm font-medium text-muted-foreground w-8 text-center">{f.suffix}</span>
            </div>
            {f.suffix === '%' && (
              <input
                type="range"
                className="w-full mt-2 accent-primary"
                min={f.min}
                max={f.max ?? 100}
                step={f.step}
                value={expenses[f.key]}
                onChange={e => update(f.key, parseFloat(e.target.value))}
              />
            )}
          </div>
        ))}
      </div>

      <div className="text-xs text-muted-foreground text-center pb-2">
        Настройки сохраняются автоматически и применяются ко всем новым расчётам
      </div>
    </div>
  );
}
