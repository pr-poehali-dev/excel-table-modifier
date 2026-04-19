// ─── Каталог материалов ───────────────────────────────────────────────────────

export interface PriceVariant {
  id: string;
  label: string;       // "Матовая", "Глянцевая", "600мм", "20мм"
  price: number;
  unit: string;        // "м²", "п.м.", "шт"
}

export interface MaterialGroup {
  id: string;
  name: string;        // "Плёнка", "Эмаль", "Постформинг"
  description?: string;
  variants: PriceVariant[];
}

export interface MaterialCategory {
  id: string;
  name: string;        // "Фасады", "Столешницы", "Корпус", "Фурнитура"
  icon: string;
  color: string;
  groups: MaterialGroup[];
}

// ─── Строка расчёта ──────────────────────────────────────────────────────────

export interface ProjectLine {
  id: string;
  categoryId: string;
  categoryName: string;
  groupName: string;
  variantLabel: string;
  quantity: number;
  unit: string;
  price: number;
}

// ─── Расходы ─────────────────────────────────────────────────────────────────

export interface ExpenseConfig {
  staffPercent: number;
  rentMonthly: number;
  adsMonthly: number;
  taxPercent: number;
  deliveryBase: number;
  installPercent: number;
  otherMonthly: number;
  ordersPerMonth: number;
  marginPercent: number;
}

// ─── Проект ──────────────────────────────────────────────────────────────────

export interface KitchenProject {
  id: string;
  name: string;
  clientName: string;
  clientPhone: string;
  createdAt: string;
  lines: ProjectLine[];
  workCost: number;
  notes: string;
  totalCost: number;
  status: 'draft' | 'sent' | 'approved' | 'completed';
}

// ─── Шаблон ──────────────────────────────────────────────────────────────────

export interface Template {
  id: string;
  name: string;
  description: string;
  lines: ProjectLine[];
  workCost: number;
}
