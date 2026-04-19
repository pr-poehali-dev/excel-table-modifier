import { KitchenProject } from '@/types/kitchen';
import Icon from '@/components/ui/icon';

interface ExportModalProps {
  project: KitchenProject | null;
  onClose: () => void;
}

export default function ExportModal({ project, onClose }: ExportModalProps) {
  if (!project) return null;

  const fmt = (n: number) => n.toLocaleString('ru-RU', { maximumFractionDigits: 0 }) + ' ₽';
  const today = new Date().toLocaleDateString('ru-RU');

  const printContent = () => {
    const materialRows = project.materials.map(m =>
      `<tr><td>${m.name}</td><td style="text-align:center">${m.quantity}</td><td style="text-align:center">${m.unit}</td><td style="text-align:right">${m.price.toLocaleString('ru-RU')} ₽</td><td style="text-align:right">${(m.quantity * m.price).toLocaleString('ru-RU')} ₽</td></tr>`
    ).join('');

    const hardwareRows = project.hardware.map(h =>
      `<tr><td>${h.name}</td><td style="text-align:center">${h.quantity}</td><td style="text-align:center">${h.unit}</td><td style="text-align:right">${h.price.toLocaleString('ru-RU')} ₽</td><td style="text-align:right">${(h.quantity * h.price).toLocaleString('ru-RU')} ₽</td></tr>`
    ).join('');

    const html = `
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Коммерческое предложение — ${project.name}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; font-size: 12px; color: #1a1a1a; padding: 40px; }
  h1 { font-size: 22px; font-weight: 900; margin-bottom: 4px; }
  h2 { font-size: 14px; font-weight: 700; margin: 20px 0 8px; border-bottom: 2px solid #f59e0b; padding-bottom: 4px; }
  .header { margin-bottom: 24px; }
  .meta { display: flex; gap: 40px; margin-top: 12px; }
  .meta div { font-size: 11px; color: #666; }
  .meta strong { display: block; color: #1a1a1a; font-size: 13px; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
  th { background: #f5f5f0; text-align: left; padding: 8px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
  td { padding: 7px 10px; border-bottom: 1px solid #e8e4e0; }
  tr:last-child td { border-bottom: none; }
  .subtotal { text-align: right; font-weight: 700; padding: 8px 10px; }
  .total-box { margin-top: 24px; border: 2px solid #f59e0b; border-radius: 8px; padding: 16px; display: flex; justify-content: space-between; align-items: center; }
  .total-label { font-size: 16px; font-weight: 900; }
  .total-amount { font-size: 28px; font-weight: 900; color: #d97706; }
  .notes { margin-top: 16px; font-size: 11px; color: #666; background: #f9f7f4; padding: 12px; border-radius: 6px; }
  .footer { margin-top: 32px; font-size: 10px; color: #999; border-top: 1px solid #e8e4e0; padding-top: 12px; }
  @media print { body { padding: 20px; } }
</style>
</head>
<body>
<div class="header">
  <h1>Коммерческое предложение</h1>
  <div style="color:#d97706;font-size:13px;margin-top:2px">${project.name}</div>
  <div class="meta">
    ${project.clientName ? `<div><div>Клиент</div><strong>${project.clientName}</strong></div>` : ''}
    ${project.clientPhone ? `<div><div>Телефон</div><strong>${project.clientPhone}</strong></div>` : ''}
    <div><div>Дата составления</div><strong>${today}</strong></div>
  </div>
</div>

${project.materials.length > 0 ? `
<h2>Материалы</h2>
<table>
  <thead><tr><th>Наименование</th><th style="text-align:center">Кол-во</th><th style="text-align:center">Ед.</th><th style="text-align:right">Цена</th><th style="text-align:right">Сумма</th></tr></thead>
  <tbody>${materialRows}</tbody>
</table>` : ''}

${project.hardware.length > 0 ? `
<h2>Фурнитура и комплектующие</h2>
<table>
  <thead><tr><th>Наименование</th><th style="text-align:center">Кол-во</th><th style="text-align:center">Ед.</th><th style="text-align:right">Цена</th><th style="text-align:right">Сумма</th></tr></thead>
  <tbody>${hardwareRows}</tbody>
</table>` : ''}

${project.workCost > 0 ? `
<h2>Работы</h2>
<table>
  <tbody><tr><td>Сборка, монтаж, установка</td><td></td><td></td><td></td><td style="text-align:right;font-weight:700">${project.workCost.toLocaleString('ru-RU')} ₽</td></tr></tbody>
</table>` : ''}

<div class="total-box">
  <span class="total-label">ИТОГОВАЯ СТОИМОСТЬ</span>
  <span class="total-amount">${project.totalCost.toLocaleString('ru-RU')} ₽</span>
</div>

${project.notes ? `<div class="notes"><strong>Примечания:</strong> ${project.notes}</div>` : ''}

<div class="footer">
  Данное коммерческое предложение действительно 30 дней с даты составления. 
  Стоимость может изменяться в зависимости от окончательного дизайн-проекта.
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

  const materialsCost = project.materials.reduce((s, m) => s + m.quantity * m.price, 0);
  const hardwareCost = project.hardware.reduce((s, h) => s + h.quantity * h.price, 0);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-scale-in">
        <div className="flex items-center justify-between p-5 border-b border-border">
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
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Материалы</span>
              <span className="font-medium">{fmt(materialsCost)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Фурнитура</span>
              <span className="font-medium">{fmt(hardwareCost)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Работы</span>
              <span className="font-medium">{fmt(project.workCost)}</span>
            </div>
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
            Откроется окно печати браузера. Выберите "Сохранить как PDF" для файла.
          </p>
        </div>
      </div>
    </div>
  );
}
