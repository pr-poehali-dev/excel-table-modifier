import { useState } from 'react';
import { Material, HardwareItem } from '@/types/kitchen';
import { DEFAULT_MATERIALS, DEFAULT_HARDWARE } from '@/data/defaults';
import Icon from '@/components/ui/icon';

export default function Catalog() {
  const [materials, setMaterials] = useState<Material[]>(DEFAULT_MATERIALS);
  const [hardware, setHardware] = useState<HardwareItem[]>(DEFAULT_HARDWARE);
  const [tab, setTab] = useState<'materials' | 'hardware'>('materials');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState('');

  const categories = tab === 'materials'
    ? [...new Set(materials.map(m => m.category))]
    : [...new Set(hardware.map(h => h.category))];

  const startEdit = (id: string, price: number) => {
    setEditingId(id);
    setEditPrice(price.toString());
  };

  const saveEdit = () => {
    const newPrice = parseFloat(editPrice) || 0;
    if (tab === 'materials') {
      setMaterials(prev => prev.map(m => m.id === editingId ? { ...m, price: newPrice } : m));
    } else {
      setHardware(prev => prev.map(h => h.id === editingId ? { ...h, price: newPrice } : h));
    }
    setEditingId(null);
  };

  const fmt = (n: number) => n.toLocaleString('ru-RU') + ' ₽';

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
        <h2 className="section-title mb-1">Справочник цен</h2>
        <p className="text-sm text-muted-foreground mb-4">Обновляйте цены по прайсу поставщиков — они автоматически применятся в расчётах</p>

        <div className="flex gap-2 mb-5">
          {[
            { key: 'materials', label: 'Материалы', icon: 'Layers' },
            { key: 'hardware', label: 'Фурнитура', icon: 'Settings2' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as 'materials' | 'hardware')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${tab === t.key ? 'tab-active' : 'tab-inactive'}`}
            >
              <Icon name={t.icon} size={15} />
              {t.label}
            </button>
          ))}
        </div>

        {categories.map(cat => {
          const items = tab === 'materials'
            ? materials.filter(m => m.category === cat)
            : hardware.filter(h => h.category === cat);

          return (
            <div key={cat} className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{cat}</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="rounded-xl border border-border overflow-hidden">
                {items.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between px-4 py-3 ${idx > 0 ? 'border-t border-border' : ''} hover:bg-muted/30 transition-colors`}
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-foreground">{item.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">/ {item.unit}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {editingId === item.id ? (
                        <>
                          <input
                            type="number"
                            className="input-field w-28 text-sm text-right"
                            value={editPrice}
                            onChange={e => setEditPrice(e.target.value)}
                            autoFocus
                            onKeyDown={e => e.key === 'Enter' && saveEdit()}
                          />
                          <button onClick={saveEdit} className="text-green-600 hover:text-green-700 p-1">
                            <Icon name="Check" size={16} />
                          </button>
                          <button onClick={() => setEditingId(null)} className="text-muted-foreground hover:text-foreground p-1">
                            <Icon name="X" size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="font-semibold text-sm text-foreground w-28 text-right">{fmt(item.price)}</span>
                          <button
                            onClick={() => startEdit(item.id, item.price)}
                            className="text-muted-foreground hover:text-primary transition-colors p-1"
                          >
                            <Icon name="Pencil" size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
