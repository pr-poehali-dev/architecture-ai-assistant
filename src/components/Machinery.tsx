import { useState, useEffect } from "react";
import {
  loadMachinery,
  addMachinery,
  bookMachinery,
} from "@/utils/storage";
import type { MachineryItem, MachineryType } from "@/utils/storage";
import Icon from "@/components/ui/icon";

const machineryTypes: { value: MachineryType; label: string; icon: string }[] = [
  { value: "excavator", label: "Экскаватор", icon: "Shovel" },
  { value: "dump_truck", label: "Самосвал", icon: "Truck" },
  { value: "aerial_lift", label: "Автовышка", icon: "ArrowUpFromLine" },
  { value: "bulldozer", label: "Бульдозер", icon: "Construction" },
  { value: "crane", label: "Кран", icon: "MoveUp" },
];

function getTypeLabel(value: MachineryType): string {
  return machineryTypes.find((t) => t.value === value)?.label ?? value;
}
function getTypeIcon(value: MachineryType): string {
  return machineryTypes.find((t) => t.value === value)?.icon ?? "Truck";
}

function maskPhone(phone: string): string {
  if (phone.length < 5) return phone;
  return phone.slice(0, 4) + " *** " + phone.slice(-2);
}

const inputClass =
  "w-full px-4 py-3 font-body text-sm outline-none transition-all focus:ring-2 focus:ring-offset-0";
const inputStyle = {
  background: "var(--brand-surface)",
  border: "1px solid var(--brand-border)",
  color: "var(--brand-text)",
  borderRadius: "2px",
};

export default function Machinery() {
  const [tab, setTab] = useState<"owner" | "seeker">("seeker");
  const [items, setItems] = useState<MachineryItem[]>([]);

  // Owner form
  const [ownerForm, setOwnerForm] = useState({
    type: "" as MachineryType | "",
    city: "",
    pricePerHour: "",
    phone: "",
    date: "",
  });
  const [ownerError, setOwnerError] = useState("");
  const [ownerSuccess, setOwnerSuccess] = useState(false);

  // Search form
  const [searchForm, setSearchForm] = useState({
    type: "" as MachineryType | "",
    city: "",
    date: "",
  });
  const [searchResults, setSearchResults] = useState<MachineryItem[] | null>(null);
  const [bookedItem, setBookedItem] = useState<MachineryItem | null>(null);

  useEffect(() => {
    setItems(loadMachinery());
  }, []);

  const handleAddListing = () => {
    setOwnerError("");
    const { type, city, pricePerHour, phone, date } = ownerForm;
    if (!type || !city.trim() || !pricePerHour || !phone.trim() || !date) {
      setOwnerError("Заполните все поля объявления.");
      return;
    }
    const price = parseFloat(pricePerHour);
    if (isNaN(price) || price <= 0) {
      setOwnerError("Укажите корректную цену за час.");
      return;
    }
    const phoneRe = /^(\+7|8)[\d\s\-()]{9,14}$/;
    if (!phoneRe.test(phone.trim())) {
      setOwnerError("Телефон должен начинаться с +7 или 8.");
      return;
    }

    const newItem = addMachinery({
      type: type as MachineryType,
      city: city.trim(),
      pricePerHour: price,
      phone: phone.trim(),
      date,
    });
    const updated = [...items, newItem];
    setItems(updated);
    setOwnerForm({ type: "", city: "", pricePerHour: "", phone: "", date: "" });
    setOwnerSuccess(true);
    setTimeout(() => setOwnerSuccess(false), 3000);
  };

  const handleSearch = () => {
    const { type, city, date } = searchForm;
    const results = items.filter((item) => {
      if (item.booked) return false;
      if (type && item.type !== type) return false;
      if (city.trim() && !item.city.toLowerCase().includes(city.trim().toLowerCase())) return false;
      if (date && item.date !== date) return false;
      return true;
    });
    setSearchResults(results);
  };

  const handleBook = (item: MachineryItem) => {
    bookMachinery(item.id);
    const updated = items.map((i) => i.id === item.id ? { ...i, booked: true } : i);
    setItems(updated);
    setSearchResults((prev) => prev ? prev.filter((i) => i.id !== item.id) : null);
    setBookedItem(item);
    setTimeout(() => setBookedItem(null), 5000);
  };

  return (
    <div style={{ background: "var(--brand-surface)", minHeight: "100vh" }}>
      {/* Page header */}
      <div style={{ background: "var(--brand-dark)" }} className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-body text-xs uppercase tracking-widest" style={{ color: "var(--brand-gold)" }}>
              Онлайн-платформа
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold text-white">
            ДИСПЕТЧЕРСКАЯ ТЕХНИКИ
          </h1>
          <p className="font-body text-white/60 mt-2 text-sm">
            Аренда строительной техники напрямую от владельцев
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Booking notification */}
        {bookedItem && (
          <div
            className="mb-5 p-4 flex items-start gap-3 animate-fade-in"
            style={{
              background: "#f0fdf4",
              border: "1px solid #86efac",
              color: "#166534",
            }}
          >
            <Icon name="CheckCircle" size={18} className="mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-body font-semibold text-sm mb-0.5">Техника забронирована!</div>
              <div className="font-body text-sm">
                Свяжитесь с владельцем по номеру:{" "}
                <strong>{bookedItem.phone}</strong>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div
          className="flex mb-6"
          style={{ borderBottom: "2px solid var(--brand-border)" }}
        >
          {[
            { key: "seeker", label: "Я ищу технику", icon: "Search" },
            { key: "owner", label: "Я владелец техники", icon: "PlusCircle" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as "owner" | "seeker")}
              className="flex items-center gap-2 px-5 py-3 font-body text-sm font-semibold transition-all"
              style={{
                background: "transparent",
                color: tab === t.key ? "var(--brand-dark)" : "var(--brand-text-muted)",
                borderBottom: tab === t.key ? "2px solid var(--brand-dark)" : "2px solid transparent",
                marginBottom: "-2px",
              }}
            >
              <Icon name={t.icon as "Search"} size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Owner tab */}
        {tab === "owner" && (
          <div
            className="p-6 md:p-8 animate-fade-in"
            style={{ background: "white", border: "1px solid var(--brand-border)" }}
          >
            <h2 className="font-display text-xl font-semibold mb-6" style={{ color: "var(--brand-dark)" }}>
              ДОБАВИТЬ ОБЪЯВЛЕНИЕ
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--brand-text-muted)" }}>
                  Тип техники *
                </label>
                <select
                  className={inputClass}
                  style={inputStyle}
                  value={ownerForm.type}
                  onChange={(e) => setOwnerForm({ ...ownerForm, type: e.target.value as MachineryType })}
                >
                  <option value="">— Выберите тип —</option>
                  {machineryTypes.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--brand-text-muted)" }}>
                  Город *
                </label>
                <input
                  type="text"
                  placeholder="Ваш город"
                  className={inputClass}
                  style={inputStyle}
                  value={ownerForm.city}
                  onChange={(e) => setOwnerForm({ ...ownerForm, city: e.target.value })}
                />
              </div>

              <div>
                <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--brand-text-muted)" }}>
                  Цена за час (₽) *
                </label>
                <input
                  type="number"
                  placeholder="Например: 5000"
                  className={inputClass}
                  style={inputStyle}
                  value={ownerForm.pricePerHour}
                  onChange={(e) => setOwnerForm({ ...ownerForm, pricePerHour: e.target.value })}
                />
              </div>

              <div>
                <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--brand-text-muted)" }}>
                  Телефон *
                </label>
                <input
                  type="tel"
                  placeholder="+7 900 000-00-00"
                  className={inputClass}
                  style={inputStyle}
                  value={ownerForm.phone}
                  onChange={(e) => setOwnerForm({ ...ownerForm, phone: e.target.value })}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--brand-text-muted)" }}>
                  Дата доступности *
                </label>
                <input
                  type="date"
                  className={inputClass}
                  style={{ ...inputStyle, maxWidth: "240px" }}
                  value={ownerForm.date}
                  onChange={(e) => setOwnerForm({ ...ownerForm, date: e.target.value })}
                />
              </div>
            </div>

            {ownerError && (
              <div
                className="mt-4 px-4 py-3 flex items-center gap-2 font-body text-sm animate-fade-in"
                style={{ background: "#fff3f3", border: "1px solid #fca5a5", color: "#b91c1c" }}
              >
                <Icon name="AlertCircle" size={16} />
                {ownerError}
              </div>
            )}

            {ownerSuccess && (
              <div
                className="mt-4 px-4 py-3 flex items-center gap-2 font-body text-sm animate-fade-in"
                style={{ background: "#f0fdf4", border: "1px solid #86efac", color: "#166534" }}
              >
                <Icon name="CheckCircle" size={16} />
                Объявление добавлено и доступно для поиска.
              </div>
            )}

            <button
              className="mt-6 flex items-center gap-2 px-8 py-3.5 font-body font-bold text-sm transition-all hover:opacity-90"
              style={{ background: "var(--brand-dark)", color: "white" }}
              onClick={handleAddListing}
            >
              <Icon name="Plus" size={16} />
              Добавить объявление
            </button>
          </div>
        )}

        {/* Seeker tab */}
        {tab === "seeker" && (
          <div className="animate-fade-in">
            {/* Search form */}
            <div
              className="p-6 md:p-8 mb-6"
              style={{ background: "white", border: "1px solid var(--brand-border)" }}
            >
              <h2 className="font-display text-xl font-semibold mb-6" style={{ color: "var(--brand-dark)" }}>
                ПОИСК ТЕХНИКИ
              </h2>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--brand-text-muted)" }}>
                    Тип техники
                  </label>
                  <select
                    className={inputClass}
                    style={inputStyle}
                    value={searchForm.type}
                    onChange={(e) => setSearchForm({ ...searchForm, type: e.target.value as MachineryType })}
                  >
                    <option value="">Любой тип</option>
                    {machineryTypes.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--brand-text-muted)" }}>
                    Город
                  </label>
                  <input
                    type="text"
                    placeholder="Любой город"
                    className={inputClass}
                    style={inputStyle}
                    value={searchForm.city}
                    onChange={(e) => setSearchForm({ ...searchForm, city: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block font-body text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--brand-text-muted)" }}>
                    Дата
                  </label>
                  <input
                    type="date"
                    className={inputClass}
                    style={inputStyle}
                    value={searchForm.date}
                    onChange={(e) => setSearchForm({ ...searchForm, date: e.target.value })}
                  />
                </div>
              </div>

              <button
                className="mt-5 flex items-center gap-2 px-8 py-3 font-body font-bold text-sm transition-all hover:opacity-90"
                style={{ background: "var(--brand-dark)", color: "white" }}
                onClick={handleSearch}
              >
                <Icon name="Search" size={16} />
                Найти технику
              </button>
            </div>

            {/* Results */}
            {searchResults !== null && (
              <div className="animate-fade-in">
                <div
                  className="flex items-center justify-between mb-4 px-1"
                >
                  <h3 className="font-display text-lg font-semibold" style={{ color: "var(--brand-dark)" }}>
                    РЕЗУЛЬТАТЫ ПОИСКА
                  </h3>
                  <span className="font-body text-sm" style={{ color: "var(--brand-text-muted)" }}>
                    {searchResults.length} объявлений
                  </span>
                </div>

                {searchResults.length === 0 ? (
                  <div
                    className="p-12 text-center"
                    style={{ background: "white", border: "1px solid var(--brand-border)" }}
                  >
                    <Icon name="SearchX" size={40} style={{ color: "var(--brand-text-muted)", margin: "0 auto 16px" }} />
                    <div className="font-display text-lg font-semibold mb-2" style={{ color: "var(--brand-dark)" }}>
                      Объявлений не найдено
                    </div>
                    <div className="font-body text-sm" style={{ color: "var(--brand-text-muted)" }}>
                      Попробуйте изменить параметры поиска или снять фильтры.
                    </div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {searchResults.map((item) => (
                      <div
                        key={item.id}
                        className="p-5 transition-all hover:shadow-md"
                        style={{
                          background: "white",
                          border: "1px solid var(--brand-border)",
                        }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                              style={{ background: "var(--brand-dark)" }}
                            >
                              <Icon
                                name={getTypeIcon(item.type) as "Truck"}
                                size={18}
                                style={{ color: "var(--brand-gold)" }}
                              />
                            </div>
                            <div>
                              <div className="font-display text-base font-bold" style={{ color: "var(--brand-dark)" }}>
                                {getTypeLabel(item.type)}
                              </div>
                              <div className="font-body text-xs mt-0.5" style={{ color: "var(--brand-text-muted)" }}>
                                {item.city}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-display text-lg font-bold" style={{ color: "var(--brand-gold)" }}>
                              {item.pricePerHour.toLocaleString("ru-RU")} ₽
                            </div>
                            <div className="font-body text-xs" style={{ color: "var(--brand-text-muted)" }}>
                              в час
                            </div>
                          </div>
                        </div>

                        <div
                          className="grid grid-cols-2 gap-2 py-3 mb-3"
                          style={{ borderTop: "1px solid var(--brand-border)", borderBottom: "1px solid var(--brand-border)" }}
                        >
                          <div>
                            <div className="font-body text-xs uppercase tracking-wide mb-0.5" style={{ color: "var(--brand-text-muted)" }}>Телефон</div>
                            <div className="font-body text-sm font-medium" style={{ color: "var(--brand-dark)" }}>
                              {maskPhone(item.phone)}
                            </div>
                          </div>
                          <div>
                            <div className="font-body text-xs uppercase tracking-wide mb-0.5" style={{ color: "var(--brand-text-muted)" }}>Дата доступности</div>
                            <div className="font-body text-sm font-medium" style={{ color: "var(--brand-dark)" }}>
                              {new Date(item.date + "T00:00:00").toLocaleDateString("ru-RU", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </div>
                          </div>
                        </div>

                        <button
                          className="w-full py-2.5 font-body text-sm font-bold transition-all hover:opacity-90"
                          style={{ background: "var(--brand-dark)", color: "white" }}
                          onClick={() => handleBook(item)}
                        >
                          Забронировать
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {searchResults === null && (
              <div
                className="p-10 text-center"
                style={{ background: "white", border: "1px dashed var(--brand-border)" }}
              >
                <Icon name="Truck" size={40} style={{ color: "var(--brand-text-muted)", margin: "0 auto 12px" }} />
                <div className="font-body text-sm" style={{ color: "var(--brand-text-muted)" }}>
                  Укажите параметры и нажмите «Найти технику»
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
