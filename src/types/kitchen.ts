export interface Material {
  id: string;
  name: string;
  unit: string;
  price: number;
  category: string;
}

export interface HardwareItem {
  id: string;
  name: string;
  unit: string;
  price: number;
  category: string;
}

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

export interface MaterialLine {
  id: string;
  materialId: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
}

export interface HardwareLine {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
}

export interface KitchenProject {
  id: string;
  name: string;
  clientName: string;
  clientPhone: string;
  createdAt: string;
  materials: MaterialLine[];
  hardware: HardwareLine[];
  workCost: number;
  notes: string;
  totalCost: number;
  status: 'draft' | 'sent' | 'approved' | 'completed';
}

export interface Template {
  id: string;
  name: string;
  description: string;
  materials: MaterialLine[];
  hardware: HardwareLine[];
  workCost: number;
}
