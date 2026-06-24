import { useState, useEffect } from "react";

const C = {
  bg:       "#f8fafc",
  card:     "#ffffff",
  border:   "#d1e9d5",
  borderLt: "#86c995",
  green:    "#16a34a",
  greenDk:  "#15803d",
  sky:      "#0ea5e9",
  skyLt:    "#bae6fd",
  dark:     "#0f172a",
  grey:     "#475569",
  greyDk:   "#94a3b8",
  footerBg: "#0f172a",
};

function useBreakpoint() {
  const [w, setW] = useState(() => window.innerWidth);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { isMobile: w < 768 };
}

/* ─── Social data (Facebook first) ─────────────────── */
const SOCIALS = [
  { label: "Facebook",  handle: "RS Infotech",              href: "https://www.facebook.com/profile.php?id=61591080612938",                         icon: "f",  bg: "#1877f2", iconStyle: { fontFamily: "Georgia, serif", fontWeight: 900 } },
  { label: "Instagram", handle: "@rsinfotechkanchipuram",   href: "https://www.instagram.com/rsinfotechkanchipuram/",                    icon: "📷", bg: "#e1306c" },
  { label: "LinkedIn",  handle: "rs-infotech",              href: "https://www.linkedin.com/in/rs-infotech-781650419/",                  icon: "💼", bg: "#0a66c2" },
  { label: "X",         handle: "@rsinfotechcv",            href: "https://x.com/rsinfotechcv",                                         icon: "✕",  bg: "#0f172a" },
  { label: "YouTube",   handle: "RS Infotech",              href: "https://www.youtube.com/channel/UCrSTaKdOfZeCG9bfkYUvbJA",           icon: "▶", bg: "#ff0000" },
];

const MAPS_URL = "https://www.google.com/maps?cid=9964512554159892169";
const EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7520840984!2d79.6925041!3d12.8415034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52c36f43983d89%3A0x8a490f5fae9ee6c9!2sRS%20Infotech!5e0!3m2!1sen!2sin!4v1718500000000!5m2!1sen!2sin";

/* ─── Chip label ───────────────────────────────────── */
function Chip({ children, color = C.greenDk, bg = "#dcfce7", border = C.borderLt }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:bg, border:`1px solid ${border}`, borderRadius:20, padding:"3px 12px", marginBottom:14 }}>
      <div style={{ width:5, height:5, borderRadius:"50%", background:color }} />
      <span style={{ fontSize:10, color, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase" }}>{children}</span>
    </div>
  );
}

/* ─── Info row (with optional action button instead of full-row link) ─── */
function InfoRow({ icon, label, value, action, isLast }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{
      display:"flex", alignItems:"center", gap:12,
      padding:"13px 0",
      borderBottom: isLast ? "none" : `1px solid ${C.border}`,
    }}>
      <div style={{
        width:34, height:34, borderRadius:8, flexShrink:0,
        background:"#f0fdf4", border:`1px solid ${C.border}`,
        display:"flex", alignItems:"center", justifyContent:"center", fontSize:15,
      }}>{icon}</div>
      <div style={{ minWidth:0, flex:1 }}>
        <div style={{ fontSize:10, color:C.greyDk, fontWeight:600, letterSpacing:".06em", textTransform:"uppercase", marginBottom:1 }}>{label}</div>
        <div style={{ fontSize:13.5, color:C.dark, fontWeight:500, lineHeight:1.45, wordBreak:"break-word" }}>{value}</div>
      </div>
      {action && (
        <a
          href={action.href}
          target={action.href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          style={{
            flexShrink:0, fontSize:12, fontWeight:700, textDecoration:"none",
            color: hov ? "#fff" : C.greenDk,
            background: hov ? C.green : "#f0fdf4",
            border:`1px solid ${hov ? C.green : C.borderLt}`,
            borderRadius:8, padding:"6px 12px", transition:"all .15s",
            whiteSpace:"nowrap",
          }}
        >{action.label}</a>
      )}
    </div>
  );
}

/* ─── Social pill ──────────────────────────────────── */
function SocialPill({ label, handle, href, icon, bg, iconStyle }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:"flex", alignItems:"center", gap:10,
        background: hov ? bg : C.card,
        border:`1px solid ${hov ? bg : C.border}`,
        color: hov ? "#fff" : C.dark,
        fontSize:12.5, fontWeight:600,
        padding:"9px 14px", borderRadius:9, textDecoration:"none",
        transition:"all .18s",
      }}
    >
      <span style={{
        width:22, height:22, borderRadius:6, flexShrink:0,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:12, background: hov ? "rgba(255,255,255,.2)" : bg, color:"#fff",
        ...(iconStyle||{}),
      }}>{icon}</span>
      <div style={{ minWidth:0 }}>
        <div style={{ fontSize:9, letterSpacing:".07em", opacity:.65, color: hov ? "#fff" : C.greyDk }}>{label.toUpperCase()}</div>
        <div style={{ overflow:"hidden", textOverflow:"ellipsis" }}>{handle}</div>
      </div>
    </a>
  );
}

/* ─── Hours row ─────────────────────────────────────── */
function HourRow({ day, time, note, isLast }) {
  return (
    <div style={{
      display:"flex", justifyContent:"space-between", alignItems:"baseline",
      padding:"10px 0", borderBottom: isLast ? "none" : `1px solid ${C.border}`,
      gap:12,
    }}>
      <div style={{ fontSize:12.5, color:C.grey, fontWeight:600 }}>{day}</div>
      <div style={{ textAlign:"right" }}>
        <div style={{ fontSize:13.5, fontWeight:800, color:C.greenDk }}>{time}</div>
        <div style={{ fontSize:11, color:C.greyDk }}>{note}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════ */
export default function ContactPage() {
  const { isMobile } = useBreakpoint();

  const INFO_ROWS = [
    { icon:"👤", label:"Contact Person", value:"R.S Thamizhselvan" },
    { icon:"📞", label:"Phone",          value:"+91 63808 55659 · +91 81488 00259", action:{ label:"Call", href:"tel:+916380855659" } },
    { icon:"💬", label:"WhatsApp",       value:"Chat with us directly",            action:{ label:"Open", href:"https://wa.me/916380855659" } },
    { icon:"✉️", label:"Email",          value:"rsinfotech00716@gmail.com",        action:{ label:"Email", href:"https://mail.google.com/mail/?view=cm&to=rsinfotech00716@gmail.com" } },
    { icon:"🧾", label:"GST Number",     value:"33IIUPS6797A1ZF" },
  ];

  const HOURS = [
    { day:"Monday – Friday",    time:"9:00 AM – 7:00 PM", note:"Full service" },
    { day:"Saturday",           time:"9:00 AM – 5:00 PM", note:"Installations & surveys" },
    { day:"Sunday / Emergency", time:"24/7 Support",      note:"Call the primary line" },
  ];

  return (
    <div style={{ background:C.bg, color:C.dark, fontFamily:"system-ui,sans-serif", overflowX:"hidden", display:"flex", flexDirection:"column", minHeight:"100vh" }}>

      {/* ══ HERO: full-width map ══════════════════════════ */}
      <section style={{ position:"relative" }}>
        <div style={{ position:"relative", height: isMobile ? 260 : 380, overflow:"hidden" }}>
          <iframe src={EMBED_URL} width="100%" height="100%"
            style={{ border:0, display:"block" }}
            allowFullScreen="" loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="RS Infotech Location"
          />
          {/* gradient + heading overlay, no address text repeated here */}
          <div style={{
            position:"absolute", inset:0, pointerEvents:"none",
            background:"linear-gradient(180deg, rgba(15,23,42,.55) 0%, rgba(15,23,42,.05) 38%, rgba(15,23,42,0) 60%)",
          }} />
          <div style={{ position:"absolute", top: isMobile ? 18 : 28, left: isMobile ? 16 : 80, right: isMobile ? 16 : 80 }}>
            <Chip color="#bbf7d0" bg="rgba(255,255,255,.12)" border="rgba(255,255,255,.25)">
              <span style={{ color:"#fff" }}>Get In Touch</span>
            </Chip>
            <h1 style={{ fontSize: isMobile ? "1.6rem" : "2.1rem", fontWeight:800, color:"#fff", letterSpacing:"-.02em", lineHeight:1.15, margin:0, textShadow:"0 2px 12px rgba(0,0,0,.25)" }}>
              Contact <span style={{ color:"#86efac" }}>RS Infotech</span>
            </h1>
          </div>
          <a href={MAPS_URL} target="_blank" rel="noreferrer" style={{ textDecoration:"none" }}>
            <div style={{
              position:"absolute", bottom: isMobile ? 14 : 22, right: isMobile ? 16 : 80,
              background:"#fff", color:C.dark, border:`1px solid ${C.border}`,
              borderRadius:20, padding:"7px 16px", fontSize:12.5, fontWeight:700,
              display:"flex", alignItems:"center", gap:6, boxShadow:"0 4px 18px rgba(0,0,0,.18)",
            }}>
              <span>📍</span><span>Open in Google Maps</span>
            </div>
          </a>
        </div>
      </section>

      {/* ══ MAIN GRID ═════════════════════════════════════ */}
      <div style={{ flex:1, padding: isMobile ? "24px 16px 28px" : "36px 80px", maxWidth:1200, margin:"0 auto", width:"100%", boxSizing:"border-box" }}>
        <p style={{ color:C.grey, fontSize: isMobile ? 13.5 : 14.5, lineHeight:1.7, maxWidth:560, margin:"0 0 24px" }}>
          We're at No 1/1A/6, Sathankutai Street, Kanchipuram, Tamil Nadu 631502. Reach out for a free site survey, a quote, or any support query — we respond within 24 hours.
        </p>

        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1.3fr 1fr", gap:20 }}>

          {/* Left: contact details (single source of truth) */}
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, boxShadow:"0 1px 4px #0001" }}>
            <div style={{ padding:"18px 20px 6px" }}>
              <Chip>Contact Details</Chip>
              <div style={{ fontSize: isMobile?"1.1rem":"1.2rem", fontWeight:800, color:C.dark, letterSpacing:"-.02em" }}>RS Infotech Security Systems</div>
            </div>
            <div style={{ padding:"4px 20px 8px" }}>
              {INFO_ROWS.map((r, i) => <InfoRow key={r.label} {...r} isLast={i===INFO_ROWS.length-1} />)}
            </div>
          </div>

          {/* Right: stacked Hours + Social (each appears once) */}
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

            <div style={{ background:C.footerBg, borderRadius:14, padding:"18px 20px" }}>
              <Chip color="#86efac" bg="rgba(34,197,94,.12)" border="rgba(134,239,172,.3)">Business Hours</Chip>
              <div>
                {HOURS.map((h, i) => <HourRow key={h.day} {...h} isLast={i===HOURS.length-1} />)}
              </div>
            </div>

            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:"18px 20px", boxShadow:"0 1px 4px #0001" }}>
              <Chip color={C.sky} bg="#f0f9ff" border={C.skyLt}>Follow Us</Chip>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {SOCIALS.map(s => <SocialPill key={s.label} {...s} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ FOOTER (slim, no repeated details) ════════════ */}
      <footer style={{ background:C.footerBg, padding: isMobile ? "16px 16px" : "16px 80px", textAlign:"center" }}>
        <div style={{ fontSize:11.5, color:"#64748b" }}>
          © {new Date().getFullYear()} RS Infotech Security Systems. All rights reserved.
        </div>
      </footer>

    </div>
  );
}