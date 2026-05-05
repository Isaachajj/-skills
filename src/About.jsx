import { useState, useRef } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:     #06070d;
  --bg2:    #0b0d16;
  --s1:     rgba(255,255,255,0.04);
  --s2:     rgba(255,255,255,0.07);
  --s3:     rgba(255,255,255,0.11);
  --bd:     rgba(255,255,255,0.08);
  --bd2:    rgba(255,255,255,0.14);
  --cyan:   #22d3ee;
  --blue:   #0ea5e9;
  --purple: #7c3aed;
  --gold:   #f59e0b;
  --green:  #10b981;
  --tx:     rgba(235,241,255,0.96);
  --tx2:    rgba(170,188,220,0.72);
  --mu:     rgba(140,160,200,0.45);
  --fd:     'Syne', sans-serif;
  --fb:     'DM Sans', sans-serif;
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--tx);
  font-family: var(--fb);
  min-height: 100vh;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* ─── atmosphere ─── */
.atmo {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background:
    radial-gradient(ellipse 60% 50% at 8% 5%,  rgba(34,211,238,.09)  0%, transparent 60%),
    radial-gradient(ellipse 45% 40% at 92% 80%, rgba(124,58,237,.11) 0%, transparent 55%),
    radial-gradient(ellipse 35% 30% at 55% 45%, rgba(14,165,233,.05) 0%, transparent 60%);
}

/* ─── grid texture ─── */
.atmo::after {
  content: '';
  position: fixed; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
}

.page { position: relative; z-index: 1; }

/* ══════════════════════════════════
   TOPNAV
══════════════════════════════════ */
.nav {
  position: sticky; top: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 40px; height: 66px;
  background: rgba(6,7,13,.85);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--bd);
}
.nav-logo {
  font-family: var(--fd); font-size: 20px; font-weight: 800;
  letter-spacing: -.025em;
}
.nav-logo span { color: var(--cyan); }
.nav-logo sub { font-size: 9px; color: var(--mu); vertical-align: top; margin-left: 2px; font-weight: 400; letter-spacing: .06em; }

.nav-links { display: flex; align-items: center; gap: 2px; }
.nav-link {
  padding: 7px 16px; border-radius: 10px;
  font-size: 13.5px; font-weight: 500; color: var(--tx2);
  background: none; border: none; cursor: pointer; transition: all .2s;
}
.nav-link:hover  { color: var(--tx); background: var(--s2); }
.nav-link.active { color: var(--cyan); background: rgba(34,211,238,.08); }

.nav-cta {
  display: flex; align-items: center; gap: 7px;
  background: linear-gradient(135deg, var(--cyan), var(--blue));
  border: none; border-radius: 12px; padding: 9px 20px;
  font-family: var(--fd); font-size: 13px; font-weight: 700;
  color: #06070d; cursor: pointer; letter-spacing: .03em;
  box-shadow: 0 4px 16px rgba(34,211,238,.22);
  transition: all .25s;
}
.nav-cta:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(34,211,238,.38); }

/* ══════════════════════════════════
   HERO
══════════════════════════════════ */
.hero {
  text-align: center;
  padding: 100px 40px 80px;
  position: relative;
}
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(34,211,238,.08); border: 1px solid rgba(34,211,238,.2);
  border-radius: 30px; padding: 6px 18px;
  font-size: 11.5px; font-weight: 700; letter-spacing: .12em;
  text-transform: uppercase; color: var(--cyan); margin-bottom: 24px;
}
.hero-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--cyan); animation: pulse-dot 2s ease-in-out infinite; }
@keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }

.hero-title {
  font-family: var(--fd); font-size: clamp(40px, 6vw, 72px);
  font-weight: 800; line-height: 1.05; letter-spacing: -.03em;
  color: var(--tx); margin-bottom: 24px;
}
.hero-title em {
  font-style: normal;
  background: linear-gradient(135deg, var(--cyan) 0%, var(--blue) 50%, var(--purple) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

.hero-sub {
  font-size: 17px; color: var(--tx2); line-height: 1.75;
  max-width: 600px; margin: 0 auto 40px;
  font-weight: 300;
}

.hero-pills { display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap; }
.pill {
  display: flex; align-items: center; gap: 7px;
  background: var(--s1); border: 1px solid var(--bd2);
  border-radius: 30px; padding: 8px 18px;
  font-size: 13px; color: var(--tx2); font-weight: 500;
}
.pill-ico { font-size: 15px; }

/* divider glow line */
.glow-line {
  height: 1px;
  background: linear-gradient(to right, transparent, var(--cyan), var(--blue), var(--purple), transparent);
  margin: 0 40px;
  opacity: .5;
}

/* ══════════════════════════════════
   MISSION
══════════════════════════════════ */
.section { padding: 80px 40px; }
.section-label {
  font-size: 11px; font-weight: 700; letter-spacing: .14em;
  text-transform: uppercase; color: var(--cyan); margin-bottom: 14px;
}
.section-title {
  font-family: var(--fd); font-size: clamp(26px, 3.5vw, 40px);
  font-weight: 800; line-height: 1.15; letter-spacing: -.02em;
  color: var(--tx); margin-bottom: 0;
}

.mission-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 48px;
  align-items: center; margin-top: 48px;
}
.mission-text {
  font-size: 15.5px; color: var(--tx2); line-height: 1.85; font-weight: 300;
}
.mission-text strong { color: var(--tx); font-weight: 600; }

.mission-cards { display: flex; flex-direction: column; gap: 14px; }
.mission-card {
  display: flex; align-items: flex-start; gap: 16px;
  background: var(--s1); border: 1px solid var(--bd);
  border-radius: 16px; padding: 20px;
  transition: all .28s cubic-bezier(.23,1,.32,1);
  position: relative; overflow: hidden;
}
.mission-card::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0;
  width: 3px; background: var(--acc, var(--cyan)); border-radius: 3px 0 0 3px;
  transform: scaleY(0); transition: transform .3s ease; transform-origin: center;
}
.mission-card:hover { transform: translateX(4px); border-color: var(--bd2); }
.mission-card:hover::before { transform: scaleY(1); }
.mission-card-ico {
  width: 44px; height: 44px; border-radius: 13px;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; flex-shrink: 0;
}
.mission-card-title { font-family: var(--fd); font-size: 14px; font-weight: 700; margin-bottom: 5px; }
.mission-card-body { font-size: 13px; color: var(--tx2); line-height: 1.6; }

/* ══════════════════════════════════
   STATS BANNER
══════════════════════════════════ */
.stats-banner {
  margin: 0 40px;
  background: linear-gradient(135deg, rgba(14,165,233,.08), rgba(124,58,237,.08));
  border: 1px solid rgba(34,211,238,.15);
  border-radius: 24px; padding: 48px 40px;
  display: grid; grid-template-columns: repeat(4,1fr);
  position: relative; overflow: hidden;
}
.stats-banner::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(to right, var(--cyan), var(--blue), var(--purple));
}
.stat-item { text-align: center; border-right: 1px solid var(--bd); }
.stat-item:last-child { border-right: none; }
.stat-num {
  font-family: var(--fd); font-size: 42px; font-weight: 800;
  background: linear-gradient(135deg, var(--cyan), var(--blue));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  line-height: 1; margin-bottom: 8px;
}
.stat-desc { font-size: 13px; color: var(--tx2); font-weight: 400; }

/* ══════════════════════════════════
   TEAM
══════════════════════════════════ */
.team-section { padding: 80px 40px; }
.team-header { text-align: center; margin-bottom: 64px; }

.team-grid {
  display: flex; justify-content: center;
  gap: 48px; flex-wrap: wrap;
}

/* ── Developer Card ── */
.dev-card {
  display: flex; flex-direction: column; align-items: center;
  width: 300px;
  background: var(--s1); border: 1px solid var(--bd2);
  border-radius: 28px; padding: 40px 28px 32px;
  position: relative; overflow: hidden;
  transition: all .35s cubic-bezier(.23,1,.32,1);
}
.dev-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 100px;
  background: var(--card-grad, linear-gradient(135deg, rgba(34,211,238,.1), rgba(14,165,233,.06)));
  border-radius: 28px 28px 60% 60% / 28px 28px 40px 40px;
}
.dev-card:hover { transform: translateY(-10px); border-color: rgba(34,211,238,.25); box-shadow: 0 28px 64px rgba(0,0,0,.55), 0 0 0 1px rgba(34,211,238,.1); }

/* Avatar circle */
.dev-av-wrap {
  position: relative; z-index: 1;
  width: 140px; height: 140px; margin-bottom: 22px;
}
.dev-av-outer {
  position: absolute; inset: -4px; border-radius: 50%;
  background: conic-gradient(var(--ring1, #22d3ee), var(--ring2, #7c3aed), var(--ring1, #22d3ee));
  animation: spin-ring 6s linear infinite;
}
@keyframes spin-ring { to { transform: rotate(360deg); } }

.dev-av-inner {
  position: absolute; inset: 4px; border-radius: 50%;
  background: var(--bg);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.dev-av {
  width: 100%; height: 100%;
  object-fit: cover; display: block; border-radius: 50%;
}
.dev-av-placeholder {
  width: 100%; height: 100%; border-radius: 50%;
  background: var(--s3);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 6px; cursor: pointer; transition: background .2s;
}
.dev-av-placeholder:hover { background: var(--s2); }
.dev-av-placeholder svg { opacity: .5; }
.dev-av-placeholder span { font-size: 10px; color: var(--mu); font-weight: 500; letter-spacing: .05em; }

.dev-upload-inp { display: none; }

.dev-online {
  position: absolute; bottom: 10px; right: 10px; z-index: 2;
  width: 18px; height: 18px; border-radius: 50%;
  background: var(--green); border: 3px solid var(--bg);
  box-shadow: 0 0 10px rgba(16,185,129,.6);
}

/* Card content */
.dev-role-tag {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--tag-bg, rgba(34,211,238,.1));
  border: 1px solid var(--tag-bd, rgba(34,211,238,.22));
  border-radius: 20px; padding: 4px 14px;
  font-size: 10.5px; font-weight: 700; letter-spacing: .08em;
  text-transform: uppercase; color: var(--tag-color, var(--cyan));
  margin-bottom: 12px;
}

.dev-name {
  font-family: var(--fd); font-size: 22px; font-weight: 800;
  letter-spacing: -.015em; text-align: center; margin-bottom: 6px;
}
.dev-title { font-size: 13.5px; color: var(--tx2); text-align: center; margin-bottom: 18px; line-height: 1.5; }

.dev-divider {
  width: 40px; height: 2px; border-radius: 2px;
  background: var(--card-accent, var(--cyan));
  margin: 0 auto 18px; opacity: .6;
}

.dev-bio {
  font-size: 13px; color: var(--tx2); text-align: center;
  line-height: 1.7; margin-bottom: 24px; font-style: italic; font-weight: 300;
}

.dev-skills { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin-bottom: 24px; }
.dev-skill {
  font-size: 10.5px; font-weight: 600; padding: 4px 10px; border-radius: 8px;
  background: var(--s2); border: 1px solid var(--bd); color: var(--tx2);
  letter-spacing: .03em;
}

.dev-socials { display: flex; gap: 10px; }
.dev-social {
  width: 38px; height: 38px; border-radius: 11px;
  background: var(--s2); border: 1px solid var(--bd);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all .22s; text-decoration: none;
  font-size: 16px;
}
.dev-social:hover {
  background: var(--social-hover, rgba(34,211,238,.12));
  border-color: var(--social-bd, rgba(34,211,238,.3));
  transform: translateY(-2px);
}

/* ══════════════════════════════════
   VALUES
══════════════════════════════════ */
.values-grid {
  display: grid; grid-template-columns: repeat(3,1fr); gap: 18px;
  margin-top: 48px;
}
.value-card {
  background: var(--s1); border: 1px solid var(--bd);
  border-radius: 20px; padding: 32px 24px;
  transition: all .28s; position: relative; overflow: hidden;
}
.value-card:hover { transform: translateY(-4px); border-color: var(--bd2); }
.value-card::after {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: var(--vc-accent, var(--cyan)); opacity: 0; transition: opacity .3s;
}
.value-card:hover::after { opacity: 1; }
.value-ico { font-size: 32px; margin-bottom: 14px; }
.value-title { font-family: var(--fd); font-size: 16px; font-weight: 700; margin-bottom: 10px; }
.value-body { font-size: 13.5px; color: var(--tx2); line-height: 1.7; }

/* ══════════════════════════════════
   CONTACT
══════════════════════════════════ */
.contact-section {
  padding: 80px 40px;
  display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
}
.contact-info { display: flex; flex-direction: column; gap: 16px; }
.contact-item {
  display: flex; align-items: center; gap: 14px;
  background: var(--s1); border: 1px solid var(--bd);
  border-radius: 14px; padding: 16px 18px;
}
.contact-ico {
  width: 40px; height: 40px; border-radius: 11px;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; flex-shrink: 0;
}
.contact-label { font-size: 11px; color: var(--mu); margin-bottom: 2px; text-transform: uppercase; letter-spacing: .06em; }
.contact-val { font-size: 14px; font-weight: 600; }

.cta-box {
  background: linear-gradient(135deg, rgba(34,211,238,.07), rgba(124,58,237,.09));
  border: 1px solid rgba(34,211,238,.18);
  border-radius: 24px; padding: 40px;
  text-align: center; position: relative; overflow: hidden;
}
.cta-box::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(to right, var(--cyan), var(--purple));
}
.cta-title { font-family: var(--fd); font-size: 24px; font-weight: 800; margin-bottom: 12px; }
.cta-sub { font-size: 14px; color: var(--tx2); margin-bottom: 28px; line-height: 1.65; }
.cta-btn {
  display: inline-flex; align-items: center; gap: 8px;
  background: linear-gradient(135deg, var(--cyan), var(--blue));
  border: none; border-radius: 14px; padding: 14px 30px;
  font-family: var(--fd); font-size: 14px; font-weight: 700;
  color: #06070d; cursor: pointer; letter-spacing: .03em;
  box-shadow: 0 6px 20px rgba(34,211,238,.28);
  transition: all .28s;
}
.cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(34,211,238,.42); }

/* ══════════════════════════════════
   FOOTER
══════════════════════════════════ */
.footer {
  border-top: 1px solid var(--bd);
  padding: 28px 40px;
  display: flex; align-items: center; justify-content: space-between;
}
.footer-logo { font-family: var(--fd); font-size: 16px; font-weight: 800; }
.footer-logo span { color: var(--cyan); }
.footer-copy { font-size: 12.5px; color: var(--mu); }
.footer-links { display: flex; gap: 20px; }
.footer-link { font-size: 12.5px; color: var(--mu); text-decoration: none; transition: color .2s; cursor: pointer; }
.footer-link:hover { color: var(--cyan); }

/* ══════════════════════════════════
   RESPONSIVE
══════════════════════════════════ */
@media (max-width: 900px) {
  .mission-grid { grid-template-columns: 1fr; gap: 32px; }
  .stats-banner { grid-template-columns: repeat(2,1fr); gap: 0; }
  .stat-item:nth-child(2) { border-right: none; }
  .stat-item:nth-child(3), .stat-item:nth-child(4) { border-top: 1px solid var(--bd); }
  .values-grid { grid-template-columns: 1fr 1fr; }
  .contact-section { grid-template-columns: 1fr; }
  .nav-links { display: none; }
}
@media (max-width: 600px) {
  .nav { padding: 0 18px; }
  .hero { padding: 70px 20px 60px; }
  .section, .team-section { padding: 60px 20px; }
  .stats-banner { margin: 0 20px; padding: 36px 20px; grid-template-columns: repeat(2,1fr); }
  .values-grid { grid-template-columns: 1fr; }
  .team-grid { gap: 28px; }
  .dev-card { width: 100%; max-width: 300px; }
  .footer { flex-direction: column; gap: 14px; text-align: center; }
  .footer-links { flex-wrap: wrap; justify-content: center; }
  .contact-section { padding: 60px 20px; }
}
`;

// ── Team data ──────────────────────────────────────────────
const TEAM = [
  {
    id: "ishak",
    name: "IS_HAK HAJI JUMA",
    title: "Lead Web Developer & Co-Founder",
    role: "Web Developer",
    bio: '"Code is not just logic — it is art. I build experiences that inspire and platforms that empower."',
    skills: ["React", "Next.js", "Node.js", "TypeScript", "UI/UX", "APIs"],
    ring1: "#22d3ee", ring2: "#0ea5e9",
    cardGrad: "linear-gradient(135deg, rgba(34,211,238,.1), rgba(14,165,233,.06))",
    cardAccent: "#22d3ee",
    tagBg: "rgba(34,211,238,.1)", tagBd: "rgba(34,211,238,.22)", tagColor: "#22d3ee",
    socialHover: "rgba(34,211,238,.12)", socialBd: "rgba(34,211,238,.3)",
    socials: [{ emoji: "💼", label: "LinkedIn" }, { emoji: "🐙", label: "GitHub" }, { emoji: "🌐", label: "Portfolio" }],
  },
  {
    id: "yasir",
    name: "YASIR MIRAJI KASSIM",
    title: "Architecture Designer & Co-Founder",
    role: "Architecture Designer",
    bio: '"Design is the silent ambassador of vision. I craft spaces and systems that speak before words do."',
    skills: ["UI Design", "Figma", "Branding", "3D Modeling", "Architecture", "Creative"],
    ring1: "#a855f7", ring2: "#7c3aed",
    cardGrad: "linear-gradient(135deg, rgba(168,85,247,.1), rgba(124,58,237,.06))",
    cardAccent: "#a855f7",
    tagBg: "rgba(168,85,247,.1)", tagBd: "rgba(168,85,247,.22)", tagColor: "#c084fc",
    socialHover: "rgba(168,85,247,.12)", socialBd: "rgba(168,85,247,.3)",
    socials: [{ emoji: "💼", label: "LinkedIn" }, { emoji: "🎨", label: "Behance" }, { emoji: "📐", label: "Portfolio" }],
  },
];

const MISSION_CARDS = [
  { ico: "🎯", title: "Our Mission", body: "To empower every learner and creator in Tanzania with world-class digital tools and education.", color: "#22d3ee", bg: "rgba(34,211,238,.1)" },
  { ico: "🚀", title: "Our Vision", body: "To become East Africa's most trusted e-learning and digital commerce platform by 2027.", color: "#a855f7", bg: "rgba(168,85,247,.1)" },
  { ico: "🌍", title: "Our Impact", body: "Building bridges between talent and opportunity — locally crafted, globally competitive.", color: "#10b981", bg: "rgba(16,185,129,.1)" },
];

const VALUES = [
  { ico: "⚡", title: "Innovation First", body: "We embrace cutting-edge technology to build solutions that didn't exist yesterday.", accent: "#22d3ee" },
  { ico: "🤝", title: "Community Driven", body: "Every feature, every decision — made with our community's growth in mind.", accent: "#a855f7" },
  { ico: "🔒", title: "Trust & Integrity", body: "Transparent operations, honest pricing, and secure platforms are non-negotiable.", accent: "#10b981" },
  { ico: "📈", title: "Continuous Growth", body: "We never stop learning, iterating, and improving — for ourselves and our users.", accent: "#f59e0b" },
  { ico: "🌐", title: "Tanzania Proud", body: "Built in Tanzania, for Tanzania — carrying local pride to a global audience.", accent: "#0ea5e9" },
  { ico: "🎨", title: "Beautiful by Design", body: "Aesthetics and function coexist. We believe great design is great experience.", accent: "#f43f5e" },
];

// ── Developer Card Component ───────────────────────────────
function DevCard({ member }) {
  const [imgSrc, setImgSrc] = useState(null);
  const inputRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImgSrc(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="dev-card"
      style={{
        "--card-grad": member.cardGrad,
        "--card-accent": member.cardAccent,
        "--ring1": member.ring1,
        "--ring2": member.ring2,
        "--tag-bg": member.tagBg,
        "--tag-bd": member.tagBd,
        "--tag-color": member.tagColor,
        "--social-hover": member.socialHover,
        "--social-bd": member.socialBd,
      }}
    >
      {/* Avatar */}
      <div className="dev-av-wrap">
        <div className="dev-av-outer" />
        <div className="dev-av-inner">
          {imgSrc ? (
            <img className="dev-av" src={imgSrc} alt={member.name} />
          ) : (
            <div className="dev-av-placeholder" onClick={() => inputRef.current?.click()}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              <span>Upload Photo</span>
            </div>
          )}
        </div>
        <div className="dev-online" />
        <input
          ref={inputRef}
          type="file"
          className="dev-upload-inp"
          accept="image/*"
          onChange={handleUpload}
        />
      </div>

      {/* Upload button if already has image */}
      {imgSrc && (
        <button
          onClick={() => inputRef.current?.click()}
          style={{
            position: "absolute", top: 14, right: 14,
            background: "rgba(0,0,0,.5)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,.15)", borderRadius: 8,
            padding: "5px 10px", fontSize: 10, color: "rgba(255,255,255,.7)",
            cursor: "pointer", fontFamily: "var(--fb)", zIndex: 3,
          }}
        >
          Change ✎
        </button>
      )}

      <div className="dev-role-tag">{member.role}</div>
      <div className="dev-name">{member.name}</div>
      <div className="dev-title">{member.title}</div>
      <div className="dev-divider" />
      <div className="dev-bio">{member.bio}</div>

      <div className="dev-skills">
        {member.skills.map(s => <span key={s} className="dev-skill">{s}</span>)}
      </div>

      <div className="dev-socials">
        {member.socials.map(s => (
          <div key={s.label} className="dev-social" title={s.label}>{s.emoji}</div>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────
export default function AboutUs() {
  const [activeNav, setActiveNav] = useState("About");

  return (
    <>
      <style>{css}</style>
      <div className="atmo" />
      <div className="page">

        {/* ── NAV ── */}
        <nav className="nav">
          <div className="nav-logo">Skills<span>Future</span></div>
          <div className="nav-links">
            {["Home", "Courses", "About", "Contact"].map(l => (
              <button key={l} className={`nav-link${activeNav === l ? " active" : ""}`} onClick={() => setActiveNav(l)}>{l}</button>
            ))}
          </div>
          <button className="nav-cta">🚀 Get Started</button>
        </nav>

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-dot" />
            About SkillsFuture
          </div>
          <h1 className="hero-title">
            Built for World.<br />
            <em>Designed for the World.</em>
          </h1>
          <p className="hero-sub">
            We are a passionate team of creators and engineers dedicated to building
            World most impactful digital learning and commerce platform —
            one lesson, one product, one dream at a time.
          </p>
          <div className="hero-pills">
            <div className="pill"><span className="pill-ico">📍</span> Zanzibar, Tanzania</div>
            <div className="pill"><span className="pill-ico">🏢</span> Founded 2024</div>
            <div className="pill"><span className="pill-ico">👥</span> 24K+ Community Members</div>
            <div className="pill"><span className="pill-ico">⭐</span> 4.9 Platform Rating</div>
          </div>
        </section>

        <div className="glow-line" />

        {/* ── MISSION ── */}
        <section className="section">
          <div className="section-label">Who We Are</div>
          <div className="section-title">Empowering the Next<br />Generation of Creators</div>
          <div className="mission-grid">
            <div className="mission-text">
              <p style={{ marginBottom: 16 }}>
                <strong>Skillhub Tanzania</strong> was born from a simple but powerful belief:
                that world-class digital education and commerce tools should be accessible
                to every one in this World, regardless of background or location.
              </p>
              <p style={{ marginBottom: 16 }}>
                We combine <strong>cutting-edge technology</strong> with deep local understanding
                to create a platform that feels both globally competitive and authentically WorldWide.
              </p>
              <p>
                From our flagship e-learning dashboard to our seller marketplace,
                every feature is crafted with precision, passion, and purpose —
                because we believe <strong>Africa's digital future starts here.</strong>
              </p>
            </div>
            <div className="mission-cards">
              {MISSION_CARDS.map(c => (
                <div className="mission-card" key={c.title} style={{ "--acc": c.color }}>
                  <div className="mission-card-ico" style={{ background: c.bg }}>{c.ico}</div>
                  <div>
                    <div className="mission-card-title">{c.title}</div>
                    <div className="mission-card-body">{c.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="stats-banner">
          {[
            { num: "24K+", desc: "Active Learners" },
            { num: "150+", desc: "Expert Courses" },
            { num: "4.9★", desc: "Platform Rating" },
            { num: "98%", desc: "Satisfaction Rate" },
          ].map(s => (
            <div className="stat-item" key={s.desc}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-desc">{s.desc}</div>
            </div>
          ))}
        </div>

        {/* ── TEAM ── */}
        <section className="team-section">
          <div className="team-header">
            <div className="section-label" style={{ textAlign: "center" }}>Meet the Founders</div>
            <div className="section-title" style={{ textAlign: "center" }}>
              The Minds Behind<br /><em style={{ fontStyle: "normal", background: "linear-gradient(135deg,#22d3ee,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Skillhub Tanzania</em>
            </div>
            <p style={{ textAlign: "center", color: "var(--tx2)", fontSize: 15, marginTop: 16, maxWidth: 500, margin: "16px auto 0", lineHeight: 1.7 }}>
              Two visionaries with complementary skills, united by a shared mission to transform Tanzania's digital landscape.
            </p>
          </div>

          <div className="team-grid">
            {TEAM.map(m => <DevCard key={m.id} member={m} />)}
          </div>
        </section>

        <div className="glow-line" />

        {/* ── VALUES ── */}
        <section className="section">
          <div className="section-label">Our Core Values</div>
          <div className="section-title">What Drives Us<br />Every Single Day</div>
          <div className="values-grid">
            {VALUES.map(v => (
              <div className="value-card" key={v.title} style={{ "--vc-accent": v.accent }}>
                <div className="value-ico">{v.ico}</div>
                <div className="value-title">{v.title}</div>
                <div className="value-body">{v.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="contact-section">
          <div>
            <div className="section-label">Get In Touch</div>
            <div className="section-title" style={{ marginBottom: 32 }}>We'd Love to<br />Hear From You</div>
            <div className="contact-info">
              {[
                { ico: "📧", label: "Email", val: "hello@skillhub.co.tz", bg: "rgba(34,211,238,.1)" },
                { ico: "📍", label: "Location", val: "Dar es Salaam, Tanzania", bg: "rgba(168,85,247,.1)" },
                { ico: "📞", label: "Phone", val: "+255 700 000 000", bg: "rgba(16,185,129,.1)" },
                { ico: "🌐", label: "Website", val: "www.skillhub.co.tz", bg: "rgba(245,158,11,.1)" },
              ].map(c => (
                <div className="contact-item" key={c.label}>
                  <div className="contact-ico" style={{ background: c.bg }}>{c.ico}</div>
                  <div>
                    <div className="contact-label">{c.label}</div>
                    <div className="contact-val">{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="cta-box">
            <div style={{ fontSize: 40, marginBottom: 16 }}>🚀</div>
            <div className="cta-title">Ready to Start Your Journey?</div>
            <div className="cta-sub">
              Join over 24,000 learners and creators building their future with Skillsfuture.
              The best time to start was yesterday. The second best time is right now.
            </div>
            <button className="cta-btn">🎓 Join Skillsfuture Free</button>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer">
          <div className="nav-logo footer-logo">Skill<span>hub</span><sub style={{ fontSize: 8, color: "var(--mu)", verticalAlign: "top", marginLeft: 1, fontWeight: 400, letterSpacing: ".06em" }}>TZ</sub></div>
          <div className="footer-copy">© 2024 Skillsfuture. All rights reserved.</div>
          <div className="footer-links">
            {["Privacy", "Terms", "Cookies", "Sitemap"].map(l => (
              <span key={l} className="footer-link">{l}</span>
            ))}
          </div>
        </footer>

      </div>
    </>
  );
}