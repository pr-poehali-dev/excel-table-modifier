import { Material, HardwareItem, ExpenseConfig, Template } from '@/types/kitchen';

export const DEFAULT_MATERIALS: Material[] = [
  { id: 'm1', name: 'ЛДСП 16мм', unit: 'м²', price: 850, category: 'Корпус' },
  { id: 'm2', name: 'ЛДСП 10мм (задняя стенка)', unit: 'м²', price: 520, category: 'Корпус' },
  { id: 'm3', name: 'Фасад МДФ эмаль', unit: 'м²', price: 4200, category: 'Фасады' },
  { id: 'm4', name: 'Фасад пластик HPL', unit: 'м²', price: 3100, category: 'Фасады' },
  { id: 'm5', name: 'Фасад шпон натуральный', unit: 'м²', price: 6500, category: 'Фасады' },
  { id: 'm6', name: 'Столешница ЛДСП 38мм', unit: 'п.м.', price: 1800, category: 'Столешница' },
  { id: 'm7', name: 'Столешница постформинг', unit: 'п.м.', price: 2400, category: 'Столешница' },
  { id: 'm8', name: 'Столешница искусственный камень', unit: 'п.м.', price: 8500, category: 'Столешница' },
  { id: 'm9', name: 'Кромка ПВХ 0.4мм', unit: 'п.м.', price: 18, category: 'Кромка' },
  { id: 'm10', name: 'Кромка ПВХ 2мм (торец)', unit: 'п.м.', price: 45, category: 'Кромка' },
];

export const DEFAULT_HARDWARE: HardwareItem[] = [
  { id: 'h1', name: 'Петля с доводчиком Blum', unit: 'шт', price: 420, category: 'Петли' },
  { id: 'h2', name: 'Петля стандартная', unit: 'шт', price: 85, category: 'Петли' },
  { id: 'h3', name: 'Выдвижной ящик Blum Tandembox', unit: 'шт', price: 2800, category: 'Ящики' },
  { id: 'h4', name: 'Выдвижной ящик стандарт', unit: 'шт', price: 680, category: 'Ящики' },
  { id: 'h5', name: 'Направляющие шариковые 35см', unit: 'пара', price: 180, category: 'Ящики' },
  { id: 'h6', name: 'Направляющие шариковые 45см', unit: 'пара', price: 220, category: 'Ящики' },
  { id: 'h7', name: 'Подъёмный механизм Aventos HK', unit: 'шт', price: 3200, category: 'Механизмы' },
  { id: 'h8', name: 'Конфирмат', unit: 'шт', price: 4, category: 'Крепёж' },
  { id: 'h9', name: 'Евровинт + заглушка', unit: 'шт', price: 8, category: 'Крепёж' },
  { id: 'h10', name: 'Мебельная ножка регулируемая', unit: 'шт', price: 35, category: 'Ножки' },
  { id: 'h11', name: 'Ручка рейлинг 128мм', unit: 'шт', price: 180, category: 'Ручки' },
  { id: 'h12', name: 'Ручка скоба 160мм', unit: 'шт', price: 220, category: 'Ручки' },
  { id: 'h13', name: 'Сушка для посуды встроенная', unit: 'шт', price: 2400, category: 'Аксессуары' },
  { id: 'h14', name: 'Карго угловой', unit: 'шт', price: 4800, category: 'Аксессуары' },
];

export const DEFAULT_EXPENSES: ExpenseConfig = {
  staffPercent: 20,
  rentMonthly: 50000,
  adsMonthly: 15000,
  taxPercent: 6,
  deliveryBase: 3000,
  installPercent: 10,
  otherMonthly: 10000,
  ordersPerMonth: 4,
  marginPercent: 30,
};

export const DEFAULT_TEMPLATES: Template[] = [
  {
    id: 't1',
    name: 'Кухня эконом 2.4м',
    description: 'Стандартная прямая кухня с фасадами ЛДСП',
    workCost: 15000,
    materials: [
      { id: '1', materialId: 'm1', name: 'ЛДСП 16мм', quantity: 8, unit: 'м²', price: 850 },
      { id: '2', materialId: 'm2', name: 'ЛДСП 10мм (задняя стенка)', quantity: 3, unit: 'м²', price: 520 },
      { id: '3', materialId: 'm6', name: 'Столешница ЛДСП 38мм', quantity: 2.4, unit: 'п.м.', price: 1800 },
      { id: '4', materialId: 'm9', name: 'Кромка ПВХ 0.4мм', quantity: 40, unit: 'п.м.', price: 18 },
    ],
    hardware: [
      { id: '1', name: 'Петля с доводчиком Blum', quantity: 12, unit: 'шт', price: 420 },
      { id: '2', name: 'Выдвижной ящик стандарт', quantity: 3, unit: 'шт', price: 680 },
      { id: '3', name: 'Мебельная ножка регулируемая', quantity: 16, unit: 'шт', price: 35 },
      { id: '4', name: 'Конфирмат', quantity: 120, unit: 'шт', price: 4 },
    ],
  },
  {
    id: 't2',
    name: 'Кухня средний сегмент 3м',
    description: 'Прямая кухня с фасадами МДФ и ящиками Blum',
    workCost: 25000,
    materials: [
      { id: '1', materialId: 'm1', name: 'ЛДСП 16мм', quantity: 12, unit: 'м²', price: 850 },
      { id: '2', materialId: 'm2', name: 'ЛДСП 10мм (задняя стенка)', quantity: 4, unit: 'м²', price: 520 },
      { id: '3', materialId: 'm3', name: 'Фасад МДФ эмаль', quantity: 5.4, unit: 'м²', price: 4200 },
      { id: '4', materialId: 'm7', name: 'Столешница постформинг', quantity: 3, unit: 'п.м.', price: 2400 },
      { id: '5', materialId: 'm10', name: 'Кромка ПВХ 2мм (торец)', quantity: 60, unit: 'п.м.', price: 45 },
    ],
    hardware: [
      { id: '1', name: 'Петля с доводчиком Blum', quantity: 18, unit: 'шт', price: 420 },
      { id: '2', name: 'Выдвижной ящик Blum Tandembox', quantity: 4, unit: 'шт', price: 2800 },
      { id: '3', name: 'Мебельная ножка регулируемая', quantity: 20, unit: 'шт', price: 35 },
      { id: '4', name: 'Ручка рейлинг 128мм', quantity: 14, unit: 'шт', price: 180 },
    ],
  },
  {
    id: 't3',
    name: 'Кухня премиум угловая',
    description: 'Угловая кухня с фасадами шпон + механизмы Blum',
    workCost: 45000,
    materials: [
      { id: '1', materialId: 'm1', name: 'ЛДСП 16мм', quantity: 18, unit: 'м²', price: 850 },
      { id: '2', materialId: 'm2', name: 'ЛДСП 10мм (задняя стенка)', quantity: 6, unit: 'м²', price: 520 },
      { id: '3', materialId: 'm5', name: 'Фасад шпон натуральный', quantity: 7.2, unit: 'м²', price: 6500 },
      { id: '4', materialId: 'm8', name: 'Столешница искусственный камень', quantity: 4.5, unit: 'п.м.', price: 8500 },
      { id: '5', materialId: 'm10', name: 'Кромка ПВХ 2мм (торец)', quantity: 80, unit: 'п.м.', price: 45 },
    ],
    hardware: [
      { id: '1', name: 'Петля с доводчиком Blum', quantity: 24, unit: 'шт', price: 420 },
      { id: '2', name: 'Выдвижной ящик Blum Tandembox', quantity: 6, unit: 'шт', price: 2800 },
      { id: '3', name: 'Подъёмный механизм Aventos HK', quantity: 2, unit: 'шт', price: 3200 },
      { id: '4', name: 'Карго угловой', quantity: 1, unit: 'шт', price: 4800 },
      { id: '5', name: 'Мебельная ножка регулируемая', quantity: 28, unit: 'шт', price: 35 },
    ],
  },
];
