import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/* ─── palette ─────────────────────────────────────── */
const C = {
  bg:       "#f8fafc",
  card:     "#ffffff",
  cardAlt:  "#f0f9f4",
  border:   "#d1e9d5",
  borderLt: "#86c995",
  green:    "#16a34a",
  greenMd:  "#22c55e",
  greenLt:  "#4ade80",
  greenXl:  "#bbf7d0",
  sky:      "#0ea5e9",
  skyMd:    "#38bdf8",
  skyLt:    "#7dd3fc",
  skyXl:    "#bae6fd",
  white:    "#ffffff",
  dark:     "#0f172a",
  grey:     "#475569",
  greyDk:   "#94a3b8",
};

/* ─── breakpoint hook ──────────────────────────────── */
function useBreakpoint() {
  const [w, setW] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { isMobile: w < 768, isTablet: w < 1024 };
}

const SERVICES = [
  {
    title: "CCTV Camera",
    desc: "HD & smart surveillance systems for 24/7 monitoring of homes, offices, and industrial sites.",
    icon: "📹",
    tags: ["HD/4K", "Night Vision"],
    tagTypes: ["green", "sky"],
  },
  {
    title: "Fire Alarm",
    desc: "Early-warning fire detection and alarm systems compliant with safety regulations.",
    icon: "🔥",
    tags: ["Smoke Detection", "Compliant"],
    tagTypes: ["green", "sky"],
  },
  {
    title: "Biometric",
    desc: "Fingerprint and facial recognition systems for secure, contactless access control.",
    icon: "🖐️",
    tags: ["Fingerprint", "Face ID"],
    tagTypes: ["green", "sky"],
  },
  {
    title: "Billing Software",
    desc: "GST-compliant billing and point-of-sale software to streamline invoicing and manage your retail or shop transactions.",
    icon: "💳",
    tags: ["GST Invoicing", "POS"],
    tagTypes: ["green", "sky"],
  },
 {
    title: "Door Access System",
    desc: "Card, PIN, and remote-controlled access systems to manage entry across your premises.",
    icon: "🚪",
    tags: ["Card & PIN", "Remote Control"],
    tagTypes: ["green", "sky"],
  },
  {
    title: "Intercom System",
    desc: "Audio & video intercom solutions for seamless visitor communication and verification.",
    icon: "☎️",
    tags: ["Audio/Video", "Visitor Verification"],
    tagTypes: ["green", "sky"],
  },
  {
    title: "PA System",
    desc: "Public address systems for clear, reliable announcements across large facilities.",
    icon: "📢",
    tags: ["Wide Coverage", "Clear Audio"],
    tagTypes: ["green", "sky"],
  },
  {
    title: "Home Automation",
    desc: "Smart switches, app-based controls, and automated lighting for a connected, modern home.",
    icon: "🏠",
    tags: ["Smart Switches", "App Control"],
    tagTypes: ["green", "sky"],
  },
];

const STATS = [
  { value: "9+",   label: "Years Experience" },
  { value: "200+", label: "Installations" },
  { value: "24/7", label: "Live Support" },
  { value: "100%", label: "Satisfaction Rate" },
];

const WHY = [
  {
    num: "01",
    title: "Site Survey Included",
    desc: "Every project begins with a free on-site assessment so we propose exactly what you need — no over-selling.",
  },
  {
    num: "02",
    title: "Certified Engineers",
    desc: "Our technicians hold industry certifications and undergo regular training on the latest security technologies.",
  },
  {
    num: "03",
    title: "Post-Install Support",
    desc: "We don't disappear after handover. Annual maintenance contracts and same-day support keep your system running.",
  },
  {
    num: "04",
    title: "Transparent Pricing",
    desc: "Itemised quotes with no hidden costs. You know exactly what you're paying for before any work begins.",
  },
];

/* ─── sub-components ───────────────────────────────── */

function ServiceCard({ icon, title, desc, isMobile, featured }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? C.cardAlt : C.card,
        border: `1px solid ${hov ? C.borderLt : C.border}`,
        borderRadius: 14,
        padding: isMobile ? "20px 18px" : "28px 24px",
        cursor: "default",
        transition: "background 0.2s, border-color 0.2s, transform 0.2s",
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov ? `0 8px 32px #16a34a18` : "0 1px 4px #0001",
        gridColumn: featured ? "span 1" : undefined,
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
      <div style={{
        color: C.dark, fontWeight: 700, fontSize: 15,
        marginBottom: 8, letterSpacing: ".01em",
      }}>
        {title}
      </div>
      <div style={{ color: C.grey, fontSize: 13.5, lineHeight: 1.65 }}>
        {desc}
      </div>
    </div>
  );
}

function WhyCard({ num, title, desc, isMobile }) {
  return (
    <div style={{
      display: "flex", gap: 18, alignItems: "flex-start",
    }}>
      <div style={{
        color: C.green, fontWeight: 800,
        fontSize: isMobile ? 13 : 14,
        letterSpacing: ".08em", flexShrink: 0,
        marginTop: 2, fontVariantNumeric: "tabular-nums",
        opacity: 0.85,
      }}>
        {num}
      </div>
      <div>
        <div style={{
          color: C.dark, fontWeight: 700, fontSize: 15, marginBottom: 6,
        }}>
          {title}
        </div>
        <div style={{ color: C.grey, fontSize: 13.5, lineHeight: 1.65 }}>
          {desc}
        </div>
      </div>
    </div>
  );
}

/* ─── shield SVG ───────────────────────────────────── */
function ShieldGraphic() {
  return (
    <svg
      viewBox="0 0 340 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 340, display: "block" }}
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#f8fafc" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.4" />
        </linearGradient>
        <filter id="blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      {/* ambient glow blob */}
      <ellipse cx="170" cy="175" rx="130" ry="130" fill="url(#glow)" filter="url(#blur)" />

      {/* outer shield */}
      <path
        d="M170 24 L310 80 L310 185 C310 268 234 330 170 356 C106 330 30 268 30 185 L30 80 Z"
        fill="#f0fdf4"
        stroke="#86efac"
        strokeWidth="1.5"
      />

      {/* inner shield fill gradient */}
      <path
        d="M170 48 L290 96 L290 185 C290 254 222 308 170 331 C118 308 50 254 50 185 L50 96 Z"
        fill="url(#shieldGrad)"
        opacity="0.2"
      />

      {/* ring dashes */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
        const r = 108;
        const rad = (deg * Math.PI) / 180;
        const x1 = 170 + (r - 6) * Math.sin(rad);
        const y1 = 175 - (r - 6) * Math.cos(rad);
        const x2 = 170 + r * Math.sin(rad);
        const y2 = 175 - r * Math.cos(rad);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.5" />
        );
      })}
      <circle cx="170" cy="175" r="108" stroke="#22c55e" strokeWidth="0.6"
        strokeOpacity="0.3" fill="none" />

      {/* lock body */}
      <rect x="142" y="178" width="56" height="46" rx="8"
        fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
      {/* lock shackle */}
      <path d="M155 178 L155 162 A15 15 0 0 1 185 162 L185 178"
        stroke="#0ea5e9" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* keyhole */}
      <circle cx="170" cy="198" r="6" fill="#16a34a" />
      <rect x="167" y="198" width="6" height="12" rx="3" fill="#16a34a" />

      {/* corner dots */}
      {[[60, 100],[280, 100],[50, 220],[290, 220]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#0ea5e9" opacity="0.6" />
      ))}

      {/* bottom tag */}
      <rect x="117" y="344" width="106" height="22" rx="11"
        fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
      <text x="170" y="359" textAnchor="middle"
        fontSize="10" fill="#16a34a" fontWeight="700" letterSpacing="1.5">
        PROTECTED
      </text>
    </svg>
  );
}

/* ─── main page ────────────────────────────────────── */
export default function HomePage() {
  const { isMobile, isTablet } = useBreakpoint();

  // 7 services: 3-column grid leaves 1 orphan card on the last row.
  // Use a 4-column grid on desktop so rows read 4 + 3 (centered),
  // and keep 2-column on tablet, 1-column on mobile.
  const servicesCols = isMobile ? 1 : isTablet ? 2 : 4;

  return (
    <div style={{ background: C.bg, color: C.dark, fontFamily: "system-ui, sans-serif", overflowX: "hidden" }}>

      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex", alignItems: "center",
        padding: isMobile ? "60px 20px 52px" : isTablet ? "80px 40px" : "100px 80px",
        position: "relative",
        borderBottom: `1px solid ${C.border}`,
      }}>
        {/* subtle grid bg */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(${C.border}80 1px, transparent 1px),
            linear-gradient(90deg, ${C.border}80 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 40%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 40%, black 30%, transparent 100%)",
        }} />

        <div style={{
          maxWidth: 1200, margin: "0 auto", width: "100%",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          gap: isMobile ? 40 : 60,
          position: "relative",
        }}>

          {/* left copy */}
          <div style={{ flex: 1 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              background: "#dcfce7", border: `1px solid ${C.borderLt}`,
              borderRadius: 20, padding: "5px 14px", marginBottom: 24,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} />
              <span style={{ fontSize: 12, color: C.green, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>
                4+ Years of Trusted Protection
              </span>
            </div>

            <h1 style={{
              fontSize: isMobile ? "2.4rem" : isTablet ? "2.8rem" : "3.6rem",
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-.02em",
              margin: "0 0 20px",
              color: C.dark,
            }}>
              CCTV Camera in Kanchipuram{" "}
              <span style={{
                background: `linear-gradient(135deg, ${C.green}, ${C.sky})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                You Can Trust.
              </span>
              <br />Security Services That Deliver.
            </h1>

            <p style={{
              color: C.grey, fontSize: isMobile ? 15 : 16.5,
              lineHeight: 1.75, maxWidth: 520, marginBottom: 36,
            }}>
              RS Infotech Security Systems is Kanchipuram's trusted provider of CCTV camera installation, biometric access control, fire alarm systems, and complete security services in Kanchipuram for homes and workplaces across Tamil Nadu.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link to="/contact" style={{
                background: C.green, color: "#fff",
                fontSize: 15, fontWeight: 700,
                padding: "13px 28px", borderRadius: 9,
                textDecoration: "none", letterSpacing: ".02em",
                boxShadow: `0 4px 20px #16a34a33`,
                display: "inline-block",
              }}>
                Get a Free Quote
              </Link>
              <Link to="/services" style={{
                background: "transparent", color: C.sky,
                fontSize: 15, fontWeight: 600,
                padding: "13px 28px", borderRadius: 9,
                textDecoration: "none", letterSpacing: ".02em",
                border: `1px solid ${C.skyLt}`,
                display: "inline-block",
              }}>
                View Services →
              </Link>
            </div>
          </div>

          {/* right shield */}
          {!isMobile && (
            <div style={{
              flex: "0 0 auto", width: isTablet ? 260 : 320,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <ShieldGraphic />
            </div>
          )}
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────── */}
      <section style={{
        borderBottom: `1px solid ${C.border}`,
        background: "#f0fdf4",
        padding: isMobile ? "28px 20px" : "32px 80px",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: `repeat(${isMobile ? 2 : 4}, 1fr)`,
          gap: isMobile ? "24px 16px" : 0,
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              textAlign: "center",
              borderRight: (!isMobile && i < 3) ? `1px solid ${C.border}` : "none",
              padding: "8px 0",
            }}>
              <div style={{
                fontSize: isMobile ? "2rem" : "2.4rem", fontWeight: 800,
                color: C.green, letterSpacing: "-.02em", lineHeight: 1.1,
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12.5, color: C.grey, marginTop: 4, letterSpacing: ".06em", textTransform: "uppercase" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────── */}
      <section style={{
        padding: isMobile ? "60px 20px" : "80px 80px",
        borderBottom: `1px solid ${C.border}`,
        background: C.bg,
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: isMobile ? 36 : 48 }}>
            <div style={{
              fontSize: 11.5, fontWeight: 700, color: C.sky,
              letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 10,
            }}>
              What We Do
            </div>
            <h2 style={{
              fontSize: isMobile ? "1.8rem" : "2.2rem", fontWeight: 800,
              letterSpacing: "-.02em", margin: "0 0 12px", color: C.dark,
            }}>
              Complete Security Services in Kanchipuram
            </h2>
            <p style={{ color: C.grey, fontSize: 15, maxWidth: 620, lineHeight: 1.7, margin: 0 }}>
              From CCTV camera installation in Kanchipuram to security services for workplaces, shops, temples, and textile units — we handle everything in-house, on schedule, with local support across Tamil Nadu.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${servicesCols}, 1fr)`,
            gap: 18,
          }}>
            {SERVICES.map((s) => (
              <ServiceCard key={s.title} {...s} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────── */}
      <section style={{
        padding: isMobile ? "60px 20px" : "80px 80px",
        borderBottom: `1px solid ${C.border}`,
        background: "#f0f9ff",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 40 : 80,
          alignItems: "flex-start",
        }}>
          {/* left label */}
          <div style={{ flex: "0 0 auto", maxWidth: isMobile ? "100%" : 320 }}>
            <div style={{
              fontSize: 11.5, fontWeight: 700, color: C.sky,
              letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 10,
            }}>
              Why Choose Us
            </div>
            <h2 style={{
              fontSize: isMobile ? "1.8rem" : "2.1rem", fontWeight: 800,
              letterSpacing: "-.02em", margin: "0 0 16px", color: C.dark, lineHeight: 1.2,
            }}>
              The RS Infotech Difference
            </h2>
            <p style={{ color: C.grey, fontSize: 14.5, lineHeight: 1.75, margin: 0 }}>
              Over four years we've refined a process that prioritises honesty, craftsmanship, and long-term relationships over quick sales.
            </p>

            <Link to="/contact" style={{
              display: "inline-block", marginTop: 28,
              background: C.white, color: C.green,
              fontSize: 14, fontWeight: 600,
              padding: "11px 22px", borderRadius: 8,
              textDecoration: "none",
              border: `1px solid ${C.borderLt}`,
              boxShadow: "0 1px 4px #0001",
            }}>
              Book a Survey →
            </Link>
          </div>

          {/* right grid */}
          <div style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 28 : "36px 48px",
          }}>
            {WHY.map((w) => (
              <WhyCard key={w.num} {...w} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────── */}
      <section style={{
        padding: isMobile ? "56px 20px" : "72px 80px",
        background: C.bg,
      }}>
        <div style={{
          maxWidth: 900, margin: "0 auto", textAlign: "center",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "#dcfce7", border: `1px solid ${C.borderLt}`,
            borderRadius: 20, padding: "5px 14px", marginBottom: 20,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} />
            <span style={{ fontSize: 12, color: C.green, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>
              Free Consultation
            </span>
          </div>

          <h2 style={{
            fontSize: isMobile ? "1.9rem" : "2.6rem", fontWeight: 800,
            letterSpacing: "-.02em", margin: "0 0 16px", color: C.dark, lineHeight: 1.2,
          }}>
            Ready to Secure What Matters?
          </h2>
          <p style={{
            color: C.grey, fontSize: isMobile ? 14.5 : 16,
            lineHeight: 1.75, maxWidth: 520, margin: "0 auto 32px",
          }}>
            Talk to Kanchipuram's top-rated security team today — no obligation, no jargon. We'll walk you through the right solution for your space and budget.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" style={{
              background: C.green, color: "#fff",
              fontSize: 15, fontWeight: 700,
              padding: "14px 32px", borderRadius: 9,
              textDecoration: "none", letterSpacing: ".02em",
              boxShadow: `0 4px 24px #16a34a33`,
            }}>
              Contact Us
            </Link>
            <a href="tel:+916380855659" style={{
              background: C.white, color: C.sky,
              fontSize: 15, fontWeight: 600,
              padding: "14px 32px", borderRadius: 9,
              textDecoration: "none",
              border: `1px solid ${C.skyLt}`,
              boxShadow: "0 1px 4px #0001",
            }}>
              📞 Call Now
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER NOTE ──────────────────────────────── */}
      <div style={{
        borderTop: `1px solid ${C.border}`,
        padding: "20px",
        textAlign: "center",
        color: C.greyDk, fontSize: 12.5,
        background: C.bg,
      }}>
        RS Infotech Security Systems — CCTV camera installation and security services in Kanchipuram, Tamil Nadu, including security services for workplaces, shops, temples, and textile units. © {new Date().getFullYear()} All rights reserved.
      </div>

    </div>
  );
}