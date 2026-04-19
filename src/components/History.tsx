import { KitchenProject } from '@/types/kitchen';
import Icon from '@/components/ui/icon';

interface HistoryProps {
  projects: KitchenProject[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: KitchenProject['status']) => void;
  onExport: (project: KitchenProject) => void;
}

const STATUS_LABELS: Record<KitchenProject['status'], { label: string; color: string }> = {
  draft: { label: 'Черновик', color: 'bg-slate-100 text-slate-600' },
  sent: { label: 'Отправлен', color: 'bg-blue-100 text-blue-600' },
  approved: { label: 'Одобрен', color: 'bg-amber-100 text-amber-600' },
  completed: { label: 'Выполнен', color: 'bg-green-100 text-green-600' },
};

export default function History({ projects, onDelete, onStatusChange, onExport }: HistoryProps) {
  const fmt = (n: number) => n.toLocaleString('ru-RU', { maximumFractionDigits: 0 }) + ' ₽';
  const totalRevenue = projects.filter(p => p.status === 'completed').reduce((s, p) => s + p.totalCost, 0);

  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-border p-12 text-center shadow-sm animate-fade-in">
        <Icon name="FolderOpen" size={48} className="mx-auto mb-3 text-muted-foreground opacity-30" />
        <p className="font-semibold text-foreground">История пуста</p>
        <p className="text-sm text-muted-foreground mt-1">Сохранённые расчёты появятся здесь</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Сводка */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Всего проектов', val: projects.length, icon: 'FolderOpen', color: 'bg-blue-100 text-blue-600' },
          { label: 'Черновиков', val: projects.filter(p => p.status === 'draft').length, icon: 'FileEdit', color: 'bg-slate-100 text-slate-600' },
          { label: 'Одобренных', val: projects.filter(p => p.status === 'approved').length, icon: 'ThumbsUp', color: 'bg-amber-100 text-amber-600' },
          { label: 'Завершённых', val: projects.filter(p => p.status === 'completed').length, icon: 'CheckCircle', color: 'bg-green-100 text-green-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-border p-4 shadow-sm">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${s.color}`}>
              <Icon name={s.icon} size={16} />
            </div>
            <div className="font-display font-black text-2xl text-foreground">{s.val}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {totalRevenue > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
          <Icon name="TrendingUp" size={22} className="text-green-600 shrink-0" />
          <div>
            <p className="font-semibold text-foreground">Выручка по завершённым заказам</p>
            <p className="text-2xl font-display font-black text-green-600">{fmt(totalRevenue)}</p>
          </div>
        </div>
      )}

      {/* Список */}
      <div className="space-y-3">
        {[...projects].reverse().map(project => {
          const st = STATUS_LABELS[project.status];
          return (
            <div key={project.id} className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-md transition-all overflow-hidden">
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground truncate">{project.name}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${st.color}`}>{st.label}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      {project.clientName && (
                        <span className="flex items-center gap-1">
                          <Icon name="User" size={12} />
                          {project.clientName}
                        </span>
                      )}
                      {project.clientPhone && (
                        <span className="flex items-center gap-1">
                          <Icon name="Phone" size={12} />
                          {project.clientPhone}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Icon name="Calendar" size={12} />
                        {new Date(project.createdAt).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    {project.notes && (
                      <p className="text-xs text-muted-foreground mt-1.5 line-clamp-1 italic">"{project.notes}"</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-display font-black text-xl text-primary">{fmt(project.totalCost)}</p>
                    <p className="text-xs text-muted-foreground">{project.materials.length + project.hardware.length} позиций</p>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-3 flex gap-2 flex-wrap">
                <select
                  className="text-xs border border-border rounded-lg px-2 py-1.5 bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  value={project.status}
                  onChange={e => onStatusChange(project.id, e.target.value as KitchenProject['status'])}
                >
                  <option value="draft">Черновик</option>
                  <option value="sent">Отправлен</option>
                  <option value="approved">Одобрен</option>
                  <option value="completed">Выполнен</option>
                </select>
                <button
                  onClick={() => onExport(project)}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors font-medium"
                >
                  <Icon name="Download" size={12} />
                  Экспорт
                </button>
                <button
                  onClick={() => onDelete(project.id)}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:bg-destructive hover:text-white hover:border-destructive transition-colors"
                >
                  <Icon name="Trash2" size={12} />
                  Удалить
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
