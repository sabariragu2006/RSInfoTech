import { useState, useEffect } from "react";

const C = {
  bg:       "#f8fafc",
  card:     "#ffffff",
  cardAlt:  "#f0f9f4",
  border:   "#d1e9d5",
  borderLt: "#86c995",
  green:    "#16a34a",
  sky:      "#0ea5e9",
  skyLt:    "#bae6fd",
  dark:     "#0f172a",
  grey:     "#475569",
  greyDk:   "#94a3b8",
};

function useBreakpoint() {
  const [w, setW] = useState(() => window.innerWidth);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { isMobile: w < 768, isTablet: w < 1024 };
}

function InfoRow({ icon, label, value, href }) {
  const [hov, setHov] = useState(false);
  const content = (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "flex-start", gap: 16,
        padding: "18px 0",
        borderBottom: `1px solid ${C.border}`,
        cursor: href ? "pointer" : "default",
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
        background: hov ? "#dcfce7" : "#f0fdf4",
        border: `1px solid ${hov ? C.borderLt : C.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, transition: "background 0.2s, border-color 0.2s",
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 11.5, color: C.greyDk, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 3 }}>
          {label}
        </div>
        <div style={{
          fontSize: 14.5, color: href ? (hov ? C.green : C.sky) : C.dark,
          fontWeight: href ? 600 : 500, lineHeight: 1.5,
          transition: "color 0.2s",
        }}>
          {value}
        </div>
      </div>
    </div>
  );
  if (href) {
    return <a href={href} style={{ textDecoration: "none", display: "block" }}>{content}</a>;
  }
  return content;
}

/* ─── social links data ───────────────────────────── */
const SOCIALS = [
  {
    label: "Instagram",
    handle: "@rsinfotechkanchipuram",
    href: "https://www.instagram.com/rsinfotechkanchipuram/",
    icon: "📷",
    bg: "#fdf2f8",
    border: "#fbcfe8",
    color: "#be185d",
  },
  {
    label: "LinkedIn",
    handle: "rs-infotech",
    href: "https://www.linkedin.com/in/rs-infotech-781650419/",
    icon: "💼",
    bg: "#eff6ff",
    border: "#bfdbfe",
    color: "#1d4ed8",
  },
  {
    label: "X (Twitter)",
    handle: "@rsinfotechcv",
    href: "https://x.com/rsinfotechcv",
    icon: "✕",
    bg: "#f8fafc",
    border: "#e2e8f0",
    color: "#0f172a",
  },
  {
    label: "YouTube",
    handle: "RS Infotech",
    href: "https://www.youtube.com/channel/UCrSTaKdOfZeCG9bfkYUvbJA",
    icon: "▶️",
    bg: "#fef2f2",
    border: "#fecaca",
    color: "#b91c1c",
  },
];

function SocialRow({ label, handle, href, icon, bg, border, color }) {
  const [hov, setHov] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: bg,
        color,
        fontSize: 14,
        fontWeight: 600,
        padding: "13px 20px",
        borderRadius: 10,
        textDecoration: "none",
        border: `1px solid ${hov ? color : border}`,
        transition: "border-color 0.2s, transform 0.2s",
        transform: hov ? "translateY(-1px)" : "none",
      }}
    >
      <span style={{ fontSize: 18, width: 22, textAlign: "center" }}>
        {icon}
      </span>

      <div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: ".06em",
            opacity: 0.75,
          }}
        >
          {label.toUpperCase()}
        </div>

        <div>{handle}</div>
      </div>
    </a>
  );
}

/* ─── Footer social icons (compact) ───────────────── */
function FooterSocialIcons() {
  const [hovIdx, setHovIdx] = useState(null);
  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 12 }}>
 {SOCIALS.map((s, i) => (
  <a
    key={s.label}
    href={s.href}
    target="_blank"
    rel="noreferrer"
    onMouseEnter={() => setHovIdx(i)}
    onMouseLeave={() => setHovIdx(null)}
    title={s.label}
    style={{
      width: 34,
      height: 34,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: hovIdx === i ? s.bg : C.card,
      border: `1px solid ${hovIdx === i ? s.border : C.border}`,
      fontSize: 15,
      textDecoration: "none",
      transition: "background 0.2s, border-color 0.2s",
    }}
  >
    {s.icon}
  </a>
))}
    </div>
  );
}

const MAPS_URL = "https://www.google.co.in/maps/place/RS+Infotech/@12.8415034,79.6925041,17z/data=!3m1!4b1!4m6!3m5!1s0x3a52c36f43983d89:0x8a490f5fae9ee6c9!8m2!3d12.8415034!4d79.695079!16s%2Fg%2F11xtn8nr2n?entry=ttu";
const EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7520840984!2d79.6925041!3d12.8415034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52c36f43983d89%3A0x8a490f5fae9ee6c9!2sRS%20Infotech!5e0!3m2!1sen!2sin!4v1718500000000!5m2!1sen!2sin";
function MapPreview({ isMobile }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={MAPS_URL} target="_blank" rel="noreferrer" style={{ textDecoration: "none", display: "block" }}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position: "relative", borderRadius: 14, overflow: "hidden",
          border: `1px solid ${hov ? C.borderLt : C.border}`,
          boxShadow: hov ? "0 8px 32px #16a34a18" : "0 1px 4px #0001",
          transition: "border-color 0.2s, box-shadow 0.2s",
          cursor: "pointer", height: isMobile ? 220 : 300,
        }}
      >
        <iframe
          src={EMBED_URL}
          width="100%"
          height="100%"
          style={{ border: 0, display: "block", pointerEvents: "none" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="RS Infotech Location"
        />
        <div style={{
          position: "absolute", inset: 0,
          background: hov ? "#16a34a08" : "transparent",
          transition: "background 0.2s",
        }} />
        <div style={{
          position: "absolute", bottom: 14, left: "50%",
          transform: "translateX(-50%)",
          background: hov ? C.green : C.card,
          color: hov ? "#fff" : C.dark,
          border: `1px solid ${hov ? C.green : C.border}`,
          borderRadius: 20, padding: "7px 18px",
          fontSize: 13, fontWeight: 700,
          display: "flex", alignItems: "center", gap: 7,
          boxShadow: "0 2px 12px #0002",
          transition: "background 0.2s, color 0.2s, border-color 0.2s",
          whiteSpace: "nowrap",
        }}>
          <span>📍</span>
          <span>{hov ? "Open in Google Maps" : "RS Infotech, Kanchipuram"}</span>
        </div>
      </div>
    </a>
  );
}

export default function ContactPage() {
  const { isMobile } = useBreakpoint();

  return (
    <div style={{ background: C.bg, color: C.dark, fontFamily: "system-ui, sans-serif", overflowX: "hidden" }}>

      <section style={{
        background: "#f0fdf4",
        borderBottom: `1px solid ${C.border}`,
        padding: isMobile ? "52px 20px 44px" : "64px 80px 52px",
        textAlign: "center",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(${C.border}80 1px, transparent 1px), linear-gradient(90deg, ${C.border}80 1px, transparent 1px)`,
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
            <span style={{ fontSize: 11, color: "#15803d", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>
              Get In Touch
            </span>
          </div>
          <h1 style={{
            fontSize: isMobile ? "2rem" : "2.4rem",
            fontWeight: 800, color: C.dark,
            letterSpacing: "-.02em", lineHeight: 1.15, margin: "0 0 14px",
          }}>
            Contact <span style={{ color: C.green }}>RS Infotech</span>
          </h1>
          <p style={{ color: C.grey, fontSize: isMobile ? 14.5 : 15.5, lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
            Reach out for a free site survey, a quote, or any support query. We respond within 24 hours.
          </p>
        </div>
      </section>

      <section style={{ padding: isMobile ? "32px 20px 0" : "48px 80px 0", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.sky, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 10 }}>
          Find Us
        </div>
        <h2 style={{ fontSize: isMobile ? "1.3rem" : "1.5rem", fontWeight: 800, color: C.dark, letterSpacing: "-.02em", margin: "0 0 16px" }}>
          Our Location
        </h2>
        <MapPreview isMobile={isMobile} />
      </section>

     <section style={{ padding: isMobile ? "32px 20px" : "48px 80px", maxWidth: 1200, margin: "0 auto" }}>
  <div style={{ fontSize: 11, fontWeight: 700, color: C.sky, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 8 }}>
    Contact Details
  </div>
  <h2 style={{ fontSize: isMobile ? "1.4rem" : "1.6rem", fontWeight: 800, color: C.dark, letterSpacing: "-.02em", margin: "0 0 6px" }}>
    RS Infotech Security Systems
  </h2>
  <p style={{ color: C.grey, fontSize: 14, lineHeight: 1.65, marginBottom: 28 }}>
    Managed by R.S Thamizhselvan. Visit us, call us, or drop an email — we're always available.
  </p>

  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24 }}>

    {/* LEFT — info rows */}
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "4px 24px", boxShadow: "0 1px 4px #0001" }}>
      <InfoRow icon="👤" label="Contact Person" value="R.S Thamizhselvan" />
      <InfoRow icon="📞" label="Primary Phone" value="+91 63808 55659" href="tel:+916380855659" />
      <InfoRow icon="📱" label="Alternate Phone" value="+91 81488 00259" href="tel:+918148800259" />
      <InfoRow icon="✉️" label="Email Address" value="rsinfotech00716@gmail.com" href="https://mail.google.com/mail/?view=cm&to=rsinfotech00716@gmail.com" />
      <InfoRow icon="📍" label="Address" value="No 1/1A/6, Sathankutai Street, Kanchipuram, Tamil Nadu - 631502" href={MAPS_URL} />
      <div style={{ padding: "18px 0" }}>
        <div style={{ fontSize: 11.5, color: C.greyDk, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 3 }}>
          GST Number
        </div>
        <div style={{ display: "inline-block", marginTop: 6, background: "#f0fdf4", border: `1px solid ${C.borderLt}`, borderRadius: 8, padding: "6px 14px", fontSize: 14, fontWeight: 700, color: C.green, letterSpacing: ".08em", fontFamily: "monospace" }}>
          33IIUPS6797A1ZF
        </div>
      </div>
    </div>

    {/* RIGHT — reach us + follow us */}
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Quick contact card */}
      <div style={{ background: "#f0fdf4", border: `1px solid ${C.borderLt}`, borderRadius: 14, padding: "28px 24px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.green, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>
          Reach Us Directly
        </div>
        <p style={{ color: C.grey, fontSize: 14, lineHeight: 1.7, margin: "0 0 24px" }}>
          Prefer a quick call or message? Use the buttons below to connect with us instantly — no forms, no waiting.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <a href="tel:+916380855659" style={{ display: "flex", alignItems: "center", gap: 12, background: C.green, color: "#fff", fontSize: 14, fontWeight: 700, padding: "13px 20px", borderRadius: 10, textDecoration: "none", boxShadow: "0 2px 10px #16a34a28" }}>
            <span style={{ fontSize: 20 }}>📞</span>
            <div>
              <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 500, letterSpacing: ".06em" }}>PRIMARY</div>
              <div>+91 63808 55659</div>
            </div>
          </a>
          <a href="tel:+918148800259" style={{ display: "flex", alignItems: "center", gap: 12, background: C.card, color: C.dark, fontSize: 14, fontWeight: 600, padding: "13px 20px", borderRadius: 10, textDecoration: "none", border: `1px solid ${C.border}`, boxShadow: "0 1px 4px #0001" }}>
            <span style={{ fontSize: 20 }}>📱</span>
            <div>
              <div style={{ fontSize: 11, color: C.greyDk, fontWeight: 500, letterSpacing: ".06em" }}>ALTERNATE</div>
              <div>+91 81488 00259</div>
            </div>
          </a>
          <a href="https://wa.me/916380855659" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, background: "#dcfce7", color: "#15803d", fontSize: 14, fontWeight: 600, padding: "13px 20px", borderRadius: 10, textDecoration: "none", border: `1px solid ${C.borderLt}` }}>
            <span style={{ fontSize: 20 }}>💬</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: ".06em", opacity: 0.75 }}>WHATSAPP</div>
              <div>Chat with us now</div>
            </div>
          </a>
          <a href="https://mail.google.com/mail/?view=cm&to=rsinfotech00716@gmail.com" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, background: "#f0f9ff", color: C.sky, fontSize: 14, fontWeight: 600, padding: "13px 20px", borderRadius: 10, textDecoration: "none", border: `1px solid ${C.skyLt}` }}>
            <span style={{ fontSize: 20 }}>✉️</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: ".06em", opacity: 0.75 }}>EMAIL</div>
              <div>rsinfotech00716@gmail.com</div>
            </div>
          </a>
        </div>
      </div>

      {/* Follow us card */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "28px 24px", boxShadow: "0 1px 4px #0001" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.sky, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>
          Follow Us
        </div>
        <p style={{ color: C.grey, fontSize: 14, lineHeight: 1.7, margin: "0 0 20px" }}>
          Stay updated with our latest installations, offers, and behind-the-scenes work.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {SOCIALS.map((s) => (
            <SocialRow key={s.label} {...s} />
          ))}
        </div>
      </div>

    </div>
  </div>
</section>

      <section style={{
        background: "#f0f9ff",
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
        padding: isMobile ? "40px 20px" : "48px 80px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.sky, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 8 }}>
            Availability
          </div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: C.dark, letterSpacing: "-.02em", margin: "0 0 24px" }}>
            Business Hours
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 14 }}>
            {[
              { day: "Monday - Friday", time: "9:00 AM - 7:00 PM", note: "Full service available" },
              { day: "Saturday", time: "9:00 AM - 5:00 PM", note: "Installations & surveys" },
              { day: "Sunday / Emergency", time: "24/7 Support Line", note: "Call +91 63808 55659" },
            ].map((h, i) => (
              <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.greyDk, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 6 }}>
                  {h.day}
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: C.green, marginBottom: 4 }}>
                  {h.time}
                </div>
                <div style={{ fontSize: 12.5, color: C.grey }}>
                  {h.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ borderTop: `1px solid ${C.border}`, padding: "24px 20px", textAlign: "center", color: C.greyDk, fontSize: 12.5, background: C.bg }}>
        <div>{new Date().getFullYear()} RS Infotech Security Systems · GST: 33IIUPS6797A1ZF · Kanchipuram, Tamil Nadu</div>
        <FooterSocialIcons />
      </div>

    </div>
  );
}