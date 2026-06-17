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
  sky:      "#0ea5e9",
  skyLt:    "#bae6fd",
  dark:     "#0f172a",
  grey:     "#475569",
  greyDk:   "#94a3b8",
  greyMd:   "#64748b",
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
];

const STATS = [
  { value: "6",    label: "Service Areas" },
  { value: "200+", label: "Installations" },
  { value: "9+",   label: "Years Experience" },
  { value: "24/7", label: "Live Support" },
];

const PROCESS = [
  {
    num: "01",
    title: "Free Site Survey",
    desc: "We visit your premises, assess the layout, and identify the exact coverage you need.",
  },
  {
    num: "02",
    title: "Custom Proposal",
    desc: "You receive an itemised quote — no hidden costs, no up-selling beyond what's required.",
  },
  {
    num: "03",
    title: "Professional Install",
    desc: "Certified engineers complete the installation cleanly and on schedule.",
  },
  {
    num: "04",
    title: "Ongoing Support",
    desc: "Annual AMC contracts and same-day support keep your system running year-round.",
  },
];

/* ─── Tag component ────────────────────────────────── */
function Tag({ label, type }) {
  const isGreen = type === "green";
  return (
    <span style={{
      fontSize: 11, fontWeight: 700,
      padding: "3px 10px", borderRadius: 20,
      background: isGreen ? "#dcfce7" : "#e0f2fe",
      color: isGreen ? "#15803d" : "#0369a1",
      letterSpacing: ".02em",
    }}>
      {label}
    </span>
  );
}

/* ─── Service Card ─────────────────────────────────── */
function ServiceCard({ icon, title, desc, tags, tagTypes, isMobile }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? C.cardAlt : C.card,
        border: `1px solid ${hov ? C.borderLt : C.border}`,
        borderRadius: 14,
        padding: isMobile ? "20px 18px" : "24px 20px",
        transition: "background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s",
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov ? "0 6px 24px #16a34a12" : "0 1px 3px #0001",
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 11,
        background: "#f0fdf4", border: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, marginBottom: 14,
      }}>
        {icon}
      </div>
      <div style={{
        color: C.dark, fontWeight: 700, fontSize: 15,
        marginBottom: 8, letterSpacing: ".005em",
      }}>
        {title}
      </div>
      <div style={{
        color: C.grey, fontSize: 13.5, lineHeight: 1.65, marginBottom: 14,
      }}>
        {desc}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {tags.map((tag, i) => (
          <Tag key={i} label={tag} type={tagTypes[i]} />
        ))}
      </div>
    </div>
  );
}

/* ─── Process Step ─────────────────────────────────── */
function ProcessStep({ num, title, desc }) {
  return (
    <div style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: "20px 16px",
      textAlign: "center",
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: "#f0fdf4", border: `1.5px solid ${C.borderLt}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 12px",
        fontSize: 13, fontWeight: 800, color: C.green,
      }}>
        {num}
      </div>
      <div style={{
        fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 6,
      }}>
        {title}
      </div>
      <div style={{ fontSize: 12.5, color: C.greyMd, lineHeight: 1.6 }}>
        {desc}
      </div>
    </div>
  );
}

/* ─── Main Page ────────────────────────────────────── */
export default function ServicesPage() {
  const { isMobile, isTablet } = useBreakpoint();

  return (
    <div style={{
      background: C.bg,
      color: C.dark,
      fontFamily: "system-ui, sans-serif",
      overflowX: "hidden",
    }}>

      {/* ── HERO ───────────────────────────────────── */}
      <section style={{
        background: "#f0fdf4",
        borderBottom: `1px solid ${C.border}`,
        padding: isMobile ? "52px 20px 44px" : "64px 80px 52px",
        textAlign: "center",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(${C.border}80 1px, transparent 1px),
            linear-gradient(90deg, ${C.border}80 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 80% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 50% 50%, black 20%, transparent 100%)",
        }} />

        <div style={{ position: "relative" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "#dcfce7", border: `1px solid ${C.borderLt}`,
            borderRadius: 20, padding: "4px 13px", marginBottom: 18,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} />
            <span style={{
              fontSize: 11, color: "#15803d", fontWeight: 700,
              letterSpacing: ".1em", textTransform: "uppercase",
            }}>
              Our Services
            </span>
          </div>

          <h1 style={{
            fontSize: isMobile ? "2rem" : "2.4rem",
            fontWeight: 800, color: C.dark,
            letterSpacing: "-.02em", lineHeight: 1.15,
            margin: "0 0 14px",
          }}>
            Everything You Need to Stay{" "}
            <span style={{ color: C.green }}>Secure</span>
          </h1>

          <p style={{
            color: C.grey, fontSize: isMobile ? 14.5 : 15.5,
            lineHeight: 1.7, maxWidth: 520, margin: "0 auto",
          }}>
            From CCTV and fire alarms to smart home automation — RS Infotech delivers
            end-to-end security solutions for homes and businesses across Tamil Nadu.
          </p>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────── */}
      <section style={{
        background: C.card,
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: `repeat(${isMobile ? 2 : 4}, 1fr)`,
          gap: 0,
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              textAlign: "center",
              padding: isMobile ? "20px 0" : "20px 0",
              borderRight: (!isMobile && i < 3) ? `1px solid ${C.border}` : "none",
              borderBottom: (isMobile && i < 2) ? `1px solid ${C.border}` : "none",
            }}>
              <div style={{
                fontSize: isMobile ? "1.7rem" : "2rem",
                fontWeight: 800, color: C.green,
                lineHeight: 1, letterSpacing: "-.02em",
              }}>
                {s.value}
              </div>
              <div style={{
                fontSize: 11, color: C.greyDk,
                marginTop: 4, letterSpacing: ".07em",
                textTransform: "uppercase",
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

   {/* ── SERVICES GRID ──────────────────────────── */}
<section style={{
  padding: isMobile ? "52px 20px" : "64px 80px",
  borderBottom: `1px solid ${C.border}`,
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
        Complete Security Solutions
      </h2>
      <p style={{ color: C.grey, fontSize: 15, maxWidth: 500, lineHeight: 1.7, margin: 0 }}>
        From a single camera to a full enterprise-grade system — we handle everything in-house.
      </p>
    </div>

    <div style={{
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)",
      gap: 18,
    }}>
      {SERVICES.map((s) => (
        <ServiceCard key={s.title} {...s} isMobile={isMobile} />
      ))}
    </div>
  </div>
</section>

      {/* ── PROCESS ────────────────────────────────── */}
      <section style={{
        padding: isMobile ? "52px 20px" : "64px 80px",
        borderBottom: `1px solid ${C.border}`,
        background: "#f0f9ff",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: C.sky,
            letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 8,
          }}>
            How It Works
          </div>
          <h2 style={{
            fontSize: isMobile ? "1.6rem" : "1.9rem",
            fontWeight: 800, color: C.dark,
            letterSpacing: "-.02em", margin: "0 0 28px",
          }}>
            Our Process
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: 14,
          }}>
            {PROCESS.map((p) => (
              <ProcessStep key={p.num} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────── */}
      <section style={{
        padding: isMobile ? "52px 20px" : "64px 80px",
        background: C.bg,
      }}>
        <div style={{
          maxWidth: 700, margin: "0 auto",
          background: "#f0fdf4",
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          padding: isMobile ? "32px 24px" : "40px 48px",
          textAlign: "center",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "#dcfce7", border: `1px solid ${C.borderLt}`,
            borderRadius: 20, padding: "4px 13px", marginBottom: 16,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} />
            <span style={{
              fontSize: 11, color: "#15803d", fontWeight: 700,
              letterSpacing: ".1em", textTransform: "uppercase",
            }}>
              Free Consultation
            </span>
          </div>

          <h2 style={{
            fontSize: isMobile ? "1.5rem" : "1.8rem",
            fontWeight: 800, color: C.dark,
            letterSpacing: "-.02em", margin: "0 0 10px", lineHeight: 1.2,
          }}>
            Ready to Get Started?
          </h2>
          <p style={{
            color: C.grey, fontSize: isMobile ? 14 : 15,
            lineHeight: 1.7, marginBottom: 24,
          }}>
            Book a free site survey today — our team will walk you through the right
            solution for your space and budget, with zero obligation.
          </p>

          <div style={{
            display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap",
          }}>
            <Link to="/contact" style={{
              background: C.green, color: "#fff",
              fontSize: 14.5, fontWeight: 700,
              padding: "12px 26px", borderRadius: 8,
              textDecoration: "none", letterSpacing: ".02em",
              boxShadow: "0 2px 10px #16a34a28",
              display: "inline-block",
            }}>
              Book a Free Survey
            </Link>
            <a href="tel:+918148800259" style={{
              background: C.card, color: C.sky,
              fontSize: 14.5, fontWeight: 600,
              padding: "12px 26px", borderRadius: 8,
              textDecoration: "none",
              border: `1px solid ${C.skyLt}`,
              display: "inline-block",
            }}>
              📞 Call Now
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER NOTE ────────────────────────────── */}
      <div style={{
        borderTop: `1px solid ${C.border}`,
        padding: "20px",
        textAlign: "center",
        color: C.greyDk, fontSize: 12.5,
        background: C.bg,
      }}>
        © {new Date().getFullYear()} RS Infotech Security Systems. All rights reserved.
      </div>

    </div>
  );
}