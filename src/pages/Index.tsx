import { useState } from 'react';
import Calculator from '@/components/Calculator';
import Expenses from '@/components/Expenses';
import History from '@/components/History';
import Catalog from '@/components/Catalog';
import ExportModal from '@/components/ExportModal';
import Icon from '@/components/ui/icon';
import { ExpenseConfig, KitchenProject } from '@/types/kitchen';
import { DEFAULT_EXPENSES } from '@/data/defaults';

type Tab = 'calculator' | 'expenses' | 'history' | 'catalog';

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'calculator', label: 'Расчёт', icon: 'Calculator' },
  { key: 'expenses', label: 'Расходы', icon: 'PieChart' },
  { key: 'history', label: 'История', icon: 'History' },
  { key: 'catalog', label: 'Справочник', icon: 'BookOpen' },
];

export default function Index() {
  const [tab, setTab] = useState<Tab>('calculator');
  const [expenses, setExpenses] = useState<ExpenseConfig>(DEFAULT_EXPENSES);
  const [projects, setProjects] = useState<KitchenProject[]>([]);
  const [exportProject, setExportProject] = useState<KitchenProject | null>(null);

  const saveProject = (p: KitchenProject) => {
    setProjects(prev => [...prev, p]);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const changeStatus = (id: string, status: KitchenProject['status']) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm">
                <Icon name="ChefHat" size={19} className="text-white" />
              </div>
              <div>
                <span className="font-display font-black text-foreground text-lg leading-none block">КухняПрайс</span>
                <span className="text-xs text-muted-foreground leading-none">калькулятор кухни на заказ</span>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
              {TABS.map(t => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all relative ${
                    tab === t.key
                      ? 'bg-white text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={t.icon} size={15} />
                  <span className="hidden sm:inline">{t.label}</span>
                  {t.key === 'history' && projects.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {projects.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {tab === 'calculator' && (
          <Calculator expenses={expenses} onSaveProject={saveProject} />
        )}
        {tab === 'expenses' && (
          <Expenses expenses={expenses} onChange={setExpenses} />
        )}
        {tab === 'history' && (
          <History
            projects={projects}
            onDelete={deleteProject}
            onStatusChange={changeStatus}
            onExport={p => setExportProject(p)}
          />
        )}
        {tab === 'catalog' && (
          <Catalog />
        )}
      </main>

      {/* Export Modal */}
      <ExportModal project={exportProject} onClose={() => setExportProject(null)} />
    </div>
  );
}
