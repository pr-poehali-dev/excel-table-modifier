import { KitchenProject } from '@/types/kitchen';
import { CATALOG } from '@/data/defaults';
import Icon from '@/components/ui/icon';

interface ExportModalProps {
  project: KitchenProject | null;
  onClose: () => void;
}

export default function ExportModal({ project, onClose }: ExportModalProps) {
  if (!project) return null;

  const fmt = (n: number) => n.toLocaleString('ru-RU', { maximumFractionDigits: 0 }) + ' ₽';
  const today = new Date().toLocaleDateString('ru-RU');

  // Группируем по категории для красивого вывода
  const grouped = CATALOG.map(cat => ({
    cat,
    lines: project.lines.filter(l => l.categoryId === cat.id),
  })).filter(g => g.lines.length > 0);

  const materialTotal = project.lines.reduce((s, l) => s + l.quantity * l.price, 0);

  const printContent = () => {
    const groupedRows = grouped.map(({ cat, lines }) => {
      const rows = lines.map(l =>
        `<tr>
          <td style="padding-left:24px;color:#666">${l.groupName} — ${l.variantLabel}</td>
          <td style="text-align:center">${l.quantity}</td>
          <td style="text-align:center">${l.unit}</td>
          <td style="text-align:right">${l.price.toLocaleString('ru-RU')} ₽</td>
          <td style="text-align:right;font-weight:600">${(l.quantity * l.price).toLocaleString('ru-RU')} ₽</td>
        </tr>`
      ).join('');
      const catTotal = lines.reduce((s, l) => s + l.quantity * l.price, 0);
      return `
        <tr style="background:#f5f5f0">
          <td colspan="4" style="font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.05em;padding:8px 12px">${cat.name}</td>
          <td style="text-align:right;font-weight:700;padding:8px 12px">${catTotal.toLocaleString('ru-RU')} ₽</td>
        </tr>
        ${rows}
      `;
    }).join('');

    const html = `
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>КП — ${project.name}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; font-size: 12px; color: #1a1a1a; padding: 40px; }
  h1 { font-size: 22px; font-weight: 900; }
  .accent { color: #d97706; }
  .meta { display: flex; gap: 32px; margin-top: 14px; padding-bottom: 18px; border-bottom: 2px solid #f59e0b; }
  .meta-item label { font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: .05em; }
  .meta-item strong { display: block; font-size: 13px; margin-top: 2px; }
  table { width: 100%; border-collapse: collapse; margin-top: 20px; }
  th { background: #1a1a1a; color: white; text-align: left; padding: 8px 12px; font-size: 11px; text-transform: uppercase; letter-spacing: .05em; }
  td { padding: 6px 12px; border-bottom: 1px solid #ede8e3; }
  .work-row td { background: #fef9f0; font-weight: 600; }
  .total-box { margin-top: 28px; display: flex; justify-content: space-between; align-items: center; padding: 18px 24px; border: 2px solid #f59e0b; border-radius: 8px; background: #fffbf0; }
  .total-label { font-size: 16px; font-weight: 900; }
  .total-amount { font-size: 32px; font-weight: 900; color: #d97706; }
  .notes { margin-top: 16px; font-size: 11px; color: #555; background: #f9f7f4; padding: 12px 16px; border-radius: 6px; border-left: 3px solid #f59e0b; }
  .footer { margin-top: 32px; font-size: 10px; color: #aaa; padding-top: 12px; border-top: 1px solid #ede8e3; }
  @media print { body { padding: 20px; } }
</style>
</head>
<body>
  <h1>Коммерческое предложение <span class="accent">#КП-${project.id.slice(0, 6).toUpperCase()}</span></h1>
  <div class="meta">
    <div class="meta-item"><label>Проект</label><strong>${project.name}</strong></div>
    ${project.clientName ? `<div class="meta-item"><label>Клиент</label><strong>${project.clientName}</strong></div>` : ''}
    ${project.clientPhone ? `<div class="meta-item"><label>Телефон</label><strong>${project.clientPhone}</strong></div>` : ''}
    <div class="meta-item"><label>Дата</label><strong>${today}</strong></div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Наименование</th>
        <th style="text-align:center;width:70px">Кол-во</th>
        <th style="text-align:center;width:50px">Ед.</th>
        <th style="text-align:right;width:100px">Цена/ед.</th>
        <th style="text-align:right;width:110px">Сумма</th>
      </tr>
    </thead>
    <tbody>
      ${groupedRows}
      ${project.workCost > 0 ? `
        <tr style="background:#f0fdf4">
          <td colspan="4" style="font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.05em;padding:8px 12px">Работы</td>
          <td style="text-align:right;font-weight:700;padding:8px 12px">${project.workCost.toLocaleString('ru-RU')} ₽</td>
        </tr>
        <tr class="work-row">
          <td>Сборка, монтаж, установка</td>
          <td></td><td></td><td></td>
          <td style="text-align:right">${project.workCost.toLocaleString('ru-RU')} ₽</td>
        </tr>
      ` : ''}
    </tbody>
  </table>

  <div class="total-box">
    <span class="total-label">ИТОГОВАЯ СТОИМОСТЬ</span>
    <span class="total-amount">${project.totalCost.toLocaleString('ru-RU')} ₽</span>
  </div>

  ${project.notes ? `<div class="notes"><strong>Примечания:</strong> ${project.notes}</div>` : ''}

  <div class="footer">
    КП действительно 30 дней. Стоимость может уточняться по итогам замера и согласования дизайн-проекта.
  </div>
</body>
</html>`;

    const win = window.open('', '_blank');
    if (win) {
      win.document.write(html);
      win.document.close();
      win.focus();
      setTimeout(() => win.print(), 500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-white">
          <h2 className="section-title">Экспорт проекта</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1 transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-5">
          <div className="bg-muted rounded-xl p-4 mb-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Проект</span>
              <span className="font-semibold">{project.name}</span>
            </div>
            {project.clientName && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Клиент</span>
                <span className="font-semibold">{project.clientName}</span>
              </div>
            )}
            <div className="h-px bg-border" />
            {grouped.map(({ cat, lines }) => (
              <div key={cat.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{cat.name}</span>
                <span className="font-medium">{fmt(lines.reduce((s, l) => s + l.quantity * l.price, 0))}</span>
              </div>
            ))}
            {project.workCost > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Работы</span>
                <span className="font-medium">{fmt(project.workCost)}</span>
              </div>
            )}
            <div className="h-px bg-border" />
            <div className="flex justify-between">
              <span className="font-bold text-foreground">Итого</span>
              <span className="font-display font-black text-lg text-primary">{fmt(project.totalCost)}</span>
            </div>
          </div>

          <button
            onClick={printContent}
            className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
          >
            <Icon name="Printer" size={18} />
            Распечатать / Сохранить PDF
          </button>
          <p className="text-center text-xs text-muted-foreground mt-2">
            Откроется окно печати. Выберите «Сохранить как PDF».
          </p>
        </div>
      </div>
    </div>
  );
}
