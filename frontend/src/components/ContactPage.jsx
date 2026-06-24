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
  { label: "Facebook",  handle: "RS Infotech",              href: "https://www.facebook.com/share/1BDsHqheBG/",                         icon: "f",  bg: "#1877f2", iconStyle: { fontFamily: "Georgia, serif", fontWeight: 900 } },
  { label: "Instagram", handle: "@rsinfotechkanchipuram",   href: "https://www.instagram.com/rsinfotechkanchipuram/",                    icon: "📷", bg: "#e1306c" },
  { label: "LinkedIn",  handle: "rs-infotech",              href: "https://www.linkedin.com/in/rs-infotech-781650419/",                  icon: "💼", bg: "#0a66c2" },
  { label: "X",         handle: "@rsinfotechcv",            href: "https://x.com/rsinfotechcv",                                         icon: "✕",  bg: "#0f172a" },
  { label: "YouTube",   handle: "RS Infotech",              href: "https://www.youtube.com/channel/UCrSTaKdOfZeCG9bfkYUvbJA",           icon: "▶", bg: "#ff0000" },
];

const MAPS_URL  = "https://www.google.co.in/maps/place/RS+Infotech/@12.8415034,79.6925041,17z";
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

/* ─── Info row ─────────────────────────────────────── */
function InfoRow({ icon, label, value, href, isLast }) {
  const [hov, setHov] = useState(false);
  const inner = (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:"flex", alignItems:"flex-start", gap:12,
        padding:"12px 0",
        borderBottom: isLast ? "none" : `1px solid ${C.border}`,
        cursor: href ? "pointer" : "default",
      }}
    >
      <div style={{
        width:34, height:34, borderRadius:8, flexShrink:0,
        background: hov ? "#dcfce7" : "#f0fdf4",
        border:`1px solid ${hov ? C.borderLt : C.border}`,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:15, transition:"all .2s",
      }}>{icon}</div>
      <div style={{ minWidth:0 }}>
        <div style={{ fontSize:10, color:C.greyDk, fontWeight:600, letterSpacing:".06em", textTransform:"uppercase", marginBottom:1 }}>{label}</div>
        <div style={{ fontSize:13, color: href ? (hov ? C.green : C.sky) : C.dark, fontWeight: href?600:500, lineHeight:1.45, transition:"color .2s", wordBreak:"break-word" }}>{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} style={{ textDecoration:"none", display:"block" }}>{inner}</a> : inner;
}

/* ─── Quick-dial button ────────────────────────────── */
function DialBtn({ href, emoji, sub, label, bg, color="#fff", border }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
      style={{
        display:"flex", alignItems:"center", gap:12,
        background: hov ? (border || bg) : bg,
        color, fontSize:13, fontWeight:600,
        padding:"11px 16px", borderRadius:10, textDecoration:"none",
        border:`1px solid ${border || bg}`,
        opacity: hov ? 0.9 : 1,
        transition:"opacity .15s, transform .15s",
        transform: hov ? "translateY(-1px)" : "none",
        boxShadow: hov ? "0 4px 16px #0002" : "none",
      }}
    >
      <span style={{ fontSize:18, width:20, textAlign:"center" }}>{emoji}</span>
      <div>
        <div style={{ fontSize:9.5, fontWeight:500, letterSpacing:".07em", opacity:.75 }}>{sub}</div>
        <div>{label}</div>
      </div>
    </a>
  );
}

/* ─── Social pill ──────────────────────────────────── */
function SocialPill({ label, handle, href, icon, bg, iconStyle }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer"
      style={{
        display:"flex", alignItems:"center", gap:10,
        background: hov ? bg : "#1e293b",
        border:`1px solid ${hov ? bg : "#334155"}`,
        color: hov ? "#fff" : "#94a3b8",
        fontSize:12.5, fontWeight:600,
        padding:"9px 14px", borderRadius:9, textDecoration:"none",
        transition:"all .18s",
      }}
    >
      <span style={{ fontSize:14, width:18, textAlign:"center", color: hov ? "#fff" : "#fff", ...(iconStyle||{}) }}>{icon}</span>
      <div>
        <div style={{ fontSize:9, letterSpacing:".07em", opacity:.7 }}>{label.toUpperCase()}</div>
        <div>{handle}</div>
      </div>
    </a>
  );
}

/* ─── Hours card ───────────────────────────────────── */
function HourCard({ day, time, note }) {
  return (
    <div style={{ borderRight:"1px solid #1e293b", padding:"0 24px", flex:1, minWidth:0 }}>
      <div style={{ fontSize:10, fontWeight:700, color:"#475569", letterSpacing:".07em", textTransform:"uppercase", marginBottom:4 }}>{day}</div>
      <div style={{ fontSize:15, fontWeight:800, color:C.green, marginBottom:2 }}>{time}</div>
      <div style={{ fontSize:11.5, color:"#64748b" }}>{note}</div>
    </div>
  );
}

/* ─── Map preview ──────────────────────────────────── */
function MapPreview({ isMobile }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={MAPS_URL} target="_blank" rel="noreferrer" style={{ textDecoration:"none", display:"block" }}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position:"relative", borderRadius:14, overflow:"hidden",
          border:`1px solid ${hov ? C.borderLt : C.border}`,
          boxShadow: hov ? "0 8px 32px #16a34a18" : "0 1px 4px #0001",
          transition:"border-color .2s, box-shadow .2s",
          cursor:"pointer", height: isMobile ? 200 : 280,
        }}
      >
        <iframe src={EMBED_URL} width="100%" height="100%"
          style={{ border:0, display:"block", pointerEvents:"none" }}
          allowFullScreen="" loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="RS Infotech Location"
        />
        <div style={{ position:"absolute", inset:0, background: hov ? "#16a34a08" : "transparent", transition:"background .2s" }} />
        <div style={{
          position:"absolute", bottom:12, left:"50%", transform:"translateX(-50%)",
          background: hov ? C.green : "#fff",
          color: hov ? "#fff" : C.dark,
          border:`1px solid ${hov ? C.green : C.border}`,
          borderRadius:20, padding:"6px 16px", fontSize:12.5, fontWeight:700,
          display:"flex", alignItems:"center", gap:6,
          boxShadow:"0 2px 12px #0002",
          transition:"all .2s", whiteSpace:"nowrap",
        }}>
          <span>📍</span>
          <span>{hov ? "Open in Google Maps" : "RS Infotech, Kanchipuram"}</span>
        </div>
      </div>
    </a>
  );
}

/* ═══════════════════════════════════════════════════ */
export default function ContactPage() {
  const { isMobile } = useBreakpoint();
  const INFO_ROWS = [
    { icon:"👤", label:"Contact Person", value:"R.S Thamizhselvan" },
    { icon:"📞", label:"Primary Phone",  value:"+91 63808 55659",           href:"tel:+916380855659" },
    { icon:"📱", label:"Alternate Phone",value:"+91 81488 00259",           href:"tel:+918148800259" },
    { icon:"✉️", label:"Email",          value:"rsinfotech00716@gmail.com", href:"https://mail.google.com/mail/?view=cm&to=rsinfotech00716@gmail.com" },
    { icon:"📍", label:"Address",        value:"No 1/1A/6, Sathankutai Street, Kanchipuram, Tamil Nadu 631502", href:MAPS_URL },
  ];

  return (
    <div style={{ background:C.bg, color:C.dark, fontFamily:"system-ui,sans-serif", overflowX:"hidden", display:"flex", flexDirection:"column", minHeight:"100vh" }}>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section style={{
        background:"#f0fdf4", borderBottom:`1px solid ${C.border}`,
        padding: isMobile ? "48px 20px 40px" : "60px 80px 48px",
        textAlign:"center", position:"relative",
      }}>
        <div style={{
          position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:`linear-gradient(${C.border}70 1px,transparent 1px),linear-gradient(90deg,${C.border}70 1px,transparent 1px)`,
          backgroundSize:"48px 48px",
          maskImage:"radial-gradient(ellipse 70% 80% at 50% 50%,black 20%,transparent 100%)",
          WebkitMaskImage:"radial-gradient(ellipse 70% 80% at 50% 50%,black 20%,transparent 100%)",
        }} />
        <div style={{ position:"relative" }}>
          <Chip>Get In Touch</Chip>
          <h1 style={{ fontSize: isMobile ? "1.9rem" : "2.4rem", fontWeight:800, color:C.dark, letterSpacing:"-.02em", lineHeight:1.15, margin:"0 0 12px" }}>
            Contact <span style={{ color:C.green }}>RS Infotech</span>
          </h1>
          <p style={{ color:C.grey, fontSize: isMobile ? 14 : 15, lineHeight:1.7, maxWidth:460, margin:"0 auto" }}>
            Reach out for a free site survey, a quote, or any support query. We respond within 24 hours.
          </p>
        </div>
      </section>

      {/* ══ MAIN GRID ═════════════════════════════════════ */}
      <div style={{ flex:1, padding: isMobile ? "28px 16px" : "40px 80px", maxWidth:1200, margin:"0 auto", width:"100%", boxSizing:"border-box" }}>

        {/* Row 1: Map + Contact info side-by-side */}
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1.1fr 1fr", gap:20, marginBottom:20 }}>

          {/* Map */}
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, overflow:"hidden", boxShadow:"0 1px 4px #0001" }}>
            <div style={{ padding:"18px 20px 14px" }}>
              <Chip color={C.sky} bg="#f0f9ff" border={C.skyLt}>Our Location</Chip>
              <div style={{ fontSize: isMobile?"1.1rem":"1.2rem", fontWeight:800, color:C.dark, letterSpacing:"-.02em", marginBottom:14 }}>Find Us on the Map</div>
            </div>
            <div style={{ padding:"0 16px 16px" }}>
              <MapPreview isMobile={isMobile} />
            </div>
          </div>

          {/* Info rows */}
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, boxShadow:"0 1px 4px #0001" }}>
            <div style={{ padding:"18px 20px 8px" }}>
              <Chip>Contact Details</Chip>
              <div style={{ fontSize: isMobile?"1.1rem":"1.2rem", fontWeight:800, color:C.dark, letterSpacing:"-.02em", marginBottom:4 }}>RS Infotech Security Systems</div>
              <div style={{ fontSize:12.5, color:C.grey, marginBottom:4 }}>Managed by R.S Thamizhselvan</div>
            </div>
            <div style={{ padding:"0 20px" }}>
              {INFO_ROWS.map((r, i) => <InfoRow key={r.label} {...r} isLast={i===INFO_ROWS.length-1} />)}
            </div>
            <div style={{ margin:"0 20px", borderTop:`1px solid ${C.border}`, padding:"12px 0 16px" }}>
              <div style={{ fontSize:10, color:C.greyDk, fontWeight:600, letterSpacing:".06em", textTransform:"uppercase", marginBottom:6 }}>GST Number</div>
              <div style={{ display:"inline-block", background:"#f0fdf4", border:`1px solid ${C.borderLt}`, borderRadius:8, padding:"5px 13px", fontSize:13, fontWeight:700, color:C.green, letterSpacing:".08em", fontFamily:"monospace" }}>
                33IIUPS6797A1ZF
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Quick dial + Social */}
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:20 }}>

          {/* Quick dial */}
          <div style={{ background:"#f0fdf4", border:`1px solid ${C.borderLt}`, borderRadius:14, padding:"20px" }}>
            <Chip>Reach Us Directly</Chip>
            <div style={{ fontSize: isMobile?"1.05rem":"1.1rem", fontWeight:800, color:C.dark, letterSpacing:"-.02em", marginBottom:14 }}>No forms. No waiting.</div>
            <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
              <DialBtn href="tel:+916380855659"   emoji="📞" sub="PRIMARY"   label="+91 63808 55659"         bg={C.green} />
              <DialBtn href="tel:+918148800259"   emoji="📱" sub="ALTERNATE" label="+91 81488 00259"         bg={C.card}  color={C.dark} border={C.border} />
              <DialBtn href="https://wa.me/916380855659" emoji="💬" sub="WHATSAPP" label="Chat with us now" bg="#22c55e" />
              <DialBtn href="https://mail.google.com/mail/?view=cm&to=rsinfotech00716@gmail.com" emoji="✉️" sub="EMAIL" label="rsinfotech00716@gmail.com" bg={C.sky} />
            </div>
          </div>

          {/* Social */}
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:"20px", boxShadow:"0 1px 4px #0001" }}>
            <Chip color={C.sky} bg="#f0f9ff" border={C.skyLt}>Follow Us</Chip>
            <div style={{ fontSize: isMobile?"1.05rem":"1.1rem", fontWeight:800, color:C.dark, letterSpacing:"-.02em", marginBottom:14 }}>Stay Connected</div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {SOCIALS.map(s => <SocialPill key={s.label} {...s} />)}
            </div>
          </div>
        </div>
      </div>

      {/* ══ FOOTER (dark, flush — no gap) ═════════════════ */}
      <footer style={{ background:C.footerBg, marginTop:"auto" }}>

        {/* Hours strip */}
        <div style={{ borderBottom:"1px solid #1e293b", padding: isMobile?"20px 16px":"20px 80px" }}>
          <div style={{ maxWidth:1040, margin:"0 auto" }}>
            <div style={{ fontSize:10, fontWeight:700, color:"#475569", letterSpacing:".1em", textTransform:"uppercase", marginBottom:14 }}>Business Hours</div>
            {isMobile ? (
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {[
                  { day:"Mon – Fri",  time:"9:00 AM – 7:00 PM", note:"Full service" },
                  { day:"Saturday",   time:"9:00 AM – 5:00 PM", note:"Installations & surveys" },
                  { day:"Emergency",  time:"24/7 Support",       note:"+91 63808 55659" },
                ].map(h => (
                  <div key={h.day}>
                    <div style={{ fontSize:10, color:"#475569", fontWeight:600, letterSpacing:".06em", textTransform:"uppercase" }}>{h.day}</div>
                    <div style={{ fontSize:14, fontWeight:800, color:C.green }}>{h.time}</div>
                    <div style={{ fontSize:11, color:"#64748b" }}>{h.note}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display:"flex", gap:0 }}>
                {[
                  { day:"Monday – Friday",   time:"9:00 AM – 7:00 PM", note:"Full service available" },
                  { day:"Saturday",          time:"9:00 AM – 5:00 PM", note:"Installations & surveys" },
                  { day:"Sunday / Emergency",time:"24/7 Support Line",  note:"Call +91 63808 55659" },
                ].map((h, i, arr) => (
                  <div key={h.day} style={{ flex:1, padding:"0 28px 0 0", borderRight: i < arr.length-1 ? "1px solid #1e293b" : "none", marginRight: i < arr.length-1 ? 28 : 0 }}>
                    <div style={{ fontSize:10, fontWeight:700, color:"#475569", letterSpacing:".07em", textTransform:"uppercase", marginBottom:4 }}>{h.day}</div>
                    <div style={{ fontSize:16, fontWeight:800, color:C.green, marginBottom:2 }}>{h.time}</div>
                    <div style={{ fontSize:11.5, color:"#64748b" }}>{h.note}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ padding: isMobile ? "16px 16px 20px" : "16px 80px 20px", maxWidth:1200, margin:"0 auto", display:"flex", flexDirection: isMobile?"column":"row", alignItems:"center", justifyContent:"space-between", gap:12 }}>
          <div style={{ fontSize:12, color:"#475569", lineHeight:1.6, textAlign: isMobile?"center":"left" }}>
            <div style={{ color:"#94a3b8", fontWeight:600 }}>RS Infotech Security Systems</div>
            <div>GST: 33IIUPS6797A1ZF · Kanchipuram, Tamil Nadu</div>
            <div>© {new Date().getFullYear()} All rights reserved</div>
          </div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center" }}>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.label}
                style={{
                  width:32, height:32, borderRadius:"50%",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  background: s.bg, color:"#fff",
                  fontSize:13, textDecoration:"none",
                  ...(s.iconStyle || {}),
                }}
              >{s.icon}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}