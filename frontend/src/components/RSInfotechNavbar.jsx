import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home",     path: "/" },
  { label: "Services", path: "/services" },
  { label: "Contact",  path: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false
  );
  const { pathname } = useLocation();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <nav style={{
        width: "100%",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #d1e9d5",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 12px #16a34a12",
      }}>
        <div style={{
          padding: isMobile ? "0 16px" : "0 32px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}>

          {/* ── Logo left ── */}
          <Link
            to="/"
            style={{
              display: "flex", alignItems: "center", gap: 10,
              textDecoration: "none", flexShrink: 0,
            }}
          >
            <img
              src="/rs.png"
              alt="RS Infotech"
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                objectFit: "cover",
                objectPosition: "center",
                transform: "scale(2)",
              }}
            />
            {!isMobile && (
              <div>
                <div style={{
                  fontWeight: 700, fontSize: 17,
                  color: "#0f172a", letterSpacing: ".02em",
                }}>
                  RS<span style={{ color: "#16a34a" }}>Infotech</span>
                </div>
                <div style={{
                  fontSize: "0.6rem", color: "#94a3b8",
                  letterSpacing: ".1em", textTransform: "uppercase",
                }}>
                  Security Systems
                </div>
              </div>
            )}
            {isMobile && (
              <div style={{ fontWeight: 700, fontSize: 16, color: "#16a34a" }}>
                RSInfotech
              </div>
            )}
          </Link>

          {/* ── Desktop center links ── */}
          {!isMobile && (
            <div style={{
              display: "flex", alignItems: "center", gap: 4,
              flex: 1, justifyContent: "center",
            }}>
              {NAV_LINKS.map((link) => (
                <NavButton
                  key={link.path}
                  label={link.label}
                  active={pathname === link.path}
                  to={link.path}
                />
              ))}
            </div>
          )}

          {/* ── Right side ── */}
          <div style={{
            display: "flex", alignItems: "center",
            gap: isMobile ? 8 : 12, flexShrink: 0,
          }}>
            {/* 24/7 badge — desktop only */}
            {!isMobile && (
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "#f0fdf4", border: "1px solid #86c995",
                borderRadius: 20, padding: "5px 12px",
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#22c55e",
                }} />
                <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 600 }}>
                  24/7 Support
                </span>
              </div>
            )}

            {/* Get a Quote button */}
            {!isMobile && (
              <Link to="/contact" style={{
                background: "#16a34a",
                color: "#ffffff",
                fontSize: "0.84rem",
                fontWeight: 600,
                padding: "8px 20px",
                borderRadius: 7,
                textDecoration: "none",
                whiteSpace: "nowrap",
                letterSpacing: ".02em",
                display: "inline-block",
                boxShadow: "0 2px 8px #16a34a28",
              }}>
                Get a Quote
              </Link>
            )}

            {/* Hamburger — mobile only */}
            {isMobile && (
              <button
                onClick={() => setMenuOpen((o) => !o)}
                style={{
                  background: menuOpen ? "#f0fdf4" : "transparent",
                  border: `1px solid ${menuOpen ? "#86c995" : "#d1e9d5"}`,
                  borderRadius: 8, padding: "7px 9px",
                  cursor: "pointer", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  color: "#16a34a", fontSize: "1.2rem",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? "✕" : "☰"}
              </button>
            )}
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        {isMobile && menuOpen && (
          <div style={{
            borderTop: "1px solid #d1e9d5",
            background: "#ffffff",
            padding: "12px 16px 20px",
            display: "flex", flexDirection: "column", gap: 4,
            animation: "slideDown 0.18s ease",
          }}>
            {NAV_LINKS.map((link) => (
              <MobileNavButton
                key={link.path}
                label={link.label}
                active={pathname === link.path}
                to={link.path}
              />
            ))}

            <Link
              to="/contact"
              style={{
                background: "#16a34a", color: "#ffffff",
                fontSize: "0.9rem", fontWeight: 600,
                padding: "12px 16px", borderRadius: 10,
                textDecoration: "none", textAlign: "center",
                marginTop: 8, display: "block",
                boxShadow: "0 2px 8px #16a34a28",
              }}
            >
              Get a Quote
            </Link>

            <div style={{
              marginTop: 8,
              display: "flex", alignItems: "center", gap: 6,
              background: "#f0fdf4", border: "1px solid #86c995",
              borderRadius: 20, padding: "6px 14px", alignSelf: "flex-start",
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 600 }}>24/7 Support</span>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

function NavButton({ label, active, to }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: active || hov ? "#f0fdf4" : "transparent",
        color: active ? "#16a34a" : hov ? "#0ea5e9" : "#475569",
        fontSize: 14, fontWeight: 500,
        textDecoration: "none",
        padding: "8px 16px", borderRadius: 8,
        borderBottom: active ? "2px solid #16a34a" : "2px solid transparent",
        transition: "background 0.2s, color 0.2s",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Link>
  );
}

function MobileNavButton({ label, active, to }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: active ? "#f0fdf4" : hov ? "#f8fafc" : "transparent",
        border: `1px solid ${active ? "#86c995" : "transparent"}`,
        color: active ? "#16a34a" : hov ? "#0ea5e9" : "#475569",
        fontSize: 15, fontWeight: active ? 700 : 500,
        textDecoration: "none",
        padding: "12px 16px", borderRadius: 10,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "background 0.15s, color 0.15s",
      }}
    >
      {label}
      {active && (
        <span style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "#22c55e", flexShrink: 0,
        }} />
      )}
    </Link>
  );
}
