import { useState, useRef } from "react";
import { calculateSmeta, formatMoney } from "@/utils/smetaLogic";
import type { ObjectType, WallType, SmetaResult } from "@/utils/smetaLogic";
import Icon from "@/components/ui/icon";

const objectTypes = [
  { value: "house", label: "Жилой дом" },
  { value: "banya", label: "Баня" },
  { value: "garage", label: "Гараж" },
  { value: "extension", label: "Пристройка" },
];

const wallTypes = [
  { value: "brick", label: "Кирпич", hint: "от 45 000 ₽/м²" },
  { value: "gasblock", label: "Газоблок", hint: "от 30 000 ₽/м²" },
  { value: "wood", label: "Дерево", hint: "от 25 000 ₽/м²" },
  { value: "monolith", label: "Монолит", hint: "от 50 000 ₽/м²" },
];

const rows = [
  { key: "materials" as const, label: "Материалы" },
  { key: "labor" as const, label: "Строительные работы" },
  { key: "logistics" as const, label: "Логистика (5% от материалов)" },
  { key: "markup" as const, label: "Наценка подрядчика (20%)" },
];

export default function Estimator() {
  const [form, setForm] = useState({
    objectType: "" as ObjectType | "",
    area: "",
    city: "",
    wallType: "" as WallType | "",
  });
  const [result, setResult] = useState<SmetaResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleCalculate = () => {
    setError("");
    if (!form.objectType || !form.area || !form.city || !form.wallType) {
      setError("Заполните все поля для расчёта сметы.");
      return;
    }
    const areaNum = parseFloat(form.area);
    if (isNaN(areaNum) || areaNum <= 0) {
      setError("Укажите корректную площадь (больше 0).");
      return;
    }
    if (areaNum > 1000) {
      setError("Площадь не может превышать 1000 м².");
      return;
    }
    if (form.city.trim().length < 2) {
      setError("Укажите название города.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = calculateSmeta({
        objectType: form.objectType as ObjectType,
        area: areaNum,
        city: form.city,
        wallType: form.wallType as WallType,
      });
      setResult(res);
      setLoading(false);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  const inputClass = "w-full px-4 py-3 font-body text-sm outline-none transition-all focus:ring-2";
  const inputStyle = {
    background: "var(--brand-surface)",
    border: "1px solid var(--brand-border)",
    color: "var(--brand-text)",
    borderRadius: "2px",
  };
  const inputFocusStyle = {
    "--tw-ring-color": "var(--brand-dark)",
  } as React.CSSProperties;

  return (
    <div style={{ background: "var(--brand-surface)", minHeight: "100vh" }}>
      {/* Page header */}
      <div style={{ background: "var(--brand-dark)" }} className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-body text-xs uppercase tracking-widest" style={{ color: "var(--brand-gold)" }}>
              ИИ-калькулятор
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold text-white">
            КАЛЬКУЛЯТОР СМЕТЫ
          </h1>
          <p className="font-body text-white/60 mt-2 text-sm">
            Расчёт стоимости строительства с учётом региона и материалов
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Form */}
        <div
          className="p-6 md:p-8 mb-6"
          style={{
            background: "white",
            border: "1px solid var(--brand-border)",
          }}
        >
          <h2
            className="font-display text-xl font-semibold mb-6"
            style={{ color: "var(--brand-dark)" }}
          >
            ПАРАМЕТРЫ ОБЪЕКТА
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Object type */}
            <div>
              <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--brand-text-muted)" }}>
                Тип объекта *
              </label>
              <select
                className={inputClass}
                style={{ ...inputStyle, ...inputFocusStyle }}
                value={form.objectType}
                onChange={(e) => setForm({ ...form, objectType: e.target.value as ObjectType })}
              >
                <option value="">— Выберите тип —</option>
                {objectTypes.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Area */}
            <div>
              <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--brand-text-muted)" }}>
                Площадь (м²) *
              </label>
              <input
                type="number"
                min={10}
                max={1000}
                placeholder="Например: 120"
                className={inputClass}
                style={{ ...inputStyle, ...inputFocusStyle }}
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
              />
            </div>

            {/* City */}
            <div>
              <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--brand-text-muted)" }}>
                Город *
              </label>
              <input
                type="text"
                placeholder="Москва, Тюмень, Владивосток..."
                className={inputClass}
                style={{ ...inputStyle, ...inputFocusStyle }}
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </div>

            {/* Wall type */}
            <div>
              <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--brand-text-muted)" }}>
                Материал стен *
              </label>
              <select
                className={inputClass}
                style={{ ...inputStyle, ...inputFocusStyle }}
                value={form.wallType}
                onChange={(e) => setForm({ ...form, wallType: e.target.value as WallType })}
              >
                <option value="">— Выберите материал —</option>
                {wallTypes.map((w) => (
                  <option key={w.value} value={w.value}>{w.label} — {w.hint}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Wall type selector visual */}
          {form.wallType && (
            <div
              className="mt-5 p-3 flex items-center gap-3"
              style={{ background: "var(--brand-surface)", border: "1px solid var(--brand-border)" }}
            >
              <Icon name="Info" size={16} style={{ color: "var(--brand-gold)" }} />
              <span className="font-body text-xs" style={{ color: "var(--brand-text-muted)" }}>
                {wallTypes.find((w) => w.value === form.wallType)?.label} — базовая стоимость:{" "}
                <strong style={{ color: "var(--brand-dark)" }}>
                  {wallTypes.find((w) => w.value === form.wallType)?.hint}
                </strong>
              </span>
            </div>
          )}

          {error && (
            <div
              className="mt-4 px-4 py-3 flex items-center gap-2 font-body text-sm animate-fade-in"
              style={{
                background: "#fff3f3",
                border: "1px solid #fca5a5",
                color: "#b91c1c",
              }}
            >
              <Icon name="AlertCircle" size={16} />
              {error}
            </div>
          )}

          <button
            className="mt-6 w-full flex items-center justify-center gap-2 py-4 font-body font-bold text-base transition-all hover:opacity-90 active:scale-[0.99]"
            style={{
              background: loading ? "var(--brand-text-muted)" : "var(--brand-dark)",
              color: "white",
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onClick={handleCalculate}
            disabled={loading}
          >
            {loading ? (
              <>
                <Icon name="Loader" size={18} className="animate-spin" />
                Вычисляю...
              </>
            ) : (
              <>
                <Icon name="Calculator" size={18} />
                Рассчитать смету
              </>
            )}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div
            ref={resultRef}
            className="animate-fade-in"
            style={{
              background: "white",
              border: "1px solid var(--brand-border)",
            }}
          >
            {/* Result header */}
            <div
              style={{ background: "var(--brand-dark)", borderBottom: "3px solid var(--brand-gold)" }}
              className="px-6 md:px-8 py-5 flex items-center justify-between"
            >
              <div>
                <div className="font-display text-white text-xl font-bold">СМЕТА ГОТОВА</div>
                <div className="font-body text-white/50 text-xs mt-0.5">
                  {objectTypes.find((o) => o.value === form.objectType)?.label} · {form.area} м² · {form.city}
                </div>
              </div>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 font-body text-xs font-semibold transition-all hover:opacity-80"
                style={{
                  background: "var(--brand-gold)",
                  color: "var(--brand-dark)",
                }}
              >
                <Icon name="Printer" size={14} />
                Распечатать
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--brand-border)" }}>
                    <th
                      className="text-left px-6 md:px-8 py-3 font-body text-xs font-semibold uppercase tracking-wide"
                      style={{ color: "var(--brand-text-muted)" }}
                    >
                      Статья расходов
                    </th>
                    <th
                      className="text-right px-6 md:px-8 py-3 font-body text-xs font-semibold uppercase tracking-wide"
                      style={{ color: "var(--brand-text-muted)" }}
                    >
                      Сумма
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr
                      key={row.key}
                      style={{
                        borderBottom: "1px solid var(--brand-border)",
                        background: i % 2 === 0 ? "white" : "var(--brand-surface)",
                      }}
                    >
                      <td className="px-6 md:px-8 py-4 font-body text-sm" style={{ color: "var(--brand-text)" }}>
                        {row.label}
                      </td>
                      <td className="px-6 md:px-8 py-4 font-body text-sm text-right font-semibold" style={{ color: "var(--brand-dark)" }}>
                        {formatMoney(result[row.key])}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ background: "var(--brand-dark)" }}>
                    <td className="px-6 md:px-8 py-5 font-display text-lg font-bold text-white">
                      ИТОГО
                    </td>
                    <td
                      className="px-6 md:px-8 py-5 font-display text-xl font-bold text-right"
                      style={{ color: "var(--brand-gold)" }}
                    >
                      {formatMoney(result.total)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div
              className="px-6 md:px-8 py-4 flex items-start gap-2 font-body text-xs"
              style={{
                background: "var(--brand-surface)",
                borderTop: "1px solid var(--brand-border)",
                color: "var(--brand-text-muted)",
              }}
            >
              <Icon name="Info" size={13} className="mt-0.5 flex-shrink-0" />
              Расчёт является ориентировочным. Итоговая стоимость зависит от конкретных условий строительства и поставщиков материалов.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
