import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const modules = [
  { icon: "Building2", title: "Каталог проектов", desc: "Здания 1–50 этажей: фильтры по назначению, материалам, фундаментам", tag: "MVP" },
  { icon: "PencilRuler", title: "Конструктор проектов", desc: "Шаблоны, 2D/3D, BIM-интеграция, экспорт DWG / IFC / PDF", tag: "v1" },
  { icon: "Calculator", title: "Сметы и калькуляторы", desc: "Автоматический расчёт стоимости, ресурсы, графики работ", tag: "MVP", to: "/estimator" },
  { icon: "Truck", title: "Маркетплейс техники", desc: "Аренда и продажа: фильтры, бронирование по календарю", tag: "MVP", to: "/machinery" },
  { icon: "Route", title: "Дорожные проекты", desc: "Тип, профиль, материалы, инженерные расчёты инфраструктуры", tag: "v1" },
  { icon: "Users", title: "Маркетплейс услуг", desc: "Подрядчики и проектировщики: верификация, рейтинги, отзывы", tag: "v1" },
  { icon: "FileText", title: "Документооборот", desc: "Сметы, акты, договоры, лицензии. ЭЦП и генератор шаблонов", tag: "MVP" },
  { icon: "Briefcase", title: "HR / ATS найм", desc: "Вакансии, парсинг резюме, скрининг, оформление сотрудников", tag: "MVP" },
  { icon: "LayoutDashboard", title: "Личный кабинет", desc: "Статусы заявок, проекты, документы, CRM-интеграция", tag: "MVP" },
  { icon: "BarChart3", title: "Аналитика заявок", desc: "Live-дашборды, трекинг лидов, отчёты в реальном времени", tag: "v1" },
  { icon: "Globe", title: "Мультиязычность", desc: "Все языки мира, геофильтры по регионам РФ, локализация", tag: "v1" },
  { icon: "Plug", title: "API-портал", desc: "Интеграции с банками, 1С, платёжными провайдерами, картами", tag: "v2" },
  { icon: "GraduationCap", title: "Университет стройки", desc: "Блог, инструкции, видео-курсы, SEO-контент", tag: "v1" },
  { icon: "ShieldCheck", title: "Эскроу и гарантии", desc: "Безопасные сделки, страхование, арбитраж споров", tag: "v2" },
  { icon: "Megaphone", title: "Маркетинг", desc: "Акции, промокоды, push / email, реферальная программа", tag: "v2" },
  { icon: "Settings", title: "Панель администратора", desc: "Управление контентом, пользователями, транзакциями, HR", tag: "MVP" },
];

const stats = [
  { value: "50", label: "этажей в проектах" },
  { value: "85", label: "регионов РФ" },
  { value: "∞", label: "языков мира" },
  { value: "100%", label: "ваших данных" },
];

const tagColors: Record<string, { bg: string; color: string }> = {
  MVP: { bg: "var(--brand-gold)", color: "#0d0d0d" },
  v1: { bg: "#0d0d0d", color: "var(--brand-gold)" },
  v2: { bg: "transparent", color: "var(--brand-text-muted)" },
};

export default function Portal() {
  return (
    <div style={{ background: "var(--brand-surface)" }}>
      {/* HERO */}
      <section style={{ background: "var(--brand-black)" }} className="relative overflow-hidden">
        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,210,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,210,0,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* hazard stripe top */}
        <div className="hazard-bg h-2 w-full relative" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-body font-bold uppercase tracking-[0.2em] animate-fade-up"
            style={{ background: "var(--brand-gold)", color: "#0d0d0d", animationDelay: "0.05s" }}
          >
            <Icon name="HardHat" size={14} />
            Платформа №1 для строительной отрасли
          </div>

          <h1
            className="font-display text-5xl md:text-7xl font-bold text-white mb-5 leading-[0.95] animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            ВСЁ О СТРОЙКЕ
            <br />
            <span style={{ color: "var(--brand-gold)" }}>ОТ А ДО Я</span>
          </h1>

          <p
            className="font-body text-lg text-white/70 mb-8 max-w-2xl leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.25s" }}
          >
            Проекты домов 1–50 этажей, дороги, аренда и продажа техники, найм бригад
            и полный пакет документов. Единая экосистема для всей России и мира.
          </p>

          {/* Search */}
          <div
            className="flex flex-col sm:flex-row gap-2 max-w-2xl animate-fade-up"
            style={{ animationDelay: "0.35s" }}
          >
            <div className="flex-1 flex items-center gap-3 px-4 py-3.5 bg-white">
              <Icon name="Search" size={20} style={{ color: "var(--brand-text-muted)" }} />
              <input
                placeholder="Проект дома, техника, вакансия, подрядчик..."
                className="flex-1 outline-none font-body text-sm bg-transparent"
              />
            </div>
            <button
              className="px-8 py-3.5 font-body font-bold text-sm transition-all hover:opacity-90"
              style={{ background: "var(--brand-gold)", color: "#0d0d0d" }}
            >
              Найти
            </button>
          </div>

          {/* quick tags */}
          <div className="flex flex-wrap gap-2 mt-5 animate-fade-up" style={{ animationDelay: "0.45s" }}>
            {["Каркасные дома", "Многоэтажки", "Экскаваторы", "Прорабы", "Дороги", "Сметы"].map((t) => (
              <span
                key={t}
                className="px-3 py-1 font-body text-xs transition-colors cursor-pointer hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.65)" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* stats */}
        <div style={{ background: "var(--brand-gold)" }} className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="py-5 px-4 text-center"
                  style={{ borderRight: i < 3 ? "1px solid rgba(13,13,13,0.15)" : "none" }}
                >
                  <div className="font-display text-3xl font-bold" style={{ color: "#0d0d0d" }}>
                    {s.value}
                  </div>
                  <div className="font-body text-xs font-semibold mt-0.5 uppercase tracking-wide" style={{ color: "rgba(13,13,13,0.6)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-12" style={{ background: "var(--brand-gold)" }} />
            <div>
              <div className="font-body text-xs uppercase tracking-[0.2em] mb-1" style={{ color: "var(--brand-text-muted)" }}>
                16 модулей экосистемы
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: "#0d0d0d" }}>
                ВОЗМОЖНОСТИ ПЛАТФОРМЫ
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-3 font-body text-xs">
            {Object.entries(tagColors).map(([k, v]) => (
              <span key={k} className="flex items-center gap-1.5">
                <span className="w-3 h-3" style={{ background: v.bg === "transparent" ? "var(--brand-border)" : v.bg }} />
                <span style={{ color: "var(--brand-text-muted)" }}>{k === "MVP" ? "В MVP" : k}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "var(--brand-border)" }}>
          {modules.map((m, i) => {
            const Wrapper = m.to ? Link : "div";
            return (
              <Wrapper
                key={i}
                {...(m.to ? { to: m.to } : {})}
                className="group relative p-6 bg-white transition-all duration-200 hover:bg-[#0d0d0d] cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-11 h-11 flex items-center justify-center transition-colors"
                    style={{ background: "var(--brand-surface)" }}
                  >
                    <Icon name={m.icon as "Building2"} size={22} className="text-[#0d0d0d] group-hover:text-[#ffd200] transition-colors" />
                  </div>
                  <span
                    className="px-2 py-0.5 font-body text-[10px] font-bold uppercase tracking-wide"
                    style={{ background: tagColors[m.tag].bg, color: tagColors[m.tag].color, border: m.tag === "v2" ? "1px solid var(--brand-border)" : "none" }}
                  >
                    {m.tag}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-2 text-[#0d0d0d] group-hover:text-white transition-colors">
                  {m.title}
                </h3>
                <p className="font-body text-xs leading-relaxed text-[#6b6b66] group-hover:text-white/60 transition-colors">
                  {m.desc}
                </p>
                {m.to && (
                  <div className="mt-3 flex items-center gap-1 font-body text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--brand-gold)" }}>
                    Открыть <Icon name="ArrowRight" size={13} />
                  </div>
                )}
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* USER FLOW */}
      <section style={{ background: "var(--brand-black)" }} className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
            ОДИН СЦЕНАРИЙ — <span style={{ color: "var(--brand-gold)" }}>ВЕСЬ ЦИКЛ</span>
          </h2>
          <p className="font-body text-white/50 text-sm mb-10">От поиска проекта до подписания договора и найма строителя</p>

          <div className="grid md:grid-cols-5 gap-px" style={{ background: "rgba(255,255,255,0.1)" }}>
            {[
              { n: "01", icon: "Search", t: "Поиск проекта", d: "Выбор дома по фильтрам" },
              { n: "02", icon: "FileSignature", t: "Смета и договор", d: "Расчёт и ЭЦП онлайн" },
              { n: "03", icon: "Truck", t: "Аренда техники", d: "Бронирование экскаватора" },
              { n: "04", icon: "Briefcase", t: "Публикация вакансии", d: "Прораб и бригада" },
              { n: "05", icon: "UserCheck", t: "Найм через ATS", d: "Скрининг и оформление" },
            ].map((s, i) => (
              <div key={i} className="p-6" style={{ background: "var(--brand-black)" }}>
                <div className="font-display text-4xl font-bold mb-3" style={{ color: "rgba(255,210,0,0.25)" }}>{s.n}</div>
                <Icon name={s.icon as "Search"} size={20} style={{ color: "var(--brand-gold)" }} className="mb-3" />
                <div className="font-display text-base font-semibold text-white mb-1">{s.t}</div>
                <div className="font-body text-xs text-white/50">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--brand-border)" }}>
          <div className="p-8 bg-white">
            <Icon name="Phone" size={24} style={{ color: "var(--brand-gold)" }} className="mb-4" />
            <div className="font-body text-xs uppercase tracking-wide mb-1" style={{ color: "var(--brand-text-muted)" }}>Телефон</div>
            <a href="tel:89929999777" className="font-display text-2xl font-bold" style={{ color: "#0d0d0d" }}>8 992 999 97 77</a>
          </div>
          <div className="p-8 bg-white">
            <Icon name="MapPin" size={24} style={{ color: "var(--brand-gold)" }} className="mb-4" />
            <div className="font-body text-xs uppercase tracking-wide mb-1" style={{ color: "var(--brand-text-muted)" }}>Офис</div>
            <div className="font-display text-xl font-bold" style={{ color: "#0d0d0d" }}>ул. Кирова, 7</div>
            <div className="font-body text-sm" style={{ color: "var(--brand-text-muted)" }}>г. Калуга</div>
          </div>
          <div className="p-8" style={{ background: "var(--brand-gold)" }}>
            <Icon name="Clock" size={24} style={{ color: "#0d0d0d" }} className="mb-4" />
            <div className="font-body text-xs uppercase tracking-wide mb-1" style={{ color: "rgba(13,13,13,0.6)" }}>Режим работы</div>
            <div className="font-display text-xl font-bold" style={{ color: "#0d0d0d" }}>Пн–Сб 9:00–20:00</div>
            <div className="font-body text-sm" style={{ color: "rgba(13,13,13,0.7)" }}>Поддержка 24/7 онлайн</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "var(--brand-black)" }} className="py-8">
        <div className="hazard-bg h-1.5 w-full mb-8" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-white font-bold text-lg">
            ВСЁ О СТРОЙКЕ<span style={{ color: "var(--brand-gold)" }}>.РФ</span>
          </div>
          <div className="font-body text-xs text-white/40">© 2024 · Единая строительная экосистема России</div>
          <div className="font-body text-xs" style={{ color: "var(--brand-gold)" }}>WCAG 2.1 AA · ФЗ-152 · Данные защищены</div>
        </div>
      </footer>
    </div>
  );
}
