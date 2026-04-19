import { useState } from 'react';
import { MaterialCategory } from '@/types/kitchen';
import { CATALOG } from '@/data/defaults';
import Icon from '@/components/ui/icon';

export default function Catalog() {
  const [catalog, setCatalog] = useState<MaterialCategory[]>(CATALOG);
  const [activeCatId, setActiveCatId] = useState(CATALOG[0].id);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState('');

  const activeCat = catalog.find(c => c.id === activeCatId)!;

  const startEdit = (variantId: string, price: number) => {
    setEditingId(variantId);
    setEditPrice(price.toString());
  };

  const saveEdit = (catId: string, groupId: string, variantId: string) => {
    const newPrice = parseFloat(editPrice) || 0;
    setCatalog(prev => prev.map(cat => {
      if (cat.id !== catId) return cat;
      return {
        ...cat,
        groups: cat.groups.map(g => {
          if (g.id !== groupId) return g;
          return {
            ...g,
            variants: g.variants.map(v => v.id === variantId ? { ...v, price: newPrice } : v),
          };
        }),
      };
    }));
    setEditingId(null);
  };

  const fmt = (n: number) => n.toLocaleString('ru-RU') + ' ₽';

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="section-title mb-0.5">Справочник цен</h2>
          <p className="text-sm text-muted-foreground">Обновляйте цены по прайсу поставщиков — они подставятся в новые расчёты</p>
        </div>

        {/* Категории-табы */}
        <div className="flex gap-0 border-b border-border overflow-x-auto">
          {catalog.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCatId(cat.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                activeCatId === cat.id
                  ? 'border-primary text-primary bg-accent/30'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              <div className={`w-5 h-5 rounded flex items-center justify-center ${cat.color}`}>
                <Icon name={cat.icon} size={11} />
              </div>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Группы и варианты */}
        <div className="divide-y divide-border">
          {activeCat.groups.map(group => (
            <div key={group.id}>
              {/* Заголовок группы */}
              <div className="flex items-center gap-3 px-5 py-3 bg-muted/30">
                <div>
                  <p className="font-semibold text-sm text-foreground">{group.name}</p>
                  {group.description && (
                    <p className="text-xs text-muted-foreground">{group.description}</p>
                  )}
                </div>
                <span className="ml-auto text-xs text-muted-foreground">{group.variants.length} вариантов</span>
              </div>

              {/* Варианты */}
              {group.variants.map((variant, idx) => (
                <div
                  key={variant.id}
                  className={`flex items-center justify-between px-5 py-3 hover:bg-muted/20 transition-colors ${idx < group.variants.length - 1 ? 'border-b border-border/50' : ''}`}
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <span className="text-sm text-foreground">{variant.label}</span>
                    <span className="text-xs text-muted-foreground ml-2">/ {variant.unit}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {editingId === variant.id ? (
                      <>
                        <input
                          type="number"
                          className="input-field w-32 text-sm text-right"
                          value={editPrice}
                          onChange={e => setEditPrice(e.target.value)}
                          autoFocus
                          onKeyDown={e => {
                            if (e.key === 'Enter') saveEdit(activeCat.id, group.id, variant.id);
                            if (e.key === 'Escape') setEditingId(null);
                          }}
                        />
                        <span className="text-xs text-muted-foreground">₽/{variant.unit}</span>
                        <button onClick={() => saveEdit(activeCat.id, group.id, variant.id)} className="text-green-600 hover:text-green-700 p-1">
                          <Icon name="Check" size={16} />
                        </button>
                        <button onClick={() => setEditingId(null)} className="text-muted-foreground hover:text-foreground p-1">
                          <Icon name="X" size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="font-semibold text-sm text-foreground w-32 text-right tabular-nums">
                          {fmt(variant.price)}/{variant.unit}
                        </span>
                        <button
                          onClick={() => startEdit(variant.id, variant.price)}
                          className="text-muted-foreground hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-accent"
                        >
                          <Icon name="Pencil" size={13} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-center text-muted-foreground pb-2">
        Нажмите на карандаш чтобы изменить цену. Enter — сохранить, Esc — отмена.
      </p>
    </div>
  );
}
