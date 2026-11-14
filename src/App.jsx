import { useEffect, useRef, useState } from "react";

// TODO: replace "#" with the real URLs
const LINKS = { github: "https://github.com/TRIVEDIDWIJESH", linkedin: "https://www.linkedin.com/in/dwijesh-trivedi-a88622239/"};
const EMAIL = "dwijesh33@gmail.com";
const PHONE = "+91 9426433083";

const NAV = [
  ["about", "About"],
  ["skills", "Skills"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["contact", "Contact"],
];

const SKILLS = [
  ["Programming languages", ["C++", "Java"]],
  ["Game development and tools", ["Unreal Engine 5", "Blueprint Visual Scripting"]],
  ["Game development", ["Weapon Systems", "Gameplay Mechanics", "Player Systems", "UI Systems", "Game Logic"]],
  ["Core skills", ["Gameplay Mechanics", "UI Systems", "Game Design", "Problem Solving"]],
  ["Additional knowledge", ["Basic Debugging", "Gameplay Testing Awareness", "Git", "GitLab", "Unreal Engine Plugins"]],
  ["Soft skills", ["Creativity", "Communication", "Team Work", "Adaptability"]],
];

const EXPERIENCE = [
  "Leading the development of a new game project, overseeing gameplay implementation and coordinating development activities.",
  "Co-leading the Beyonders project, contributing to game development, feature implementation, and collaborative problem-solving.",
  "Gained hands-on experience with weapon systems, Unreal Engine plugins, and diverse gameplay mechanics.",
  "Analyzing gameplay systems and mechanics from various games to understand design approaches and improve gameplay implementation.",
  "Working with Git and GitLab for version control, branch management, collaboration, and code integration.",
  "Developing, debugging, and refining gameplay features using Unreal Engine and Blueprints.",
  "Collaborating with team members to implement features and improve overall gameplay experience.",
];

const NEXUS = [
  "Developed a first-person zombie survival game using Unreal Engine 5 and Blueprints, implementing player movement, shooting, reloading, and weapon inspection systems.",
  "Designed and integrated weapon mechanics, gameplay interactions, and UI systems for health, ammunition, and player feedback.",
  "Implemented enemy AI and combat-related gameplay logic to support immersive zombie encounters.",
  "Debugged and optimized gameplay systems, improving logic efficiency, responsiveness, and overall gameplay stability.",
  "Diagnosed and resolved gameplay and performance-related issues in packaged builds, ensuring consistent functionality between the editor and standalone game.",
  "Integrated gameplay features across systems and refined mechanics through testing and iterative development.",
];

const PROJECTS = [
  { name: "City Racer", tag: "3D racing game", tech: ["Unreal Engine", "Blueprints"], icon: "🏎️", hue: 205,
    text: ["Built a 3D racing game using Unreal Engine Blueprints.", "Implemented checkpoints, crash physics, and environment design."] },
  { name: "RetroSnake", tag: "Arcade game", tech: ["C++", "Raylib"], icon: "🐍", hue: 150,
    text: ["Developed a modern snake game using C++ and Raylib."] },
  { name: "Flappy Bird", tag: "Arcade game", tech: ["Java"], icon: "🐤", hue: 45,
    text: ["Created a Java-based game with collision detection and smooth mechanics."] },
  { name: "NSS CONNECT", tag: "UI design", tech: ["Figma"], icon: "🎨", hue: 285,
    text: ["Designed UI for a university portal using Figma."] },
];

const ROLES = ["Game Developer", "Unreal Engine 5 Developer", "Weapon Systems Builder", "Blueprint Scripter"];

function Hero() {
  const MAX = 12;
  const ref = useRef(null);
  const [ammo, setAmmo] = useState(MAX);
  const [holes, setHoles] = useState([]);
  const [role, setRole] = useState(0);
  const [text, setText] = useState("");
  const [reloading, setReloading] = useState(false);

  // typing effect
  useEffect(() => {
    const full = ROLES[role];
    let i = 0;
    const type = setInterval(() => {
      i++;
      setText(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(type);
        setTimeout(() => setRole((r) => (r + 1) % ROLES.length), 1800);
      }
    }, 70);
    return () => clearInterval(type);
  }, [role]);

  const reload = () => {
    if (reloading || ammo === MAX) return;
    setReloading(true);
    setTimeout(() => { setAmmo(MAX); setReloading(false); setHoles([]); }, 900);
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key.toLowerCase() === "r") reload(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const fire = (e) => {
    if (e.target.closest("a,button") || ammo === 0 || reloading) return;
    const r = ref.current.getBoundingClientRect();
    setHoles((h) => [...h.slice(-29), { id: Date.now() + Math.random(), x: e.clientX - r.left, y: e.clientY - r.top }]);
    setAmmo((a) => a - 1);
  };

  return (
    <section id="home" className="hero" ref={ref} onClick={fire}>
      {holes.map((h) => <span key={h.id} className="hole" style={{ left: h.x, top: h.y }} />)}
      <div className="hero-inner">
        <p className="hello">Hi, I'm</p>
        <h1>Dwijesh Trivedi</h1>
        <p className="role">{text}<span className="caret" /></p>
        <p className="lede">I build games in Unreal Engine: weapon mechanics, player systems and the UI that tells players what's happening.</p>
        <div className="cta">
          <a className="btn primary" href="#projects">View projects</a>
          <a className="btn" href="#contact">Get in touch</a>
        </div>
      </div>
      <div className="hud" aria-live="polite">
        <div className="ammo"><b>{reloading ? "--" : String(ammo).padStart(2, "0")}</b><span>/ {MAX}</span></div>
        <button className="btn small" onClick={reload} disabled={reloading || ammo === MAX}>{reloading ? "Reloading…" : "Reload (R)"}</button>
        <p>{ammo === 0 ? "Out of ammo. Press R to reload." : "Click anywhere to shoot."}</p>
      </div>
    </section>
  );
}

export default function App() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = ["home", ...NAV.map((n) => n[0])];
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); el && io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header className="nav">
        <a href="#home" className="logo" onClick={() => setOpen(false)}>DT<i /></a>
        <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
        <nav className={open ? "links open" : "links"}>
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? "on" : ""} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
      </header>

      <main>
        <Hero />

        <section id="about" className="sec">
          <h2>About</h2>
          <div className="about-grid">
            <div>
              <p className="big">Game Developer specializing in Unreal Engine with hands-on experience in gameplay systems, weapon mechanics, UI implementation, and game development workflows.</p>
              <p>Experienced in leading game development projects and co-leading collaborative development initiatives. Familiar with Unreal Engine plugins, gameplay analysis, and version control using Git and GitLab. Passionate about developing engaging gameplay experiences and continuously improving technical and game design skills.</p>
            </div>
            <div className="stack">
              <div className="panel">
                <h3>Education</h3>
                <div className="edu"><b>Charusat University</b><span>B.Tech in Computer Engineering</span><em>2024 – Present · CGPA 8.18</em></div>
                <div className="edu"><b>Dr. Subhash Technical Campus</b><span>Diploma in Computer Engineering</span><em>2021 – 2024 · CGPA 8.60</em></div>
              </div>
              <div className="panel">
                <h3>Certificates</h3>
                <ul className="plain"><li>Self-learning in Unreal Engine and Game Development</li><li>UI and UX Design using Figma</li></ul>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="sec alt">
          <h2>Skills</h2>
          <div className="skill-grid">
            {SKILLS.map(([title, items]) => (
              <div className="panel" key={title}>
                <h3>{title}</h3>
                <div className="chips">{items.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="sec">
          <h2>Experience</h2>
          <div className="timeline">
            <div className="tl-dot" />
            <div className="panel">
              <div className="exp-head">
                <div><h3>Unreal Engine Intern</h3><p className="muted">Akiyam Solutions Pvt. Ltd.</p></div>
                <span className="badge">Dec 2025 – Present</span>
              </div>
              <ul>{EXPERIENCE.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </div>
        </section>

        <section id="projects" className="sec alt">
          <h2>Projects</h2>
          <article className="featured">
            {/* <div className="feat-art" aria-hidden="true"><span>NEXUS</span></div> */}

            {/* <div className="feat-art" style={{ position: "relative" }}>
  <img
    src="/nexus.jpeg"
    alt="NEXUS – FPS zombie survival game screenshot"
    loading="lazy"
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
  /> */}
      <div className="feat-art" role="img" aria-label="NEXUS Showdown title screen with zombies at the window" />
            <div className="feat-body">
              <p className="muted">FPS zombie survival game</p>
              <h3>NEXUS</h3>
              <div className="chips"><span className="chip">Unreal Engine 5</span><span className="chip">Blueprints</span></div>
              <ul>{NEXUS.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </article>
          <div className="proj-grid">
            {PROJECTS.map((p) => (
              <article className="card" key={p.name} style={{ "--h": p.hue }}>
                <div className="card-art" aria-hidden="true">{p.icon}</div>
                <div className="card-body">
                  <p className="muted">{p.tag}</p>
                  <h3>{p.name}</h3>
                  <ul>{p.text.map((t) => <li key={t}>{t}</li>)}</ul>
                  <div className="chips">{p.tech.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="sec">
          <h2>Contact</h2>
          <p className="big narrow">Want to talk about gameplay, a project, or an opening? Send a message.</p>
          <div className="contact-grid">
            <a className="panel link" href={`mailto:${EMAIL}`}><span className="muted">Email</span><b>{EMAIL}</b></a>
            <a className="panel link" href={`tel:${PHONE.replace(/\s/g, "")}`}><span className="muted">Phone</span><b>{PHONE}</b></a>
            <a className="panel link" href={LINKS.github} target="_blank" rel="noreferrer"><span className="muted">Code</span><b>GitHub</b></a>
            <a className="panel link" href={LINKS.linkedin} target="_blank" rel="noreferrer"><span className="muted">Network</span><b>LinkedIn</b></a>
          </div>
        </section>
      </main>

      <footer className="foot">© {new Date().getFullYear()} Dwijesh Trivedi. Built with React.</footer>
    </>
  );
}
