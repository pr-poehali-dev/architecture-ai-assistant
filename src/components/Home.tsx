import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const steps = [
  {
    num: "01",
    icon: "FileText",
    title: "Заполните параметры",
    desc: "Укажите тип объекта, площадь, город и материал стен. Всё в одной форме.",
  },
  {
    num: "02",
    icon: "Calculator",
    title: "ИИ рассчитает смету",
    desc: "Алгоритм учтёт региональный коэффициент, стоимость работ и логистику.",
  },
  {
    num: "03",
    icon: "Truck",
    title: "Найдите технику рядом",
    desc: "Экскаватор, кран, самосвал — забронируйте за несколько кликов.",
  },
];

const stats = [
  { value: "12 000+", label: "расчётов смет" },
  { value: "3 400+", label: "единиц техники" },
  { value: "89", label: "городов России" },
  { value: "97%", label: "точность расчётов" },
];

export default function Home() {
  return (
    <div style={{ background: "var(--brand-surface)" }} className="min-h-screen">
      {/* Hero */}
      <section
        style={{ background: "var(--brand-dark)" }}
        className="relative overflow-hidden"
      >
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute right-0 top-0 w-1/2 h-full opacity-10 stripe-bg"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="max-w-2xl animate-slide-up">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-body font-semibold uppercase tracking-widest"
              style={{
                background: "rgba(232,149,14,0.15)",
                color: "var(--brand-gold)",
                border: "1px solid rgba(232,149,14,0.3)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              ИИ-помощник для профессионалов строительного рынка
            </div>

            <h1
              className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
            >
              ИИ РАССЧИТАЕТ
              <br />
              <span style={{ color: "var(--brand-gold)" }}>СТРОЙКУ</span>{" "}
              ЗА 1 МИНУТУ
            </h1>

            <p className="font-body text-lg text-white/70 mb-8 leading-relaxed">
              Точная смета строительства с учётом региона и материалов.
              <br className="hidden md:block" />
              Диспетчерская для поиска и бронирования строительной техники.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/estimator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-body font-bold text-base transition-all hover:opacity-90"
                style={{ background: "var(--brand-gold)", color: "var(--brand-dark)" }}
              >
                <Icon name="Calculator" size={18} />
                Рассчитать смету
              </Link>
              <Link
                to="/machinery"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-body font-semibold text-base transition-all hover:bg-white/10"
                style={{
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "white",
                }}
              >
                <Icon name="Truck" size={18} />
                Найти технику
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          style={{ background: "rgba(0,0,0,0.25)", borderTop: "1px solid rgba(255,255,255,0.08)" }}
          className="relative"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="py-5 px-4 text-center"
                  style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none" }}
                >
                  <div className="font-display text-2xl font-bold" style={{ color: "var(--brand-gold)" }}>
                    {s.value}
                  </div>
                  <div className="font-body text-xs text-white/50 mt-0.5 uppercase tracking-wide">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Two CTA cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Estimator card */}
          <Link
            to="/estimator"
            className="group relative overflow-hidden p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{
              background: "var(--brand-dark)",
              color: "white",
            }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 opacity-10 stripe-bg"
            />
            <div
              className="w-12 h-12 flex items-center justify-center mb-5"
              style={{ background: "var(--brand-gold)" }}
            >
              <Icon name="Calculator" size={24} style={{ color: "var(--brand-dark)" }} />
            </div>
            <h2 className="font-display text-2xl font-bold text-white mb-2">
              РАССЧИТАТЬ СМЕТУ
            </h2>
            <p className="font-body text-white/60 text-sm leading-relaxed mb-5">
              Введите параметры объекта — получите детализированную смету с учётом региональных цен за 60 секунд.
            </p>
            <div
              className="inline-flex items-center gap-2 font-body text-sm font-semibold transition-all group-hover:gap-3"
              style={{ color: "var(--brand-gold)" }}
            >
              Открыть калькулятор
              <Icon name="ArrowRight" size={16} />
            </div>
          </Link>

          {/* Machinery card */}
          <Link
            to="/machinery"
            className="group relative overflow-hidden p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{
              background: "white",
              border: "2px solid var(--brand-border)",
            }}
          >
            <div
              className="w-12 h-12 flex items-center justify-center mb-5"
              style={{ background: "var(--brand-dark)" }}
            >
              <Icon name="Truck" size={24} style={{ color: "white" }} />
            </div>
            <h2
              className="font-display text-2xl font-bold mb-2"
              style={{ color: "var(--brand-dark)" }}
            >
              НАЙТИ ТЕХНИКУ
            </h2>
            <p className="font-body text-sm leading-relaxed mb-5" style={{ color: "var(--brand-text-muted)" }}>
              Экскаваторы, краны, самосвалы от проверенных владельцев в вашем городе. Онлайн-бронирование.
            </p>
            <div
              className="inline-flex items-center gap-2 font-body text-sm font-semibold transition-all group-hover:gap-3"
              style={{ color: "var(--brand-dark)" }}
            >
              Открыть диспетчерскую
              <Icon name="ArrowRight" size={16} />
            </div>
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section
        style={{ background: "white", borderTop: "1px solid var(--brand-border)", borderBottom: "1px solid var(--brand-border)" }}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 mb-12">
            <div
              className="w-1 h-10"
              style={{ background: "var(--brand-gold)" }}
            />
            <div>
              <div className="font-body text-xs uppercase tracking-widest mb-0.5" style={{ color: "var(--brand-text-muted)" }}>
                Процесс работы
              </div>
              <h2
                className="font-display text-3xl font-bold"
                style={{ color: "var(--brand-dark)" }}
              >
                КАК ЭТО РАБОТАЕТ
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--brand-border)" }}>
            {steps.map((step) => (
              <div
                key={step.num}
                className="p-8 bg-white"
              >
                <div
                  className="font-display text-5xl font-bold mb-4 opacity-15"
                  style={{ color: "var(--brand-dark)" }}
                >
                  {step.num}
                </div>
                <div
                  className="w-10 h-10 flex items-center justify-center mb-4"
                  style={{ background: "var(--brand-dark)" }}
                >
                  <Icon name={step.icon as "FileText"} size={20} style={{ color: "var(--brand-gold)" }} />
                </div>
                <h3
                  className="font-display text-lg font-semibold mb-2"
                  style={{ color: "var(--brand-dark)" }}
                >
                  {step.title}
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "var(--brand-text-muted)" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{ background: "var(--brand-dark)" }}
        className="py-8"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-white font-semibold">
            СтройРяд<span style={{ color: "var(--brand-gold)" }}>.РФ</span>
          </div>
          <div className="font-body text-xs text-white/40">
            © 2024 СтройРяд.РФ — ИИ-помощник для строительного бизнеса
          </div>
          <div className="font-body text-xs" style={{ color: "var(--brand-gold)" }}>
            Без серверов · Все расчёты на вашем устройстве
          </div>
        </div>
      </footer>
    </div>
  );
}
