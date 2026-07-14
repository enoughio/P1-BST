"use client";

import { useEffect } from "react";

/**
 * VANGUARD 2026 — Young Leaders' Conference landing page
 *
 * Images are intentionally left blank. Fill in the `photo` / `logo` fields
 * below (or the SPONSOR_LOGO constant) with your image URLs when ready.
 * Empty photos render as a styled placeholder tile.
 */

const SPONSOR_LOGO = "/events/vanguard/mansoravor-logo.png"; // e.g. "/images/mgu-logo.png"
const REGISTRATION_URL = "https://rzp.io/rzp/V4LMMHNH";
const REGISTRATION_QR = "/events/vanguard/qr.jpeg";

const PILLARS = [
  {
    cls: "p1",
    num: "01",
    title: "Sustainability",
    body: "Understanding a greener, more responsible future — and the generation that will demand it.",
  },
  {
    cls: "p2",
    num: "02",
    title: "Artificial Intelligence",
    body: "How AI is reshaping the way young people will learn, work and create.",
  },
  {
    cls: "p3",
    num: "03",
    title: "Leadership",
    body: "The character, communication and ambition that turn students into the leaders of tomorrow.",
  },
];

const SPEAKERS = [
  {
    photo: "/events/vanguard/Dr-Rajeev-Agrawal.jpeg",
    name: "Dr Rajeev Agrawal",
    role: "Motivational Speaker, Success Coach & Business Trainer",
    topic: "The Future of Career & Jobs",
  },
  {
    photo: "/events/vanguard/Mr-Rajesh-Gupta.jpeg",
    name: "Mr Rajesh Gupta, IPS",
    role: "Addl. Director General of Police (Retd.), MP",
    topic: "The True Meaning of Sustainable Development",
  },
  {
    photo: "/events/vanguard/jyoti-pandey.jpeg",
    name: "Mrs Jyoti Pande",
    role: "Psychologist, Life Coach & Storyteller",
    topic: "Storytelling in the Age of AI",
  },
  {
    photo: "/events/vanguard/Mr-Ashish-Das.jpeg",
    name: "Mr Ashish Das",
    role: "AI Educator · Founder, AIcademy · Managing Partner, Blockcept",
    topic: "Embracing AI",
  },
  {
    photo: "/events/vanguard/Mr-Laxmi-Sharan-Mishra.jpeg",
    name: "Mr Laxmi Sharan Mishra",
    role: "Teacher, Mentor, Career Counsellor & Civil Services Exam Strategist",
    topic: "Impact of Geopolitics on Global Careers",
  },
  {
    photo: "/events/vanguard/Aviral-Pawaar.jpg",
    name: "Mr Aviral Pawaar",
    role: "Storytelling & Public Speaking Coach",
    topic: "Public Speaking & Communication in the Age of AI",
  },
];

const AGENDA = [
  { time: "8:30 – 9:00", chip: "brk", icon: "◍", title: "Breakfast & Registration", break: true },
  { time: "9:00 – 9:20", chip: "cer", icon: "★", title: "Inaugural Session", break: true },
  { time: "9:20 – 10:00", chip: "num", icon: "1", session: "Session 1 —", title: "The Future of Career & Jobs", speaker: "Dr Rajeev Agrawal" },
  { time: "10:05 – 10:45", chip: "num", icon: "2", session: "Session 2 —", title: "The True Meaning of Sustainable Development", speaker: "Mr Rajesh Gupta, IPS" },
  { time: "10:45 – 11:00", chip: "perf", icon: "♪", title: "Performance by the members of Young Leaders' Club", break: true },
  { time: "11:00 – 11:40", chip: "num", icon: "3", session: "Session 3 —", title: "Public Speaking & Communication in the Age of AI", speaker: "Mr Aviral Pawaar" },
  { time: "11:45 – 12:25", chip: "num", icon: "4", session: "Session 4 —", title: "Embracing AI", speaker: "Mr Ashish Das" },
  { time: "12:25 – 1:00", chip: "brk", icon: "◍", title: "Lunch Break", break: true },
  { time: "1:00 – 1:40", chip: "num", icon: "5", session: "Session 5 —", title: "Impact of Geopolitics on Global Careers", speaker: "Mr Laxmi Sharan Mishra" },
  { time: "1:45 – 2:25", chip: "num", icon: "6", session: "Session 6 —", title: "Storytelling in the Age of AI", speaker: "Mrs Jyoti Pande" },
  { time: "2:25 – 3:00", chip: "ct", icon: "◆", title: "Storytelling Contest", speaker: "Hosted by YLC members" },
  { time: "3:00 – 3:30", chip: "cer", icon: "★", title: "Awards & Closing Ceremony", break: true },
];

const TEAM = [
  { photo: "/events/vanguard/Sanidhya-Kaushal.jpeg", name: "Sanidhya Kaushal", role: "President", lead: true },
  { photo: "/events/vanguard/Divyansh-Jain.jpeg", name: "Divyansh Jain" },
  { photo: "/events/vanguard/Aryavardhan-Singh.jpeg", name: "Aryavardhan Singh" },
  { photo: "/events/vanguard/Ariya-Prashanth.jpeg", name: "Ariya Prashanth" },
  { photo: "/events/vanguard/Apoorv-Sachan.jpeg", name: "Apoorv Sachan" },
  { photo: "/events/vanguard/Anahita-Singh.jpeg", name: "Anahita Singh" },
  { photo: "/events/vanguard/Varenyam-Tiwari.jpeg", name: "Varenyam Tiwari" },
  { photo: "/events/vanguard/Kavyansh-Parwat.jpeg", name: "Kavyansh Parwat" },
  { photo: "/events/vanguard/Kavya-Yadav.jpeg", name: "Kavya Yadav" },
  { photo: "/events/vanguard/Kavish-Sahu.jpeg", name: "Kavish Sahu" },
  { photo: "/events/vanguard/Kanishka-Jain.jpeg", name: "Kanishka Jain" },
  { photo: "/events/vanguard/Nitya-Yadav.jpeg", name: "Nitya Yadav" },
  { photo: "/events/vanguard/Sidra-Khan.jpeg", name: "Sidra Khan" },
  { photo: "/events/vanguard/Arnav-Sachan.jpeg", name: "Arnav Sachan" },
  { photo: "/events/vanguard/Aditi-Tiwari.jpeg", name: "Aditi Tiwari" },
  { photo: "/events/vanguard/Aditi-Matta.jpeg", name: "Aditi Matta" },
  { photo: "/events/vanguard/Ranveer-Singh-Gandhi.jpeg", name: "Ranveer Singh Gandhi" },
  { photo: "/events/vanguard/Mehransh-Singh-Saluja.jpeg", name: "Mehransh Singh Saluja" },
  { photo: "/events/vanguard/Yashahwini-Tiwari.jpeg", name: "Yashahwini Tiwari" },
];

export default function Vanguard2026() {
  useEffect(() => {
    document.documentElement.classList.add("js-on");
    const reveals = Array.from(document.querySelectorAll(".reveal"));
    const show = (el) => el.classList.add("in");

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              show(e.target);
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
      );
      reveals.forEach((el) => io.observe(el));

      // Safety net: reveal anything still hidden after 2.5s
      const t = setTimeout(
        () => reveals.forEach((el) => !el.classList.contains("in") && show(el)),
        2500
      );
      return () => {
        io.disconnect();
        clearTimeout(t);
      };
    } else {
      reveals.forEach(show);
    }
  }, []);

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <header className="nav">
        <div className="nav-inner">
          <a className="brandmark" href="#top">
            <span className="tile">YLC</span>
            <span className="bt">
              VANGUARD 2026<small>Young Leaders&apos; Club</small>
            </span>
          </a>
          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#speakers">Speakers</a>
            <a href="#agenda">Agenda</a>
            <a href="#team">Team</a>
            <a href="#register" className="nav-cta">Register</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="disc" />
        <div className="disc2" />
        <div className="ring" />
        <div className="hero-inner">
          <div className="kicker">
            <b>Young Leaders&apos; Club</b> presents · A Young Leaders&apos; Conference
          </div>
          <h1 className="display">
            VANGUARD<br />
            <span className="yr-wrap">
              <span className="yr">2026</span>
              
              <div className="flex flex-col pt-1">

              {SPONSOR_LOGO && <img className="yr-logo" src={SPONSOR_LOGO} alt="Mansarovar Global University" />}
              <div className="test ">Brought to you by</div>
            </div>
            </span>
          </h1>
          <div className="conf">One day. The city&apos;s young leaders, on the stage.</div>
          <div className="theme">
            Theme: <b>AI, Sustainability &amp; the Future of Leadership</b>
          </div>

          <div className="hero-facts">
            <div className="hero-fact">
              <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              <span className="fv">Sun, 26 July 2026<small>8:30 AM – 3:30 PM</small></span>
            </div>
            <div className="hero-fact">
              <svg viewBox="0 0 24 24"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
              <span className="fv">Ravindra Bhawan<small>Bhopal, Madhya Pradesh</small></span>
            </div>
            <div className="hero-fact">
              <svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 5.5a3.2 3.2 0 0 1 0 6M18.5 20a5.5 5.5 0 0 0-3-4.9" /></svg>
              <span className="fv">Ages 10–17<small>Students of Bhopal</small></span>
            </div>
          </div>

          <div className="hero-cta">
            <a href="#register" className="btn-primary">Register your seat</a>
            <a href="#speakers" className="btn-ghost">See the speakers</a>
          </div>

          <div className="hero-sponsor">
            <span className="lbl">Brought to you by</span>
            <span className="chip">
              {SPONSOR_LOGO && <img src={SPONSOR_LOGO} alt="Mansarovar Global University" />}
            </span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="wrap">
          <div className="about-grid">
            <div>
              <div className="eyebrow">About the conference</div>
              <p className="about-lead reveal">
                A full-scale city conference — <span className="hl">designed, organised and run by children aged 10 to 16.</span>
              </p>
            </div>
            <div className="about-body reveal">
              <p>
                VANGUARD 2026 is a full-day leadership conference for students aged 10–17, drawn from the leading schools of Bhopal. It brings together accomplished speakers, live sessions, activities and a signature storytelling contest — all under the theme of the future of Sustainability, AI and Leadership.
              </p>
              <p>
                What makes it different is simple: <b>the members of the Young Leaders&apos; Club build it themselves</b>. From speakers and programming to marketing, registration and logistics, young people lead every part of the day, with adult mentors staying in the wings. Students leave better informed about the world ahead, more confident on stage, and clearer on what comes next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THEME PILLARS */}
      <section className="pillars">
        <div className="wrap">
          <div className="eyebrow">The theme, in three parts</div>
          <h2 className="section-title display">
            Built for the <span className="hl">world these students will lead</span>.
          </h2>
          <div className="pillar-grid">
            {PILLARS.map((p) => (
              <div key={p.num} className={`pillar ${p.cls} reveal`}>
                <span className="porb" />
                <span className="pnum">{p.num}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPEAKERS */}
      <section className="speakers" id="speakers">
        <div className="wrap">
          <div className="eyebrow">Voices on stage</div>
          <h2 className="section-title display">
            Meet the <span className="hl">Speakers</span>
          </h2>
          <div className="speaker-grid">
            {SPEAKERS.map((s) => (
              <article key={s.name} className="speaker reveal">
                <div className="speaker-photo">
                  {s.photo && <img src={s.photo} alt={s.name} />}
                </div>
                <h3 className="speaker-name">{s.name}</h3>
                <p className="speaker-role">{s.role}</p>
                <p className="speaker-topic">{s.topic}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AGENDA */}
      <section className="agenda" id="agenda">
        <div className="wrap">
          <div className="eyebrow">Programme · Run of Day</div>
          <h2 className="section-title display">
            The full <span className="hl">day</span>.
          </h2>
          <div className="ag-list">
            {AGENDA.map((row, i) => (
              <div key={i} className={`ag-row ${row.break ? "ag-break" : ""} reveal`}>
                <div className="ag-time">{row.time}</div>
                <span className={`ag-chip ${row.chip}`}>{row.icon}</span>
                <div className="ag-body">
                  <div className="ag-title">
                    {row.session && <span className="ag-session">{row.session} </span>}
                    {row.title}
                  </div>
                  {row.speaker && <div className="ag-speaker">{row.speaker}</div>}
                </div>
              </div>
            ))}
          </div>
          <p className="ag-note">
            <b>All speakers confirmed.</b> Short buffers are built in between sessions for smooth transitions; timings are indicative and may be lightly adjusted on the day.
          </p>
        </div>
      </section>

      {/* TEAM */}
      <section className="team" id="team">
        <div className="torb" />
        <div className="wrap">
          <div className="eyebrow">The people behind it</div>
          <h2 className="section-title display">
            Meet the <span className="hl">Organising Team</span>
          </h2>
          <p className="team-intro">
            Every part of VANGUARD 2026 is led by the members of the <b>Young Leaders&apos; Club</b> — a youth leadership programme for students aged 10–17, and an initiative of the Bharat Storytellers Foundation, Bhopal. Every name below is a member of the club.
          </p>
          <div className="team-grid">
            {TEAM.map((m) => (
              <div key={m.name} className={`member ${m.lead ? "lead" : ""} reveal`}>
                <div className="member-photo">
                  {m.photo && <img src={m.photo} alt={m.name} />}
                </div>
                <span className="member-name">{m.name}</span>
                {m.role && <span className="member-role">{m.role}</span>}
              </div>
            ))}
          </div>
          <div className="team-orgby">
            <div className="l">Organised by</div>
            <div className="v">Young Leaders&apos; Club</div>
          </div>
        </div>
      </section>

      {/* REGISTER */}
      <section className="cta" id="register">
        <div className="wrap">
          <div className="cta-card">
            <span className="corb a" />
            <span className="corb b" />
            <h2 className="display">
              Be in the room where it <span className="hl">happens</span>.
            </h2>
            <p>
              VANGUARD 2026 is a ticketed event for students aged 10–17. Seats are limited — reserve yours and join a day built by Bhopal&apos;s youngest leaders.
            </p>
            <div className="cta-actions">
                <a href={REGISTRATION_URL} target="_blank" rel="noreferrer" className="btn-indigo" id="register-link">Register now</a>
              <a
                href="https://instagram.com/youngleaders.club"
                className="btn-ghost"
                style={{ borderColor: "var(--line)", color: "var(--indigo)" }}
              >
                Follow @youngleaders.club
              </a>
            </div>
              <div className="cta-qr">
                <a href={REGISTRATION_URL} target="_blank" rel="noreferrer" className="cta-qr-box">
                  <img src={REGISTRATION_QR} alt="Registration QR code" />
                </a>
                <p className="cta-qr-text">Scan the QR code to register instantly.</p>
              </div>
            <p className="cta-meta">Sunday, 26 July 2026 · 8:30 AM – 3:30 PM · Ravindra Bhawan, Bhopal</p>
          </div>
        </div>
      </section>
     

      {/* FOOTER */}
      <footer className="foot">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="foot-brand">
                <span className="tile">YLC</span>
                <span className="ft">
                  Young Leaders&apos; Club
                  <small>An initiative of the Bharat Storytellers Foundation · Bhopal</small>
                </span>
              </div>
            </div>
            <div className="foot-contact">
              <div>
                <a href="https://instagram.com/youngleaders.club">@youngleaders.club</a>
              </div>
              <div>Ravindra Bhawan, Bhopal, Madhya Pradesh</div>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Young Leaders&apos; Club · Bharat Storytellers Foundation</span>
            <span>VANGUARD 2026 · Brought to you by Mansarovar Global University</span>
          </div>
        </div>
      </footer>
    </>
  );
}

const CSS = `
  :root{
    --indigo:#2E3192; --yellow:#FFD23F; --coral:#FF6B6B; --mint:#4ECDC4;
    --cloud:#F7F7F2; --ink:#1A1A2E; --grey:#5A5A6E; --line:rgba(46,49,146,.14);
    --maxw:1160px;
  }
  *{margin:0;padding:0;box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{font-family:'Inter',system-ui,-apple-system,Helvetica,Arial,sans-serif;background:var(--cloud);color:var(--ink);-webkit-font-smoothing:antialiased;line-height:1.5;}
  .display{font-family:'Bricolage Grotesque','Inter',sans-serif;font-weight:800;letter-spacing:-.025em;}
  img{max-width:100%;display:block}
  a{color:inherit;text-decoration:none}
  .wrap{max-width:var(--maxw);margin:0 auto;padding:0 24px;}

  .eyebrow{display:inline-flex;align-items:center;gap:12px;font-size:13px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:var(--indigo);}
  .eyebrow::before{content:"";width:30px;height:3px;background:var(--yellow);border-radius:2px;}
  .eyebrow.light{color:var(--yellow);}
  .eyebrow.light::before{background:var(--yellow);}
  .section-title{font-size:clamp(30px,5vw,46px);line-height:1.04;margin-top:16px;}
  .section-title .hl{color:var(--indigo);}

  /* NAV */
  header.nav{position:sticky;top:0;z-index:50;background:rgba(46,49,146,.96);backdrop-filter:blur(8px);border-bottom:1px solid rgba(255,255,255,.1);}
  .nav-inner{max-width:var(--maxw);margin:0 auto;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;}
  .brandmark{display:flex;align-items:center;gap:12px;color:#fff;}
  .brandmark .tile{width:38px;height:38px;border-radius:9px;background:var(--yellow);color:var(--indigo);font-weight:700;font-size:16px;display:flex;align-items:center;justify-content:center;}
  .brandmark .bt{font-weight:700;font-size:16px;}
  .brandmark .bt small{display:block;font-size:10.5px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.6);}
  .nav-links{display:flex;align-items:center;gap:26px;}
  .nav-links a{color:rgba(255,255,255,.82);font-size:14px;font-weight:600;transition:color .2s;}
  .nav-links a:hover{color:var(--yellow);}
  .nav-cta{background:var(--yellow);color:var(--indigo)!important;padding:9px 18px;border-radius:24px;font-weight:800!important;font-size:13.5px!important;transition:transform .15s;}
  .nav-cta:hover{transform:translateY(-1px);}
  @media(max-width:820px){.nav-links a:not(.nav-cta){display:none}}

  /* HERO */
  .hero{position:relative;background:var(--indigo);color:#fff;overflow:hidden;padding:20px 0 96px;}
  .hero .disc{position:absolute;top:-160px;right:-140px;width:520px;height:520px;border-radius:50%;background:var(--yellow);opacity:1;}
  .hero .disc2{position:absolute;top:-80px;right:-60px;width:300px;height:300px;border-radius:50%;background:var(--coral);}
  .hero .ring{position:absolute;bottom:-140px;left:-120px;width:360px;height:360px;border-radius:50%;border:44px solid rgba(78,205,196,.18);}
  .hero-inner{position:relative;z-index:2;max-width:var(--maxw);margin:0 auto;padding:0 24px;}
  .hero .kicker{font-size:14px;font-weight:600;letter-spacing:.02em;color:rgba(255,255,255,.72);margin-bottom:10px;}
  .hero .kicker b{color:var(--yellow);font-weight:700;}
  .hero h1{font-size:clamp(58px,11.7vw,135px);line-height:.84;}
  .hero h1 .yr-wrap{display:inline-flex;align-items:center;gap:16px;flex-wrap:wrap;}
  .hero h1 .yr{color:var(--yellow);}
  .hero h1 .yr-logo{display:none;height:44px;width:auto;object-fit:contain;vertical-align:middle;}
  .test {
  display:none;
  }
  .hero .conf{font-family:'Bricolage Grotesque',sans-serif;font-weight:500;font-size:clamp(18px,2.6vw,26px);margin-top:18px;color:#fff;}
  .hero .theme{display:inline-block;margin-top:22px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);border-radius:30px;padding:10px 20px;font-size:15px;font-weight:600;}
  .hero .theme b{color:var(--yellow);}
  .hero-facts{display:flex;flex-wrap:wrap;gap:14px;margin-top:34px;}
  .hero-fact{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:14px;padding:14px 18px;}
  .hero-fact svg{width:22px;height:22px;stroke:var(--yellow);fill:none;stroke-width:2;flex:none;}
  .hero-fact .fv{font-weight:700;font-size:15px;}
  .hero-fact .fv small{display:block;font-weight:500;font-size:12.5px;color:rgba(255,255,255,.65);}
  .hero-cta{display:flex;flex-wrap:wrap;gap:14px;align-items:center;margin-top:34px;}
  .btn-primary{background:var(--yellow);color:var(--indigo);font-weight:800;font-size:15px;padding:15px 30px;border-radius:30px;transition:transform .15s,box-shadow .2s;box-shadow:0 10px 30px -8px rgba(255,210,63,.5);}
  .btn-primary:hover{transform:translateY(-2px);box-shadow:0 16px 36px -8px rgba(255,210,63,.6);}
  .btn-ghost{border:1.5px solid rgba(255,255,255,.35);color:#fff;font-weight:700;font-size:15px;padding:14px 26px;border-radius:30px;transition:border-color .2s,background .2s;}
  .btn-ghost:hover{border-color:#fff;background:rgba(255,255,255,.08);}
  .hero-sponsor{margin-top:44px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;}
  .hero-sponsor .lbl{font-size:12px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--yellow);}
  .hero-sponsor .chip{background:#fff;border-radius:12px;padding:12px 20px;display:flex;align-items:center;min-width:120px;min-height:58px;}
  .hero-sponsor .chip img{height:34px;width:auto;}
  @media(max-width:640px){
    .hero{color:#fff;}
    .hero .kicker{color:#ffff;}
    .hero .kicker b{color: #ffff ;}
    .hero h1 .yr-wrap{gap:10px;}
    .hero h1 .yr{color: #ffff;}
    .hero h1 .yr-logo{display:inline-block; padding-left: 26px; padding-top : 5px ; }
    .hero .conf{color:#fff;}
    .hero .theme{border-color:rgba(255,255,255,.18);background:rgba(255,255,255,.1);}
    .test { 
    display : inline-block; font-size : 12px; color : #3a74b6; padding-left: 26px; letter-spacing: .10em; padding-top : 3px;
    }
    .hero .theme b{color: #ffff; font : 12px }
    .hero-fact{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.14);}
    .hero-fact svg{stroke:var(--yellow);}
    .hero-fact .fv small{color:rgba(255,255,255,.65);}
    .btn-ghost{border-color:rgba(255,255,255,.35);color:#fff;}
    .btn-ghost:hover{background:rgba(255,255,255,.08);}
    .hero-sponsor .lbl{color:var(--yellow);}
    .hero-sponsor{display:none;}
  }

  /* ABOUT */
  .about{padding:88px 0;}
  .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;}
  .about-lead{font-family:'Bricolage Grotesque',sans-serif;font-weight:600;font-size:clamp(22px,3vw,30px);line-height:1.28;letter-spacing:-.01em;}
  .about-lead .hl{color:var(--indigo);}
  .about-body{font-size:16.5px;color:var(--grey);line-height:1.7;}
  .about-body p+p{margin-top:16px;}
  .about-body b{color:var(--ink);font-weight:700;}
  @media(max-width:820px){.about-grid{grid-template-columns:1fr;gap:28px}}

  /* THEME PILLARS */
  .pillars{padding:20px 0 88px;}
  .pillar-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px;}
  .pillar{border-radius:20px;padding:34px 30px;color:#fff;position:relative;overflow:hidden;min-height:230px;display:flex;flex-direction:column;justify-content:flex-end;}
  .pillar.p1{background:var(--mint);color:var(--ink);}
  .pillar.p2{background:var(--indigo);}
  .pillar.p3{background:var(--coral);}
  .pillar .pnum{position:absolute;top:26px;left:30px;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:22px;opacity:.5;}
  .pillar .porb{position:absolute;top:-40px;right:-40px;width:150px;height:150px;border-radius:50%;background:rgba(255,255,255,.14);}
  .pillar.p1 .porb{background:rgba(26,26,46,.08);}
  .pillar h3{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:26px;letter-spacing:-.02em;}
  .pillar p{font-size:14.5px;line-height:1.5;opacity:.92;margin-top:10px;}
  @media(max-width:820px){.pillar-grid{grid-template-columns:1fr}}

  /* SPEAKERS */
  .speakers{padding:88px 0;background:#fff;}
  .speaker-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px;}
  .speaker{background:var(--cloud);border:1px solid var(--line);border-radius:20px;padding:30px 24px 26px;text-align:center;transition:transform .2s,box-shadow .2s;}
  .speaker:hover{transform:translateY(-4px);box-shadow:0 18px 40px -18px rgba(46,49,146,.3);}
  .speaker-photo{width:132px;height:132px;margin:0 auto;border-radius:50%;overflow:hidden;outline:3px solid var(--indigo);outline-offset:3px;background:#e6e6ef;}
  .speaker-photo img{width:100%;height:100%;object-fit:cover;}
  .speaker-name{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:20px;margin-top:22px;}
  .speaker-role{font-size:13px;color:var(--grey);line-height:1.4;margin-top:6px;min-height:36px;}
  .speaker-topic{font-size:14.5px;font-weight:700;color:var(--indigo);line-height:1.35;margin-top:14px;padding-top:14px;border-top:1px solid var(--line);}
  @media(max-width:820px){.speaker-grid{grid-template-columns:1fr 1fr;gap:16px}}
  @media(max-width:520px){.speaker-grid{grid-template-columns:1fr}}

  /* AGENDA */
  .agenda{padding:88px 0;}
  .ag-list{margin-top:44px;background:#fff;border:1px solid var(--line);border-radius:20px;padding:12px 28px;box-shadow:0 12px 40px -24px rgba(46,49,146,.3);}
  .ag-row{display:flex;align-items:center;gap:20px;padding:15px 0;border-bottom:1px solid var(--line);}
  .ag-row:last-child{border-bottom:0;}
  .ag-time{flex:0 0 108px;font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:15px;color:var(--indigo);}
  .ag-chip{flex:none;width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:14px;color:#fff;background:var(--indigo);}
  .ag-chip.brk{background:transparent;border:1.5px dashed rgba(46,49,146,.4);color:var(--indigo);}
  .ag-chip.cer{background:var(--mint);color:var(--ink);}
  .ag-chip.perf{background:var(--yellow);color:var(--indigo);}
  .ag-chip.ct{background:var(--coral);}
  .ag-body{flex:1;min-width:0;}
  .ag-title{font-weight:700;font-size:16px;line-height:1.3;}
  .ag-session{color:var(--indigo);font-weight:800;}
  .ag-speaker{font-size:13.5px;color:var(--grey);margin-top:3px;}
  .ag-break .ag-title{font-weight:600;color:var(--grey);}
  .ag-note{margin-top:18px;font-size:13.5px;color:var(--grey);text-align:center;}
  .ag-note b{color:var(--indigo);}
  @media(max-width:640px){.ag-time{flex-basis:82px;font-size:13px}.ag-title{font-size:14.5px}}

  /* TEAM */
  .team{padding:88px 0;background:var(--indigo);color:#fff;position:relative;overflow:hidden;}
  .team .torb{position:absolute;top:-100px;right:-100px;width:320px;height:320px;border-radius:50%;background:rgba(255,210,63,.1);}
  .team .eyebrow{color:var(--yellow);} .team .eyebrow::before{background:var(--yellow);}
  .team .section-title{color:#fff;} .team .section-title .hl{color:var(--yellow);}
  .team-intro{font-size:16.5px;color:rgba(255,255,255,.8);line-height:1.7;max-width:760px;margin-top:16px;position:relative;z-index:2;}
  .team-intro b{color:#fff;font-weight:700;}
  .team-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:26px 16px;margin-top:52px;position:relative;z-index:2;}
  .member{display:flex;flex-direction:column;align-items:center;text-align:center;}
  .member-photo{width:92px;height:92px;border-radius:50%;overflow:hidden;outline:2px solid rgba(255,255,255,.25);outline-offset:2px;background:#3a3ea6;}
  .member.lead .member-photo{outline:3px solid var(--yellow);}
  .member-photo img{width:100%;height:100%;object-fit:cover;}
  .member-name{font-size:13px;font-weight:700;margin-top:12px;line-height:1.25;}
  .member.lead .member-name{color:var(--yellow);}
  .member-role{font-size:11px;font-weight:700;color:var(--coral);margin-top:3px;letter-spacing:.04em;text-transform:uppercase;}
  .member.lead .member-role{color:#fff;background:var(--coral);padding:2px 8px;border-radius:10px;}
  .team-orgby{text-align:center;margin-top:56px;position:relative;z-index:2;}
  .team-orgby .l{font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.6);}
  .team-orgby .v{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:24px;color:var(--yellow);margin-top:6px;}
  @media(max-width:900px){.team-grid{grid-template-columns:repeat(4,1fr)}}
  @media(max-width:560px){.team-grid{grid-template-columns:repeat(3,1fr)}}

  /* REGISTER / CTA */
  .cta{padding:88px 0;}
  .cta-card{background:#fff;border:1px solid var(--line);border-radius:28px;padding:56px 48px;text-align:center;position:relative;overflow:hidden;box-shadow:0 24px 60px -30px rgba(46,49,146,.4);}
  .cta-card .corb{position:absolute;width:200px;height:200px;border-radius:50%;opacity:.12;}
  .cta-card .corb.a{background:var(--yellow);top:-70px;left:-50px;}
  .cta-card .corb.b{background:var(--coral);bottom:-80px;right:-40px;}
  .cta-card h2{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:clamp(28px,4.5vw,42px);letter-spacing:-.02em;position:relative;}
  .cta-card h2 .hl{color:var(--indigo);}
  .cta-card p{font-size:16.5px;color:var(--grey);margin-top:14px;max-width:560px;margin-left:auto;margin-right:auto;position:relative;}
  .cta-actions{display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:30px;position:relative;}
  .btn-indigo{background:var(--indigo);color:#fff;font-weight:800;font-size:15px;padding:15px 32px;border-radius:30px;transition:transform .15s;}
  .btn-indigo:hover{transform:translateY(-2px);}
  .cta-qr{margin-top:28px;display:flex;flex-direction:column;align-items:center;gap:12px;position:relative;}
  .cta-qr-box{display:inline-flex;padding:12px;background:#fff;border:1px solid var(--line);border-radius:20px;box-shadow:0 14px 34px -24px rgba(46,49,146,.35);}
  .cta-qr-box img{width:160px;height:160px;object-fit:cover;}
  .cta-qr-text{font-size:14px;color:var(--grey);font-weight:600;}
  .cta-meta{margin-top:26px;font-size:14px;color:var(--grey);position:relative;}

  /* FOOTER */
  footer.foot{background:var(--ink);color:rgba(255,255,255,.75);padding:52px 0 40px;}
  .foot-grid{display:flex;justify-content:space-between;gap:32px;flex-wrap:wrap;align-items:flex-start;}
  .foot-brand{display:flex;align-items:center;gap:14px;color:#fff;}
  .foot-brand .tile{width:44px;height:44px;border-radius:10px;background:var(--yellow);color:var(--indigo);font-weight:700;font-size:18px;display:flex;align-items:center;justify-content:center;}
  .foot-brand .ft{font-weight:700;font-size:17px;}
  .foot-brand .ft small{display:block;font-size:12px;font-weight:500;color:rgba(255,255,255,.55);margin-top:2px;}
  .foot-contact{font-size:14px;line-height:1.8;}
  .foot-contact a:hover{color:var(--yellow);}
  .foot-bottom{margin-top:36px;padding-top:24px;border-top:1px solid rgba(255,255,255,.12);display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;font-size:13px;color:rgba(255,255,255,.5);}

  /* REVEAL ANIM */
  .reveal{opacity:1;transform:none;}
  .js-on .reveal{opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease;}
  .js-on .reveal.in{opacity:1;transform:none;}
  @media(prefers-reduced-motion:reduce){.js-on .reveal{opacity:1;transform:none;transition:none}html{scroll-behavior:auto}}

  :focus-visible{outline:3px solid var(--yellow);outline-offset:2px;border-radius:4px;}
`;
