import { MaterialCategory, ExpenseConfig, Template } from '@/types/kitchen';

export const CATALOG: MaterialCategory[] = [
  {
    id: 'facades',
    name: 'Фасады',
    icon: 'SquareStack',
    color: 'bg-rose-100 text-rose-600',
    groups: [
      {
        id: 'film',
        name: 'Плёнка ПВХ',
        description: 'Фрезерованный МДФ в плёнке',
        variants: [
          { id: 'film-eco', label: 'Эконом (однотонная)', price: 2800, unit: 'м²' },
          { id: 'film-std', label: 'Стандарт (текстура/патина)', price: 3400, unit: 'м²' },
          { id: 'film-prem', label: 'Премиум (3D фрезеровка)', price: 4200, unit: 'м²' },
        ],
      },
      {
        id: 'enamel',
        name: 'Эмаль',
        description: 'МДФ крашеный эмалью',
        variants: [
          { id: 'enamel-mat', label: 'Матовая', price: 5500, unit: 'м²' },
          { id: 'enamel-gloss', label: 'Глянцевая', price: 6200, unit: 'м²' },
          { id: 'enamel-soft', label: 'Soft-touch', price: 7000, unit: 'м²' },
        ],
      },
      {
        id: 'plastic',
        name: 'Пластик HPL',
        description: 'Высокопрочный ламинат',
        variants: [
          { id: 'hpl-std', label: 'Стандарт однотонный', price: 3800, unit: 'м²' },
          { id: 'hpl-texture', label: 'Текстура дерева/камня', price: 4600, unit: 'м²' },
          { id: 'hpl-met', label: 'Металлик / Перламутр', price: 5200, unit: 'м²' },
        ],
      },
      {
        id: 'veneer',
        name: 'Шпон',
        description: 'Натуральный шпон на МДФ',
        variants: [
          { id: 'veneer-nat', label: 'Натуральный (дуб, ясень)', price: 7500, unit: 'м²' },
          { id: 'veneer-wal', label: 'Орех / Вишня', price: 9200, unit: 'м²' },
          { id: 'veneer-exo', label: 'Экзотика (зебрано, венге)', price: 12000, unit: 'м²' },
        ],
      },
      {
        id: 'acrylic',
        name: 'Акрил',
        description: 'Акриловый МДФ — ультраглянец',
        variants: [
          { id: 'acr-gloss', label: 'Глянцевый однотонный', price: 6800, unit: 'м²' },
          { id: 'acr-mirror', label: 'Зеркальный эффект', price: 8400, unit: 'м²' },
        ],
      },
    ],
  },
  {
    id: 'worktops',
    name: 'Столешницы',
    icon: 'RectangleHorizontal',
    color: 'bg-amber-100 text-amber-600',
    groups: [
      {
        id: 'ldsp-top',
        name: 'ЛДСП',
        description: 'Ламинированная плита',
        variants: [
          { id: 'ldsp-28', label: '28мм стандарт', price: 1400, unit: 'п.м.' },
          { id: 'ldsp-38', label: '38мм толстая', price: 1900, unit: 'п.м.' },
        ],
      },
      {
        id: 'postforming',
        name: 'Постформинг',
        description: 'Радиусный передний край',
        variants: [
          { id: 'pf-28', label: '28мм', price: 2200, unit: 'п.м.' },
          { id: 'pf-38', label: '38мм', price: 2800, unit: 'п.м.' },
          { id: 'pf-38-wide', label: '38мм расширенная (900мм)', price: 3400, unit: 'п.м.' },
        ],
      },
      {
        id: 'stone-art',
        name: 'Искусственный камень',
        description: 'Акриловый/кварцевый камень',
        variants: [
          { id: 'art-20', label: 'Акрил 20мм (эконом)', price: 7500, unit: 'п.м.' },
          { id: 'art-30', label: 'Акрил 30мм (премиум)', price: 10500, unit: 'п.м.' },
          { id: 'quartz-20', label: 'Кварц 20мм', price: 12000, unit: 'п.м.' },
          { id: 'quartz-30', label: 'Кварц 30мм', price: 16000, unit: 'п.м.' },
        ],
      },
      {
        id: 'ceramic',
        name: 'Керамика / Керамогранит',
        description: 'Ультратонкие плиты',
        variants: [
          { id: 'cer-6', label: 'Керамогранит 6мм', price: 9000, unit: 'п.м.' },
          { id: 'cer-12', label: 'Керамогранит 12мм', price: 13500, unit: 'п.м.' },
        ],
      },
    ],
  },
  {
    id: 'corpus',
    name: 'Корпус',
    icon: 'Box',
    color: 'bg-blue-100 text-blue-600',
    groups: [
      {
        id: 'ldsp-body',
        name: 'ЛДСП корпус',
        description: 'Основные листы корпуса',
        variants: [
          { id: 'ldsp-16', label: 'ЛДСП 16мм (боковины, полки)', price: 850, unit: 'м²' },
          { id: 'ldsp-10', label: 'ЛДСП 10мм (задняя стенка)', price: 520, unit: 'м²' },
          { id: 'ldsp-22', label: 'ЛДСП 22мм (столешница под мойку)', price: 980, unit: 'м²' },
        ],
      },
      {
        id: 'edging',
        name: 'Кромка',
        description: 'ПВХ кромка для торцов',
        variants: [
          { id: 'edge-04', label: 'ПВХ 0.4мм (скрытые торцы)', price: 18, unit: 'п.м.' },
          { id: 'edge-1', label: 'ПВХ 1мм', price: 28, unit: 'п.м.' },
          { id: 'edge-2', label: 'ПВХ 2мм (видимые торцы)', price: 45, unit: 'п.м.' },
          { id: 'edge-abs', label: 'ABS 2мм (улучшенная)', price: 65, unit: 'п.м.' },
        ],
      },
    ],
  },
  {
    id: 'hardware',
    name: 'Фурнитура',
    icon: 'Settings2',
    color: 'bg-slate-100 text-slate-600',
    groups: [
      {
        id: 'hinges',
        name: 'Петли',
        description: 'Навесные петли для дверей',
        variants: [
          { id: 'hinge-std', label: 'Стандартная', price: 85, unit: 'шт' },
          { id: 'hinge-blum', label: 'Blum с доводчиком', price: 420, unit: 'шт' },
          { id: 'hinge-blum-soft', label: 'Blum Soft-close угловая', price: 580, unit: 'шт' },
        ],
      },
      {
        id: 'drawers',
        name: 'Ящики и направляющие',
        description: '',
        variants: [
          { id: 'drawer-rail-35', label: 'Направляющие шариковые 35см', price: 180, unit: 'пара' },
          { id: 'drawer-rail-45', label: 'Направляющие шариковые 45см', price: 220, unit: 'пара' },
          { id: 'drawer-std', label: 'Ящик стандартный', price: 680, unit: 'шт' },
          { id: 'drawer-blum', label: 'Ящик Blum Tandembox Antaro', price: 2800, unit: 'шт' },
          { id: 'drawer-blum-plus', label: 'Ящик Blum Legrabox Pure', price: 4200, unit: 'шт' },
        ],
      },
      {
        id: 'lifts',
        name: 'Подъёмные механизмы',
        description: 'Верхние фасады',
        variants: [
          { id: 'lift-gas', label: 'Газлифт простой', price: 650, unit: 'шт' },
          { id: 'lift-aventos-hk', label: 'Blum Aventos HK', price: 3200, unit: 'шт' },
          { id: 'lift-aventos-hl', label: 'Blum Aventos HL (складной)', price: 5800, unit: 'шт' },
        ],
      },
      {
        id: 'handles',
        name: 'Ручки',
        description: '',
        variants: [
          { id: 'handle-rail-96', label: 'Рейлинг 96мм', price: 120, unit: 'шт' },
          { id: 'handle-rail-128', label: 'Рейлинг 128мм', price: 160, unit: 'шт' },
          { id: 'handle-rail-160', label: 'Рейлинг 160мм', price: 200, unit: 'шт' },
          { id: 'handle-arc-128', label: 'Скоба 128мм', price: 220, unit: 'шт' },
          { id: 'handle-arc-160', label: 'Скоба 160мм', price: 260, unit: 'шт' },
          { id: 'handle-push', label: 'Push-to-open (без ручки)', price: 380, unit: 'шт' },
        ],
      },
      {
        id: 'accessories',
        name: 'Аксессуары',
        description: 'Системы хранения',
        variants: [
          { id: 'acc-legs', label: 'Ножка регулируемая', price: 35, unit: 'шт' },
          { id: 'acc-cargo', label: 'Карго угловое', price: 4800, unit: 'шт' },
          { id: 'acc-drainer', label: 'Сушка для посуды встроенная', price: 2400, unit: 'шт' },
          { id: 'acc-pull', label: 'Выкатная корзина для бутылок', price: 1800, unit: 'шт' },
          { id: 'acc-euro', label: 'Евровинт + заглушка', price: 8, unit: 'шт' },
          { id: 'acc-conf', label: 'Конфирмат', price: 4, unit: 'шт' },
        ],
      },
    ],
  },
  {
    id: 'other',
    name: 'Прочее',
    icon: 'MoreHorizontal',
    color: 'bg-purple-100 text-purple-600',
    groups: [
      {
        id: 'backsplash',
        name: 'Фартук (скинали)',
        description: 'Стеновая панель на кухне',
        variants: [
          { id: 'bs-glass', label: 'Стекло с фотопечатью', price: 4500, unit: 'м²' },
          { id: 'bs-plastic', label: 'Пластик ПВХ', price: 1200, unit: 'м²' },
          { id: 'bs-tile', label: 'Плитка / мозаика', price: 2800, unit: 'м²' },
        ],
      },
      {
        id: 'lighting',
        name: 'Подсветка',
        description: 'LED-лента и профиль',
        variants: [
          { id: 'light-led', label: 'LED-лента 12В', price: 180, unit: 'п.м.' },
          { id: 'light-profile', label: 'Алюминиевый профиль', price: 220, unit: 'п.м.' },
          { id: 'light-spot', label: 'Точечный светильник', price: 450, unit: 'шт' },
        ],
      },
    ],
  },
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
    description: 'Прямая кухня с плёнкой и ЛДСП столешницей',
    workCost: 15000,
    lines: [
      { id: '1', categoryId: 'facades', categoryName: 'Фасады', groupName: 'Плёнка ПВХ', variantLabel: 'Эконом (однотонная)', quantity: 5.2, unit: 'м²', price: 2800 },
      { id: '2', categoryId: 'worktops', categoryName: 'Столешницы', groupName: 'Постформинг', variantLabel: '38мм', quantity: 2.4, unit: 'п.м.', price: 2800 },
      { id: '3', categoryId: 'corpus', categoryName: 'Корпус', groupName: 'ЛДСП корпус', variantLabel: 'ЛДСП 16мм (боковины, полки)', quantity: 8, unit: 'м²', price: 850 },
      { id: '4', categoryId: 'corpus', categoryName: 'Корпус', groupName: 'ЛДСП корпус', variantLabel: 'ЛДСП 10мм (задняя стенка)', quantity: 3, unit: 'м²', price: 520 },
      { id: '5', categoryId: 'corpus', categoryName: 'Корпус', groupName: 'Кромка', variantLabel: 'ПВХ 0.4мм (скрытые торцы)', quantity: 40, unit: 'п.м.', price: 18 },
      { id: '6', categoryId: 'hardware', categoryName: 'Фурнитура', groupName: 'Петли', variantLabel: 'Blum с доводчиком', quantity: 12, unit: 'шт', price: 420 },
      { id: '7', categoryId: 'hardware', categoryName: 'Фурнитура', groupName: 'Ящики и направляющие', variantLabel: 'Ящик стандартный', quantity: 3, unit: 'шт', price: 680 },
      { id: '8', categoryId: 'hardware', categoryName: 'Фурнитура', groupName: 'Аксессуары', variantLabel: 'Ножка регулируемая', quantity: 16, unit: 'шт', price: 35 },
    ],
  },
  {
    id: 't2',
    name: 'Кухня средний сегмент 3м',
    description: 'Прямая кухня с эмалью и искусственным камнем',
    workCost: 25000,
    lines: [
      { id: '1', categoryId: 'facades', categoryName: 'Фасады', groupName: 'Эмаль', variantLabel: 'Матовая', quantity: 6.4, unit: 'м²', price: 5500 },
      { id: '2', categoryId: 'worktops', categoryName: 'Столешницы', groupName: 'Искусственный камень', variantLabel: 'Акрил 20мм (эконом)', quantity: 3, unit: 'п.м.', price: 7500 },
      { id: '3', categoryId: 'corpus', categoryName: 'Корпус', groupName: 'ЛДСП корпус', variantLabel: 'ЛДСП 16мм (боковины, полки)', quantity: 12, unit: 'м²', price: 850 },
      { id: '4', categoryId: 'corpus', categoryName: 'Корпус', groupName: 'ЛДСП корпус', variantLabel: 'ЛДСП 10мм (задняя стенка)', quantity: 4, unit: 'м²', price: 520 },
      { id: '5', categoryId: 'corpus', categoryName: 'Корпус', groupName: 'Кромка', variantLabel: 'ПВХ 2мм (видимые торцы)', quantity: 60, unit: 'п.м.', price: 45 },
      { id: '6', categoryId: 'hardware', categoryName: 'Фурнитура', groupName: 'Петли', variantLabel: 'Blum с доводчиком', quantity: 18, unit: 'шт', price: 420 },
      { id: '7', categoryId: 'hardware', categoryName: 'Фурнитура', groupName: 'Ящики и направляющие', variantLabel: 'Ящик Blum Tandembox Antaro', quantity: 4, unit: 'шт', price: 2800 },
      { id: '8', categoryId: 'hardware', categoryName: 'Фурнитура', groupName: 'Ручки', variantLabel: 'Рейлинг 128мм', quantity: 14, unit: 'шт', price: 160 },
      { id: '9', categoryId: 'hardware', categoryName: 'Фурнитура', groupName: 'Аксессуары', variantLabel: 'Ножка регулируемая', quantity: 20, unit: 'шт', price: 35 },
    ],
  },
  {
    id: 't3',
    name: 'Кухня премиум угловая',
    description: 'Угловая кухня шпон + кварц + механизмы Blum',
    workCost: 45000,
    lines: [
      { id: '1', categoryId: 'facades', categoryName: 'Фасады', groupName: 'Шпон', variantLabel: 'Натуральный (дуб, ясень)', quantity: 8.5, unit: 'м²', price: 7500 },
      { id: '2', categoryId: 'worktops', categoryName: 'Столешницы', groupName: 'Искусственный камень', variantLabel: 'Кварц 20мм', quantity: 4.5, unit: 'п.м.', price: 12000 },
      { id: '3', categoryId: 'corpus', categoryName: 'Корпус', groupName: 'ЛДСП корпус', variantLabel: 'ЛДСП 16мм (боковины, полки)', quantity: 18, unit: 'м²', price: 850 },
      { id: '4', categoryId: 'corpus', categoryName: 'Корпус', groupName: 'ЛДСП корпус', variantLabel: 'ЛДСП 10мм (задняя стенка)', quantity: 6, unit: 'м²', price: 520 },
      { id: '5', categoryId: 'corpus', categoryName: 'Корпус', groupName: 'Кромка', variantLabel: 'ABS 2мм (улучшенная)', quantity: 80, unit: 'п.м.', price: 65 },
      { id: '6', categoryId: 'hardware', categoryName: 'Фурнитура', groupName: 'Петли', variantLabel: 'Blum Soft-close угловая', quantity: 24, unit: 'шт', price: 580 },
      { id: '7', categoryId: 'hardware', categoryName: 'Фурнитура', groupName: 'Ящики и направляющие', variantLabel: 'Ящик Blum Legrabox Pure', quantity: 6, unit: 'шт', price: 4200 },
      { id: '8', categoryId: 'hardware', categoryName: 'Фурнитура', groupName: 'Подъёмные механизмы', variantLabel: 'Blum Aventos HK', quantity: 2, unit: 'шт', price: 3200 },
      { id: '9', categoryId: 'hardware', categoryName: 'Фурнитура', groupName: 'Аксессуары', variantLabel: 'Карго угловое', quantity: 1, unit: 'шт', price: 4800 },
      { id: '10', categoryId: 'hardware', categoryName: 'Фурнитура', groupName: 'Ручки', variantLabel: 'Push-to-open (без ручки)', quantity: 18, unit: 'шт', price: 380 },
    ],
  },
];
