"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("[ErrorBoundary]", error.message);
    }
  }, [error]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .e5-wrap {
          min-height: 80vh;
          display: flex; align-items: center; justify-content: center;
          padding: 4rem 1.5rem;
          background: #050B14;
          overflow: hidden; position: relative;
          font-family: Inter, system-ui, -apple-system, sans-serif;
        }
        .e5-orb {
          position:absolute; border-radius:50%;
          filter:blur(90px); pointer-events:none;
        }
        .e5-orb1 {
          width:520px; height:520px;
          background:radial-gradient(circle, rgba(220,38,38,0.2) 0%, transparent 70%);
          top:-180px; right:-120px;
          animation:e5orb1 14s ease-in-out infinite;
        }
        .e5-orb2 {
          width:400px; height:400px;
          background:radial-gradient(circle, rgba(10,25,41,0.9) 0%, transparent 70%);
          bottom:-120px; left:-100px;
          animation:e5orb2 17s ease-in-out infinite;
        }
        .e5-orb3 {
          width:280px; height:280px;
          background:radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%);
          top:55%; left:8%;
          animation:e5orb3 11s ease-in-out infinite;
        }
        @keyframes e5orb1{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(-55px,-70px) scale(1.1)}70%{transform:translate(30px,40px) scale(0.92)}}
        @keyframes e5orb2{0%,100%{transform:translate(0,0) scale(1)}35%{transform:translate(55px,65px) scale(1.12)}70%{transform:translate(-25px,-35px) scale(0.94)}}
        @keyframes e5orb3{0%,100%{transform:translate(0,0)}50%{transform:translate(35px,45px)}}
        .e5-grid {
          position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
          background-size:48px 48px;
          -webkit-mask-image:linear-gradient(to bottom, rgba(0,0,0,.55) 0%, transparent 78%);
          mask-image:linear-gradient(to bottom, rgba(0,0,0,.55) 0%, transparent 78%);
          pointer-events:none;
        }
        .e5-body {
          position:relative; z-index:10;
          text-align:center; max-width:620px; width:100%;
          animation:e5up 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes e5up{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        .e5-badge {
          display:inline-flex; align-items:center; gap:.5rem;
          padding:.35rem 1rem; border-radius:9999px;
          border:1px solid rgba(220,38,38,0.25);
          background:rgba(220,38,38,0.07);
          font-size:.68rem; font-weight:700;
          letter-spacing:.18em; text-transform:uppercase;
          color:rgba(248,113,113,0.85);
          margin-bottom:2.5rem;
          animation:e5up .7s .05s cubic-bezier(0.16,1,.3,1) both;
        }
        .e5-dot {
          width:6px; height:6px; border-radius:50%;
          background:#EF4444; box-shadow:0 0 8px rgba(239,68,68,.9);
          animation:e5dot 2s ease-in-out infinite;
        }
        @keyframes e5dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.65)}}
        .e5-num-wrap {
          position:relative; display:inline-block;
          margin-bottom:.25rem;
          animation:e5up .7s .1s cubic-bezier(0.16,1,.3,1) both;
        }
        .e5-num {
          font-size:clamp(7rem,22vw,13rem);
          font-weight:900; line-height:.88; letter-spacing:-.05em;
          background:linear-gradient(135deg,#fff 0%,#EF4444 45%,#7F1D1D 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          display:block; user-select:none; position:relative;
        }
        .e5-g1,.e5-g2 {
          font-size:clamp(7rem,22vw,13rem);
          font-weight:900; line-height:.88; letter-spacing:-.05em;
          position:absolute; top:0; left:0;
          user-select:none; pointer-events:none; opacity:0;
        }
        .e5-g1 {
          background:linear-gradient(135deg,#FCA5A5,#EF4444);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          animation:e5g1 7s 3s infinite;
        }
        .e5-g2 {
          background:linear-gradient(135deg,#fff,#7F1D1D);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          animation:e5g2 7s 3.25s infinite;
        }
        @keyframes e5g1{
          0%,88%,100%{opacity:0;clip-path:inset(0 0 100% 0);transform:translate(0)}
          89%{opacity:1;clip-path:inset(25% 0 55% 0);transform:translate(-5px,2px)}
          90%{clip-path:inset(65% 0 8% 0);transform:translate(5px,-2px)}
          91%{clip-path:inset(10% 0 75% 0);transform:translate(-3px,0)}
          92%{opacity:0}
          95%{opacity:1;clip-path:inset(50% 0 35% 0);transform:translate(4px,0)}
          96%{clip-path:inset(15% 0 65% 0);transform:translate(-4px,2px)}
          97%{opacity:0}
        }
        @keyframes e5g2{
          0%,90%,100%{opacity:0;clip-path:inset(0 0 100% 0);transform:translate(0)}
          91%{opacity:1;clip-path:inset(58% 0 22% 0);transform:translate(5px,-2px)}
          92%{clip-path:inset(18% 0 62% 0);transform:translate(-5px,2px)}
          93%{clip-path:inset(78% 0 5% 0);transform:translate(3px,0)}
          94%{opacity:0}
          96%{opacity:1;clip-path:inset(38% 0 48% 0);transform:translate(-4px,0)}
          97%{clip-path:inset(8% 0 72% 0);transform:translate(4px,-2px)}
          98%{opacity:0}
        }
        .e5-divider {
          display:flex; align-items:center; justify-content:center; gap:.75rem;
          margin:1.5rem 0 2rem;
          animation:e5up .7s .15s cubic-bezier(0.16,1,.3,1) both;
        }
        .e5-dline {
          height:1px; width:56px;
          background:linear-gradient(90deg,transparent,rgba(220,38,38,.45));
        }
        .e5-dline:last-child{background:linear-gradient(90deg,rgba(220,38,38,.45),transparent)}
        .e5-ddot{width:5px;height:5px;border-radius:50%;background:#EF4444;box-shadow:0 0 10px rgba(239,68,68,.7)}
        .e5-h1 {
          font-size:clamp(1.75rem,5vw,2.75rem);
          font-weight:800; line-height:1.1; letter-spacing:-.03em;
          color:#F8FAFC; margin:0 0 1rem;
          animation:e5up .7s .2s cubic-bezier(0.16,1,.3,1) both;
        }
        .e5-p {
          font-size:1.0625rem; color:rgba(148,163,184,.82);
          max-width:400px; margin:0 auto 2.75rem; line-height:1.65;
          animation:e5up .7s .25s cubic-bezier(0.16,1,.3,1) both;
        }
        .e5-btns {
          display:flex; gap:.875rem; justify-content:center; flex-wrap:wrap;
          animation:e5up .7s .32s cubic-bezier(0.16,1,.3,1) both;
        }
        .e5-primary {
          display:inline-flex; align-items:center; gap:.5rem;
          padding:.9rem 2.1rem;
          background:linear-gradient(135deg,#F87171,#EF4444,#B91C1C);
          color:#fff; border-radius:9999px; font-weight:700;
          font-size:.9375rem; border:none; cursor:pointer;
          position:relative; overflow:hidden;
          box-shadow:0 8px 28px -4px rgba(239,68,68,.5);
          transition:transform .25s ease,box-shadow .25s ease;
          font-family:inherit;
        }
        .e5-primary:hover{transform:translateY(-3px);box-shadow:0 16px 36px -4px rgba(239,68,68,.7)}
        .e5-primary:active{transform:translateY(0)}
        .e5-primary::after{
          content:''; position:absolute; inset:0;
          background:linear-gradient(110deg,transparent 25%,rgba(255,255,255,.25) 50%,transparent 75%);
          background-size:200% 100%;
          animation:e5shine 3s linear infinite;
        }
        @keyframes e5shine{from{background-position:200% 0}to{background-position:-200% 0}}
        .e5-ghost {
          display:inline-flex; align-items:center; gap:.5rem;
          padding:.9rem 2.1rem;
          background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.1);
          color:rgba(212,175,55,.9); border-radius:9999px; font-weight:600;
          font-size:.9375rem; text-decoration:none;
          transition:all .25s ease; font-family:inherit;
        }
        .e5-ghost:hover{background:rgba(212,175,55,.08);border-color:rgba(212,175,55,.35);color:#D4AF37;transform:translateY(-3px)}
      `}} />

      <div className="e5-wrap">
        <div className="e5-orb e5-orb1" />
        <div className="e5-orb e5-orb2" />
        <div className="e5-orb e5-orb3" />
        <div className="e5-grid" />

        <div className="e5-body">
          <div className="e5-badge">
            <span className="e5-dot" />
            500 Error
          </div>

          <div className="e5-num-wrap">
            <span className="e5-num">500</span>
            <span className="e5-g1" aria-hidden="true">500</span>
            <span className="e5-g2" aria-hidden="true">500</span>
          </div>

          <div className="e5-divider">
            <div className="e5-dline" />
            <div className="e5-ddot" />
            <div className="e5-dline" />
          </div>

          <h1 className="e5-h1">Ein Fehler ist aufgetreten</h1>
          <p className="e5-p">
            Es tut uns leid, etwas ist schiefgelaufen. Bitte versuchen Sie es
            erneut oder kehren Sie zur Startseite zurück.
          </p>

          <div className="e5-btns">
            <button onClick={reset} className="e5-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
              Erneut versuchen
            </button>
            <Link href="/" className="e5-ghost">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
