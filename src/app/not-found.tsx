import Link from "next/link";

export default function RootNotFound() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .r4-wrap {
          min-height: 100dvh;
          display:flex; align-items:center; justify-content:center;
          padding:4rem 1.5rem;
          background:#050B14;
          overflow:hidden; position:relative;
          font-family:Inter,system-ui,-apple-system,sans-serif;
        }
        .r4-orb {
          position:absolute; border-radius:50%;
          filter:blur(90px); pointer-events:none;
        }
        .r4-orb1{
          width:520px;height:520px;
          background:radial-gradient(circle,rgba(212,175,55,.22) 0%,transparent 70%);
          top:-180px;left:-120px;
          animation:r4o1 14s ease-in-out infinite;
        }
        .r4-orb2{
          width:420px;height:420px;
          background:radial-gradient(circle,rgba(10,25,41,.9) 0%,transparent 70%);
          bottom:-120px;right:-100px;
          animation:r4o2 17s ease-in-out infinite;
        }
        .r4-orb3{
          width:300px;height:300px;
          background:radial-gradient(circle,rgba(212,175,55,.09) 0%,transparent 70%);
          top:60%;right:8%;
          animation:r4o3 11s ease-in-out infinite;
        }
        @keyframes r4o1{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(50px,-70px) scale(1.1)}70%{transform:translate(-30px,40px) scale(.92)}}
        @keyframes r4o2{0%,100%{transform:translate(0,0) scale(1)}35%{transform:translate(-55px,65px) scale(1.12)}70%{transform:translate(25px,-35px) scale(.94)}}
        @keyframes r4o3{0%,100%{transform:translate(0,0)}50%{transform:translate(-35px,45px)}}
        .r4-grid{
          position:absolute;inset:0;
          background-image:linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px);
          background-size:48px 48px;
          -webkit-mask-image:linear-gradient(to bottom,rgba(0,0,0,.55) 0%,transparent 78%);
          mask-image:linear-gradient(to bottom,rgba(0,0,0,.55) 0%,transparent 78%);
          pointer-events:none;
        }
        .r4-body{
          position:relative;z-index:10;
          text-align:center;max-width:620px;width:100%;
          animation:r4up .7s cubic-bezier(0.16,1,.3,1) both;
        }
        @keyframes r4up{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        .r4-badge{
          display:inline-flex;align-items:center;gap:.5rem;
          padding:.35rem 1rem;border-radius:9999px;
          border:1px solid rgba(212,175,55,.22);background:rgba(212,175,55,.06);
          font-size:.68rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;
          color:rgba(212,175,55,.85);margin-bottom:2.5rem;
          animation:r4up .7s .05s cubic-bezier(0.16,1,.3,1) both;
        }
        .r4-dot{
          width:6px;height:6px;border-radius:50%;
          background:#D4AF37;box-shadow:0 0 8px rgba(212,175,55,.9);
          animation:r4dot 2s ease-in-out infinite;
        }
        @keyframes r4dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.65)}}
        .r4-nwrap{
          position:relative;display:inline-block;margin-bottom:.25rem;
          animation:r4up .7s .1s cubic-bezier(0.16,1,.3,1) both;
        }
        .r4-n{
          font-size:clamp(7rem,22vw,13rem);
          font-weight:900;line-height:.88;letter-spacing:-.05em;
          background:linear-gradient(135deg,#fff 0%,#D4AF37 45%,#8B6914 100%);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          display:block;user-select:none;position:relative;
        }
        .r4-g1,.r4-g2{
          font-size:clamp(7rem,22vw,13rem);
          font-weight:900;line-height:.88;letter-spacing:-.05em;
          position:absolute;top:0;left:0;
          user-select:none;pointer-events:none;opacity:0;
        }
        .r4-g1{
          background:linear-gradient(135deg,#FFD700,#D4AF37);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          animation:r4g1 7s 3s infinite;
        }
        .r4-g2{
          background:linear-gradient(135deg,#fff,#8B6914);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          animation:r4g2 7s 3.25s infinite;
        }
        @keyframes r4g1{
          0%,88%,100%{opacity:0;clip-path:inset(0 0 100% 0);transform:translate(0)}
          89%{opacity:1;clip-path:inset(25% 0 55% 0);transform:translate(-5px,2px)}
          90%{clip-path:inset(65% 0 8% 0);transform:translate(5px,-2px)}
          91%{clip-path:inset(10% 0 75% 0);transform:translate(-3px,0)}
          92%{opacity:0}
          95%{opacity:1;clip-path:inset(50% 0 35% 0);transform:translate(4px,0)}
          96%{clip-path:inset(15% 0 65% 0);transform:translate(-4px,2px)}
          97%{opacity:0}
        }
        @keyframes r4g2{
          0%,90%,100%{opacity:0;clip-path:inset(0 0 100% 0);transform:translate(0)}
          91%{opacity:1;clip-path:inset(58% 0 22% 0);transform:translate(5px,-2px)}
          92%{clip-path:inset(18% 0 62% 0);transform:translate(-5px,2px)}
          93%{clip-path:inset(78% 0 5% 0);transform:translate(3px,0)}
          94%{opacity:0}
          96%{opacity:1;clip-path:inset(38% 0 48% 0);transform:translate(-4px,0)}
          97%{clip-path:inset(8% 0 72% 0);transform:translate(4px,-2px)}
          98%{opacity:0}
        }
        .r4-div{
          display:flex;align-items:center;justify-content:center;gap:.75rem;
          margin:1.5rem 0 2rem;
          animation:r4up .7s .15s cubic-bezier(0.16,1,.3,1) both;
        }
        .r4-dl{height:1px;width:56px;background:linear-gradient(90deg,transparent,rgba(212,175,55,.45))}
        .r4-dl:last-child{background:linear-gradient(90deg,rgba(212,175,55,.45),transparent)}
        .r4-dd{width:5px;height:5px;border-radius:50%;background:#D4AF37;box-shadow:0 0 10px rgba(212,175,55,.7)}
        .r4-h1{
          font-size:clamp(1.75rem,5vw,2.75rem);
          font-weight:800;line-height:1.1;letter-spacing:-.03em;
          color:#F8FAFC;margin:0 0 1rem;
          animation:r4up .7s .2s cubic-bezier(0.16,1,.3,1) both;
        }
        .r4-p{
          font-size:1.0625rem;color:rgba(148,163,184,.82);
          max-width:400px;margin:0 auto 2.75rem;line-height:1.65;
          animation:r4up .7s .25s cubic-bezier(0.16,1,.3,1) both;
        }
        .r4-btns{
          display:flex;gap:.875rem;justify-content:center;flex-wrap:wrap;
          animation:r4up .7s .32s cubic-bezier(0.16,1,.3,1) both;
        }
        .r4-primary{
          display:inline-flex;align-items:center;gap:.5rem;
          padding:.9rem 2.1rem;
          background:linear-gradient(135deg,#FBBF24,#D4AF37,#B8860B);
          color:#050B14;border-radius:9999px;font-weight:700;
          font-size:.9375rem;text-decoration:none;
          position:relative;overflow:hidden;
          box-shadow:0 8px 28px -4px rgba(212,175,55,.55);
          transition:transform .25s ease,box-shadow .25s ease;
          font-family:inherit;
        }
        .r4-primary:hover{transform:translateY(-3px);box-shadow:0 16px 36px -4px rgba(212,175,55,.7)}
        .r4-primary:active{transform:translateY(0)}
        .r4-primary::after{
          content:'';position:absolute;inset:0;
          background:linear-gradient(110deg,transparent 25%,rgba(255,255,255,.32) 50%,transparent 75%);
          background-size:200% 100%;
          animation:r4shine 3s linear infinite;
        }
        @keyframes r4shine{from{background-position:200% 0}to{background-position:-200% 0}}
        .r4-ghost{
          display:inline-flex;align-items:center;gap:.5rem;
          padding:.9rem 2.1rem;
          background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);
          color:rgba(212,175,55,.9);border-radius:9999px;font-weight:600;
          font-size:.9375rem;text-decoration:none;
          transition:all .25s ease;font-family:inherit;
        }
        .r4-ghost:hover{background:rgba(212,175,55,.08);border-color:rgba(212,175,55,.35);color:#D4AF37;transform:translateY(-3px)}
      `}} />

      <div className="r4-wrap">
        <div className="r4-orb r4-orb1" />
        <div className="r4-orb r4-orb2" />
        <div className="r4-orb r4-orb3" />
        <div className="r4-grid" />

        <div className="r4-body">
          <div className="r4-badge">
            <span className="r4-dot" />
            404 Error
          </div>

          <div className="r4-nwrap">
            <span className="r4-n">404</span>
            <span className="r4-g1" aria-hidden="true">404</span>
            <span className="r4-g2" aria-hidden="true">404</span>
          </div>

          <div className="r4-div">
            <div className="r4-dl" />
            <div className="r4-dd" />
            <div className="r4-dl" />
          </div>

          <h1 className="r4-h1">Seite nicht gefunden</h1>
          <p className="r4-p">
            Diese Seite existiert nicht oder wurde verschoben.
          </p>

          <div className="r4-btns">
            <Link href="/" className="r4-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Startseite
            </Link>
            <Link href="/#angebot" className="r4-ghost">
              Fahrzeug bewerten
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
