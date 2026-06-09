import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Главная" },
    { to: "/estimator", label: "Калькулятор сметы" },
    { to: "/machinery", label: "Диспетчерская техники" },
  ];

  return (
    <header style={{ background: "var(--brand-dark)" }} className="sticky top-0 z-50 shadow-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div
              style={{ background: "var(--brand-gold)", color: "var(--brand-dark)" }}
              className="w-8 h-8 flex items-center justify-center font-display font-bold text-sm"
            >
              СР
            </div>
            <span className="font-display text-white text-lg font-semibold tracking-wide hidden sm:block">
              СтройРяд<span style={{ color: "var(--brand-gold)" }}>.РФ</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 font-body text-sm font-medium transition-all duration-200"
                style={{
                  color: location.pathname === link.to ? "var(--brand-gold)" : "rgba(255,255,255,0.75)",
                  borderBottom: location.pathname === link.to ? "2px solid var(--brand-gold)" : "2px solid transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/estimator"
              className="px-5 py-2 text-sm font-body font-semibold transition-all duration-200 hover:opacity-90"
              style={{ background: "var(--brand-gold)", color: "var(--brand-dark)" }}
            >
              Рассчитать смету →
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "var(--brand-dark)", borderTop: "1px solid rgba(255,255,255,0.1)" }} className="md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-3 font-body text-sm"
              style={{
                color: location.pathname === link.to ? "var(--brand-gold)" : "rgba(255,255,255,0.8)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div className="px-6 py-3">
            <Link
              to="/estimator"
              onClick={() => setMenuOpen(false)}
              className="block text-center px-4 py-2 text-sm font-body font-semibold"
              style={{ background: "var(--brand-gold)", color: "var(--brand-dark)" }}
            >
              Рассчитать смету →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
