import { useState, useRef, useEffect } from "react";

const lessons = [
  { id: 1, title: "Introduction to React & JSX", duration: "12:34", progress: 100, locked: false, thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=320&q=80" },
  { id: 2, title: "Component Architecture", duration: "18:22", progress: 75, locked: false, thumbnail: "https://images.unsplash.com/photo-1547658719-da2b848c1ad1?w=320&q=80" },
  { id: 3, title: "State & Props Deep Dive", duration: "24:10", progress: 40, locked: false, thumbnail: "https://images.unsplash.com/photo-1618576832575-3b22e9f671e5?w=320&q=80" },
  { id: 4, title: "Hooks: useState & useEffect", duration: "31:05", progress: 0, locked: true, thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=320&q=80" },
  { id: 5, title: "Context API & Global State", duration: "22:48", progress: 0, locked: true, thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24f?w=320&q=80" },
  { id: 6, title: "React Router v6", duration: "19:33", progress: 0, locked: true, thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=320&q=80" },
  { id: 7, title: "Performance Optimization", duration: "27:14", progress: 0, locked: true, thumbnail: "https://images.unsplash.com/photo-1515973819979-b5c9d39bb7d0?w=320&q=80" },
  { id: 8, title: "Testing with Jest & RTL", duration: "35:02", progress: 0, locked: true, thumbnail: "https://images.unsplash.com/photo-1578506505549-44f64ee6e273?w=320&q=80" },
];

const resources = [
  { name: "React Mastery - Module 3 Notes.pdf", type: "pdf", size: "2.4 MB" },
  { name: "starter-code-state-props.zip", type: "zip", size: "840 KB" },
  { name: "Component Cheatsheet.pdf", type: "pdf", size: "1.1 MB" },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Cabinet+Grotesk:wght@300;400;500;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #06070d;
    --surface: rgba(255,255,255,0.04);
    --surface2: rgba(255,255,255,0.07);
    --border: rgba(255,255,255,0.08);
    --border2: rgba(255,255,255,0.14);
    --blue: #0ea5e9;
    --purple: #7c3aed;
    --gold: #f5a623;
    --text: rgba(240,244,255,0.95);
    --muted: rgba(160,175,210,0.6);
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font-body); min-height: 100vh; overflow-x: hidden; }

  /* Background atmosphere */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 70% 50% at 15% 0%, rgba(14,165,233,0.1) 0%, transparent 60%),
      radial-gradient(ellipse 50% 40% at 85% 90%, rgba(124,58,237,0.12) 0%, transparent 55%),
      radial-gradient(ellipse 35% 30% at 50% 50%, rgba(245,166,35,0.03) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  .app { position: relative; z-index: 1; min-height: 100vh; display: flex; flex-direction: column; }

  /* TOP NAV */
  .topnav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 28px;
    background: rgba(6,7,13,0.8);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    position: sticky; top: 0; z-index: 100;
  }
  .logo { font-family: var(--font-display); font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
  .logo span { color: var(--blue); }
  .logo sub { font-size: 10px; color: var(--muted); letter-spacing: 0.08em; vertical-align: top; margin-left: 2px; font-weight: 400; }
  .nav-right { display: flex; align-items: center; gap: 16px; }
  .nav-avatar { width: 34px; height: 34px; border-radius: 50%; border: 2px solid var(--blue); object-fit: cover; cursor: pointer; }
  .nav-badge { background: linear-gradient(135deg, var(--blue), var(--purple)); font-size: 11px; font-weight: 600; padding: 5px 12px; border-radius: 20px; cursor: pointer; font-family: var(--font-display); letter-spacing: 0.03em; }

  /* MAIN LAYOUT */
  .main-layout {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 0;
    flex: 1;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    padding: 24px 24px 40px;
    gap: 24px;
    align-items: start;
  }

  /* LEFT CONTENT */
  .left-col { display: flex; flex-direction: column; gap: 16px; }

  /* BREADCRUMB */
  .breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--muted); font-weight: 400; }
  .breadcrumb a { color: var(--muted); text-decoration: none; transition: color 0.2s; cursor: pointer; }
  .breadcrumb a:hover { color: var(--blue); }
  .breadcrumb .sep { opacity: 0.4; }
  .breadcrumb .current { color: var(--blue); font-weight: 500; }

  /* VIDEO PLAYER */
  .video-wrap {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    background: #000;
    aspect-ratio: 16/9;
    border: 1px solid var(--border2);
    box-shadow: 0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(14,165,233,0.08);
  }
  .video-thumb {
    width: 100%; height: 100%; object-fit: cover;
    display: block;
    filter: brightness(0.75);
  }
  .video-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(6,7,13,0.7) 0%, transparent 50%);
    display: flex; align-items: center; justify-content: center;
  }
  .play-ring {
    width: 72px; height: 72px; border-radius: 50%;
    background: rgba(14,165,233,0.15);
    backdrop-filter: blur(12px);
    border: 1.5px solid rgba(14,165,233,0.5);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
    box-shadow: 0 0 30px rgba(14,165,233,0.2), 0 0 60px rgba(14,165,233,0.1);
    animation: pulse-ring 2.5s ease-in-out infinite;
  }
  .play-ring:hover { transform: scale(1.1); background: rgba(14,165,233,0.3); box-shadow: 0 0 50px rgba(14,165,233,0.4); }
  @keyframes pulse-ring {
    0%, 100% { box-shadow: 0 0 30px rgba(14,165,233,0.2), 0 0 0 0 rgba(14,165,233,0.15); }
    50% { box-shadow: 0 0 30px rgba(14,165,233,0.3), 0 0 20px 8px rgba(14,165,233,0.05); }
  }

  /* VIDEO BOTTOM TIME */
  .video-time {
    position: absolute; bottom: 14px; left: 18px;
    font-size: 12px; color: rgba(255,255,255,0.7); font-weight: 500;
    letter-spacing: 0.05em;
  }
  .video-quality {
    position: absolute; bottom: 14px; right: 18px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
    background: rgba(14,165,233,0.25); border: 1px solid rgba(14,165,233,0.4);
    padding: 3px 8px; border-radius: 5px; color: var(--blue);
  }

  /* INSTRUCTOR FLOATING CARD */
  .instructor-float {
    display: flex; align-items: center; gap: 14px;
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(20px);
    border: 1px solid var(--border2);
    border-radius: 16px;
    padding: 14px 18px;
    position: relative;
    margin-top: -2px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  }
  .ins-avatar-wrap { position: relative; flex-shrink: 0; }
  .ins-avatar { width: 52px; height: 52px; border-radius: 50%; object-fit: cover; display: block; border: 2px solid transparent; background-clip: padding-box; }
  .ins-avatar-ring {
    position: absolute; inset: -3px; border-radius: 50%;
    background: linear-gradient(135deg, var(--blue), var(--purple));
    z-index: -1;
    animation: spin-gradient 4s linear infinite;
  }
  @keyframes spin-gradient {
    0% { background: linear-gradient(0deg, var(--blue), var(--purple)); }
    25% { background: linear-gradient(90deg, var(--blue), var(--purple)); }
    50% { background: linear-gradient(180deg, var(--blue), var(--purple)); }
    75% { background: linear-gradient(270deg, var(--blue), var(--purple)); }
    100% { background: linear-gradient(360deg, var(--blue), var(--purple)); }
  }
  .ins-info { flex: 1; }
  .ins-label { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 2px; }
  .ins-name { font-family: var(--font-display); font-size: 15px; font-weight: 700; color: var(--text); }
  .ins-tag { font-size: 11px; color: var(--muted); margin-top: 1px; }
  .follow-btn {
    position: relative; padding: 9px 20px; border-radius: 12px;
    font-family: var(--font-display); font-size: 12px; font-weight: 600;
    cursor: pointer; background: transparent; color: var(--text);
    border: none; letter-spacing: 0.04em;
    overflow: hidden;
  }
  .follow-btn::before {
    content: '';
    position: absolute; inset: 0;
    border-radius: 12px;
    padding: 1.5px;
    background: linear-gradient(135deg, var(--blue), var(--purple));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    animation: border-dance 3s linear infinite;
  }
  .follow-btn::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(14,165,233,0.08), rgba(124,58,237,0.08));
    border-radius: 12px;
    z-index: -1;
  }
  @keyframes border-dance {
    0% { background: linear-gradient(0deg, var(--blue), var(--purple)); }
    100% { background: linear-gradient(360deg, var(--blue), var(--purple)); }
  }

  /* ACTION BAR */
  .action-bar {
    display: flex; align-items: center; gap: 10px;
    background: var(--surface);
    backdrop-filter: blur(16px);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 14px 18px;
  }
  .action-btn {
    display: flex; align-items: center; gap: 7px;
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: 10px; padding: 9px 16px;
    color: var(--text); font-family: var(--font-body); font-size: 13px;
    font-weight: 500; cursor: pointer;
    transition: all 0.25s ease; white-space: nowrap;
  }
  .action-btn:hover { background: rgba(14,165,233,0.12); border-color: rgba(14,165,233,0.3); color: var(--blue); }
  .action-btn.active { background: rgba(14,165,233,0.15); border-color: rgba(14,165,233,0.4); color: var(--blue); }
  .action-btn.rocket:hover { background: rgba(245,166,35,0.12); border-color: rgba(245,166,35,0.3); color: var(--gold); }
  .dl-btn {
    margin-left: auto;
    display: flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, rgba(14,165,233,0.2), rgba(124,58,237,0.2));
    border: 1px solid rgba(14,165,233,0.35);
    border-radius: 10px; padding: 9px 18px;
    color: var(--blue); font-family: var(--font-body); font-size: 13px;
    font-weight: 600; cursor: pointer;
    transition: all 0.25s ease;
  }
  .dl-btn:hover { background: linear-gradient(135deg, rgba(14,165,233,0.3), rgba(124,58,237,0.3)); box-shadow: 0 4px 20px rgba(14,165,233,0.2); }

  /* DOWNLOAD POPUP */
  .dl-popup-wrap { position: relative; }
  .dl-popup {
    position: absolute; bottom: calc(100% + 10px); right: 0;
    background: rgba(10,12,22,0.95);
    backdrop-filter: blur(24px);
    border: 1px solid var(--border2);
    border-radius: 16px; padding: 16px;
    width: 280px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(14,165,233,0.08);
    z-index: 50;
    animation: pop-in 0.2s cubic-bezier(0.23,1,0.32,1);
  }
  @keyframes pop-in { from { opacity: 0; transform: translateY(8px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
  .dl-popup-title { font-family: var(--font-display); font-size: 13px; font-weight: 700; margin-bottom: 12px; color: var(--text); }
  .dl-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px; border-radius: 10px;
    background: var(--surface2); border: 1px solid var(--border);
    margin-bottom: 8px; cursor: pointer;
    transition: all 0.2s;
  }
  .dl-item:last-child { margin-bottom: 0; }
  .dl-item:hover { border-color: rgba(14,165,233,0.3); background: rgba(14,165,233,0.08); }
  .dl-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
  .dl-icon.pdf { background: rgba(239,68,68,0.15); }
  .dl-icon.zip { background: rgba(245,166,35,0.15); }
  .dl-meta { flex: 1; }
  .dl-name { font-size: 11px; font-weight: 500; color: var(--text); line-height: 1.3; }
  .dl-size { font-size: 10px; color: var(--muted); margin-top: 1px; }

  /* RIGHT SIDEBAR */
  .sidebar {
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(20px);
    border: 1px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
    position: sticky;
    top: 80px;
  }
  .sidebar-header { padding: 18px 18px 14px; border-bottom: 1px solid var(--border); }
  .sidebar-title { font-family: var(--font-display); font-size: 14px; font-weight: 700; letter-spacing: -0.01em; margin-bottom: 10px; }
  .sidebar-progress-wrap { display: flex; align-items: center; gap: 10px; }
  .sidebar-progress-bar { flex: 1; height: 4px; background: rgba(255,255,255,0.07); border-radius: 4px; overflow: hidden; }
  .sidebar-progress-fill { height: 100%; background: linear-gradient(to right, var(--blue), var(--purple)); border-radius: 4px; width: 37%; }
  .sidebar-progress-label { font-size: 11px; color: var(--blue); font-weight: 600; white-space: nowrap; }

  /* SEARCH */
  .sidebar-search { padding: 12px 14px; border-bottom: 1px solid var(--border); }
  .search-wrap { position: relative; }
  .search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); opacity: 0.4; }
  .search-input {
    width: 100%; background: var(--surface2); border: 1px solid var(--border);
    border-radius: 10px; padding: 9px 12px 9px 32px;
    color: var(--text); font-family: var(--font-body); font-size: 12px;
    outline: none; transition: border-color 0.2s;
  }
  .search-input::placeholder { color: var(--muted); }
.search-input:focus { border-color: rgba(14,165,233,0.4); }
.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-top: none;
  border-radius: 0 0 10px 10px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  display: none;
}
.search-suggestions.show { display: block; }
.suggestion-item {
  padding: 10px 12px;
  cursor: pointer;
  border-bottom: 1px solid var(--border);
  font-size: 12px;
  transition: background 0.2s;
}
.suggestion-item:hover { background: rgba(14,165,233,0.1); }
.suggestion-item:last-child { border-bottom: none; }
.search-wrap.focus .search-suggestions { display: block; }

  /* LESSON LIST - YouTube Thumbnail Style */
  .lesson-list { 
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px; 
    padding: 12px; 
    max-height: 600px; 
    overflow-y: auto;
  }
  .lesson-list::-webkit-scrollbar { width: 4px; }
  .lesson-list::-webkit-scrollbar-track { background: transparent; }
  .lesson-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }

  .lesson-item {
    aspect-ratio: 16/9;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    transition: all 0.25s ease;
    border: 1px solid transparent;
    background: var(--surface2);
  }
  .lesson-item:hover:not(.locked) { border-color: var(--border); transform: scale(1.02); }
.lesson-item.active { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(14,165,233,0.4), inset 0 0 0 2px rgba(14,165,233,0.2); }
  .lesson-item.locked { cursor: not-allowed; opacity: 0.6; }
  .lesson-item.locked:hover { transform: none; border-color: rgba(245,166,35,0.3); }

  .thumb-img {
    width: 100%; height: 100%; object-fit: cover;
  }

  .thumb-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(6,7,13,0.9) 0%, transparent 60%);
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 12px;
    opacity: 0; transition: opacity 0.3s ease;
  }
  .lesson-item:hover .thumb-overlay { opacity: 1; }

  .thumb-title {
    font-size: 11px; font-weight: 500; color: var(--text); 
    line-height: 1.3; margin-bottom: 2px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  }
  .thumb-dur {
    font-size: 10px; color: var(--muted); 
  }

  .thumb-progress {
    position: absolute; bottom: 4px; left: 4px; right: 4px;
    height: 2px; background: rgba(255,255,255,0.2); border-radius: 1px; overflow: hidden;
  }
  .thumb-progress-fill {
    height: 100%; background: var(--blue); border-radius: 1px;
    width: 0%; transition: width 0.3s ease;
  }

  .lock-overlay {
    position: absolute; inset: 0; background: rgba(245,166,35,0.3);
    display: flex; align-items: center; justify-content: center;
  }
  .lesson-item:hover:not(.locked) { background: var(--surface2); border-color: var(--border); }
  .lesson-item.active { background: rgba(14,165,233,0.08); border-color: rgba(14,165,233,0.25); }
  .lesson-item.locked { cursor: not-allowed; opacity: 0.7; }
  .lesson-item.locked:hover { background: rgba(245,166,35,0.04); border-color: rgba(245,166,35,0.15); }

  .lesson-top { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; }
  .lesson-num { font-size: 11px; color: var(--muted); font-weight: 600; min-width: 18px; padding-top: 1px; }
  .lesson-info { flex: 1; }
  .lesson-title-text { font-size: 12.5px; font-weight: 500; color: var(--text); line-height: 1.35; margin-bottom: 3px; }
  .lesson-dur { font-size: 11px; color: var(--muted); }
  .lesson-icon { flex-shrink: 0; padding-top: 1px; }

  /* Mini progress bar per lesson */
  .lesson-progress { position: absolute; bottom: 6px; left: 12px; right: 12px; height: 2px; background: rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden; }
  .lesson-progress-fill { height: 100%; border-radius: 2px; background: linear-gradient(to right, var(--blue), var(--purple)); transition: width 0.3s ease; }

  /* Tooltip */
  .tooltip-wrap { position: relative; display: inline-flex; }
  .tooltip {
    position: absolute; bottom: calc(100% + 8px); right: 0;
    background: rgba(245,166,35,0.12);
    border: 1px solid rgba(245,166,35,0.3);
    backdrop-filter: blur(12px);
    border-radius: 10px; padding: 8px 12px;
    font-size: 11px; font-weight: 500; color: var(--gold);
    white-space: nowrap; pointer-events: none;
    opacity: 0; transition: opacity 0.2s, transform 0.2s;
    transform: translateY(4px);
    z-index: 20;
  }
  .lesson-item.locked:hover .tooltip { opacity: 1; transform: translateY(0); }

  /* Gold lock glow */
  .gold-lock { filter: drop-shadow(0 0 4px rgba(245,166,35,0.6)); }

  /* Active lesson indicator */
  .active-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--blue);
    box-shadow: 0 0 6px rgba(14,165,233,0.8);
    animation: blink 1.5s ease-in-out infinite;
    flex-shrink: 0; margin-top: 5px;
  }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

@keyframes pulse-active {
  0% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 0 2px rgba(14,165,233,0.6), 0 4px 12px rgba(14,165,233,0.4); }
  50% { transform: translate(-50%, -50%) scale(1.2); box-shadow: 0 0 0 4px rgba(14,165,233,0.4), 0 8px 20px rgba(14,165,233,0.6); }
  100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 0 2px rgba(14,165,233,0.6), 0 4px 12px rgba(14,165,233,0.4); }
}

  /* Toggle Panels */
  .toggle-panels {
    background: var(--surface);
    backdrop-filter: blur(16px);
    border: 1px solid var(--border);
    border-radius: 16px;
    margin-top: 16px;
    overflow: hidden;
  }
  .panel {
    display: none;
    padding: 20px;
  }
  .panel.active {
    display: block;
  }

  /* Comments Styles */
  .comments-header {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 16px;
  }
  .comment-item {
    display: flex; gap: 12px;
    padding: 16px 0;
    border-bottom: 1px solid var(--border);
  }
  .comment-item:last-child {
    border-bottom: none;
  }
  .comment-avatar {
    width: 40px; height: 40px;
    border-radius: 50%; object-fit: cover; flex-shrink: 0;
  }
  .comment-actions {
    display: flex; gap: 16px;
    font-size: 12px; color: var(--muted);
    margin-top: 8px;
  }
  .comment-actions span:hover {
    color: var(--blue);
  }

  /* Shimmer on sidebar */
  .sidebar::before {
    content: '';
    position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
    background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.02) 50%, transparent 70%);
    animation: sidebar-shim 6s ease-in-out infinite;
    pointer-events: none; z-index: 10;
  }
  @keyframes sidebar-shim { 0%{left:-100%;opacity:0} 30%{opacity:1} 70%{opacity:1} 100%{left:160%;opacity:0} }

  /* Course stats strip */
  .stats-strip {
    display: flex; gap: 0;
    border-top: 1px solid var(--border);
    margin-top: 6px;
  }
  .stat { flex: 1; padding: 12px; text-align: center; border-right: 1px solid var(--border); }
  .stat:last-child { border-right: none; }
  .stat-val { font-family: var(--font-display); font-size: 15px; font-weight: 700; color: var(--text); }
  .stat-key { font-size: 10px; color: var(--muted); margin-top: 1px; letter-spacing: 0.05em; }
`;

export default function SkillhubPage() {
  const [search, setSearch] = useState("");
  const [activeLesson, setActiveLesson] = useState(3);
  const [showDL, setShowDL] = useState(false);
const [commentsActive, setCommentsActive] = useState(false);
  const [notesActive, setNotesActive] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [hoveredLocked, setHoveredLocked] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const comments = [
    { id: 1, user: "Asha Mushi", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&q=80", time: "2 saa zilizopita", text: "Mafundisho mazuri sana! Nimeelewa React vizuri.", likes: 12 },
    { id: 2, user: "Juma Kilonzo", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&q=80", time: "saa 1 iliyopita", text: "Boost section imefaa sana, asante!", likes: 8 },
    { id: 3, user: "Fatma Ali", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&q=80", time: " dakika 30 zilizopita", text: "Naona comments zinafanya kazi kama YouTube!", likes: 5 },
  ];
  const dlRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (dlRef.current && !dlRef.current.contains(e.target)) setShowDL(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = lessons.filter(l =>
    l.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        {/* TOP NAV */}
        <nav className="topnav">
          <div className="logo">
            Skill<span>feature</span><sub>TZ</sub>
          </div>
          <div className="nav-right">
            <div className="nav-badge">⚡ Upgrade Pro</div>
            <img className="nav-avatar" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="user" />
          </div>
        </nav>

        <div className="main-layout">
          {/* LEFT COLUMN */}
          <div className="left-col">
            {/* BREADCRUMB */}
            <div className="breadcrumb">
              <a href="#" onClick={(e) => { e.preventDefault(); window.parent.postMessage({type: 'navigate', page: 'home'}, '*'); }}>Home</a>
              <span className="sep">›</span>
              <a href="#" onClick={(e) => { e.preventDefault(); window.parent.postMessage({type: 'navigate', page: 'web'}, '*'); }}>Web Development</a>
              <span className="sep">›</span>
              <span className="current">React Mastery</span>
            </div>

            {/* VIDEO */}
            <div className="video-wrap">
              <img
                className="video-thumb"
                src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&q=85"
                alt="video"
              />
              <div className="video-overlay">
                <div className="play-ring">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="video-time">14:22 / 24:10</div>
              <div className="video-quality">4K</div>
            </div>

            {/* INSTRUCTOR FLOAT */}
            <div className="instructor-float">
              <div className="ins-avatar-wrap">
                <div className="ins-avatar-ring" />
                <img
                  className="ins-avatar"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                  alt="instructor"
                />
              </div>
              <div className="ins-info">
                <div className="ins-label">Your Instructor</div>
                <div className="ins-name">James Carter</div>
                <div className="ins-tag">Senior React Engineer · Google</div>
              </div>
              <button
                className="follow-btn"
                onClick={() => setFollowed(!followed)}
              >
                {followed ? "✓ Following" : "+ Follow Expert"}
              </button>
            </div>

            {/* ACTION BAR */}
            <div className="action-bar">
              <button
                className={`action-btn ${notesActive ? "active" : ""}`}
                onClick={() => setNotesActive(!notesActive)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                Likes
              </button>
              <button 
                className={`action-btn ${commentsActive ? "active" : ""}`}
                onClick={() => setCommentsActive(!commentsActive)}
              >
                💬 Comments
              </button>
              <button className="action-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                Share
              </button>
              <div className="dl-popup-wrap" ref={dlRef}>
                <button className="dl-btn" onClick={() => setShowDL(!showDL)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download Resources
                </button>
                {showDL && (
                  <div className="dl-popup">
                    <div className="dl-popup-title">📦 Lesson Resources</div>
                    {resources.map((r, i) => (
                      <div key={i} className="dl-item">
                        <div className={`dl-icon ${r.type}`}>
                          {r.type === "pdf" ? "📄" : "🗜️"}
                        </div>
                        <div className="dl-meta">
                          <div className="dl-name">{r.name}</div>
                          <div className="dl-size">{r.size}</div>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(14,165,233,0.7)" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* TOGGLE PANELS - YouTube style below video */}
            <div className="toggle-panels">
              {/* Likes Panel - Real Tanzanian names & realistic */}
              <div className={`panel notes-panel ${notesActive ? "active" : ""}`}>
                <div style={{fontSize: "14px", fontWeight: "600", marginBottom: "16px"}}>❤️ Likes (124)</div>
                <div style={{display: "flex", flexDirection: "column", gap: "12px", maxHeight: "300px", overflowY: "auto"}}>
                  <div style={{display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "var(--surface2)", borderRadius: "10px"}}>
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&q=80" alt="user" style={{width: "40px", height: "40px", borderRadius: "50%"}} />
                    <div>Issa Felix liked this</div>
                    <span style={{marginLeft: "auto", color: "var(--muted)", fontSize: "12px"}}>sasa</span>
                  </div>
                  <div style={{display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "var(--surface2)", borderRadius: "10px"}}>
                    <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=40&q=80" alt="user" style={{width: "40px", height: "40px", borderRadius: "50%"}} />
                    <div>Zuhura Mfinanga liked this</div>
                    <span style={{marginLeft: "auto", color: "var(--muted)", fontSize: "12px"}}>dakika 5 zilizopita</span>
                  </div>
                  <div style={{display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "var(--surface2)", borderRadius: "10px"}}>
                    <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&q=80" alt="user" style={{width: "40px", height: "40px", borderRadius: "50%"}} />
                    <div>Asha Ramadhan liked this</div>
                    <span style={{marginLeft: "auto", color: "var(--muted)", fontSize: "12px"}}>saa 1 iliyopita</span>
                  </div>
                  <div style={{display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "var(--surface2)", borderRadius: "10px"}}>
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&q=80" alt="user" style={{width: "40px", height: "40px", borderRadius: "50%"}} />
                    <div>Juma Kapufya liked this</div>
                    <span style={{marginLeft: "auto", color: "var(--muted)", fontSize: "12px"}}>saa 3 zilizopita</span>
                  </div>
                  <div style={{display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "var(--surface2)", borderRadius: "10px"}}>
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&q=80" alt="user" style={{width: "40px", height: "40px", borderRadius: "50%"}} />
                    <div>Halima Swai liked this</div>
                    <span style={{marginLeft: "auto", color: "var(--muted)", fontSize: "12px"}}>jana</span>
                  </div>
                  <div style={{display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "var(--surface2)", borderRadius: "10px"}}>
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&q=80" alt="user" style={{width: "40px", height: "40px", borderRadius: "50%"}} />
                    <div>Baraka Ndemu liked this</div>
                    <span style={{marginLeft: "auto", color: "var(--muted)", fontSize: "12px"}}>wiki 1 iliyopita</span>
                  </div>
                </div>
              </div>
              {/* Comments Panel */}
              <div className={`panel comments-panel ${commentsActive ? "active" : ""}`}>
                <div className="comments-header">
                  <div style={{fontSize: "14px", fontWeight: "600"}}>💬 {comments.length} Maoni</div>
                </div>
                <div style={{display: "flex", gap: "12px", marginBottom: "16px"}}>
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&q=80" alt="user" style={{width: "40px", height: "40px", borderRadius: "50%"}} />
                  <textarea 
                    placeholder="Ongeza maoni yako..." 
                    style={{flex: 1, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "10px", padding: "12px", color: "var(--text)", fontFamily: "var(--font-body)", fontSize: "13px", resize: "vertical", minHeight: "80px"}}
                    rows="2"
                  />
                  <button style={{background: "var(--blue)", color: "white", border: "none", borderRadius: "10px", padding: "12px 20px", fontWeight: "600", cursor: "pointer"}}>Post</button>
                </div>
                <div style={{maxHeight: "300px", overflowY: "auto"}}>
                  {comments.map((comment) => (
                    <div key={comment.id} className="comment-item">
                      <img src={comment.avatar} alt={comment.user} className="comment-avatar" />
                      <div className="comment-content">
                        <div style={{fontWeight: "600", marginBottom: "4px"}}>{comment.user}</div>
                        <div style={{color: "var(--text)", marginBottom: "8px", lineHeight: "1.4"}}>{comment.text}</div>
                        <div className="comment-actions">
                          <span>{comment.time}</span>
                          <span>❤️ {comment.likes}</span>
                          <span>Reply</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="sidebar">
            <div className="sidebar-header">
              <div className="sidebar-title">React Mastery — Full Course</div>
              <div className="sidebar-progress-wrap">
                <div className="sidebar-progress-bar">
                  <div className="sidebar-progress-fill" />
                </div>
                <div className="sidebar-progress-label">37% done</div>
              </div>
            </div>

            {/* SEARCH */}
            <div className="sidebar-search">
              <div className="search-wrap">
                <svg className="search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  className="search-input"
                  placeholder="Search lessons..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onFocus={() => document.querySelector('.search-wrap').classList.add('focus')}
                  onBlur={() => setTimeout(() => document.querySelector('.search-wrap').classList.remove('focus'), 200)}
                />
                <div className="search-suggestions">
                  {search.length > 0 && filtered.length > 0 ? filtered.slice(0, 5).map(lesson => (
                    <div key={lesson.id} className="suggestion-item" onMouseDown={() => {
                      setSearch(lesson.title);
                      setActiveLesson(lesson.id);
                    }}>
                      {lesson.title}
                    </div>
                  )) : search.length > 0 && filtered.length === 0 ? (
                    <div className="suggestion-item" style={{opacity: 0.6, cursor: 'default'}}>Hakuna video zilizopatikana</div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* LESSONS */}
            <div className="lesson-list">
              {filtered.map((lesson) => (
                <div
                  key={lesson.id}
                  className={`lesson-item ${lesson.locked ? "locked" : ""} ${activeLesson === lesson.id ? "active" : ""}`}
                  onClick={() => {
                    if (!lesson.locked) {
                      setActiveLesson(lesson.id);
                      setIsPlaying(true);
                      setTimeout(() => setIsPlaying(false), 1000);
                    }
                  }}
                  onMouseEnter={() => lesson.locked && setHoveredLocked(lesson.id)}
                  onMouseLeave={() => setHoveredLocked(null)}
                >
                  <img src={lesson.thumbnail} alt={lesson.title} className="thumb-img" />
                  <div className="thumb-overlay">
                    <div className="thumb-title">{lesson.title}</div>
                    <div className="thumb-dur">{lesson.duration}</div>
                  </div>
                  <div className="thumb-progress">
                    <div className="thumb-progress-fill" style={{ width: `${lesson.progress}%` }} />
                  </div>
                  {lesson.locked && (
                    <div className="lock-overlay">
                      <svg className="gold-lock" width="24" height="24" viewBox="0 0 24 24" fill="#f5a623">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                      {hoveredLocked === lesson.id && (
                        <div className="tooltip">🔒 Upgrade to Premium</div>
                      )}
                    </div>
                  )}
{activeLesson === lesson.id && !lesson.locked && (
                    <div className="active-indicator" style={{position: "absolute", top: "8px", right: "8px", width: "24px", height: "24px", borderRadius: "50%", background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 2px rgba(14,165,233,0.6), 0 4px 12px rgba(14,165,233,0.4)", animation: isPlaying ? "pulse-active 1s ease-out" : "none"}}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
              {filtered.length === 0 && (
                <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--muted)", fontSize: "13px", gridColumn: "1/-1" }}>
                  Hakuna video zilizopatikana
                </div>
              )}
            </div>

            {/* STATS STRIP */}
            <div className="stats-strip">
              <div className="stat">
                <div className="stat-val">8</div>
                <div className="stat-key">LESSONS</div>
              </div>
              <div className="stat">
                <div className="stat-val">3h</div>
                <div className="stat-key">TOTAL</div>
              </div>
              <div className="stat">
                <div className="stat-val">4.9★</div>
                <div className="stat-key">RATING</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}