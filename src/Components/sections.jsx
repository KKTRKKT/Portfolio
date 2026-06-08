import React, { useEffect, useState } from "react";
import { Button, Icon, Metric, Reveal, SectionMarker, Tag } from "./ui";

function Logo() {
  return (
    <a className="brand" href="#top">
      KKTRKKT<span className="dot">.</span>
    </a>
  );
}

const NAV_LINKS = [
  ["about", "About"],
  ["career", "Career"],
  ["stack", "Stack"],
  ["projects", "Projects"],
  ["troubleshooting", "Troubleshooting"],
];

function useScrollSpy(ids, offset = 96) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + offset;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, offset]);
  return active;
}

export function Nav({ onContact }) {
  const active = useScrollSpy(NAV_LINKS.map(([id]) => id));
  const go = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: "smooth" });
  };
  return (
    <nav className="nav" aria-label="주 메뉴">
      <div className="wrap nav-inner">
        <Logo />
        <div className="nav-links">
          {NAV_LINKS.map(([id, label]) => (
            <a
              key={id}
              href={"#" + id}
              onClick={go(id)}
              className={active === id ? "active" : ""}
              aria-current={active === id ? "true" : undefined}
            >
              {label}
            </a>
          ))}
          <a
            className="nav-cta"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onContact();
            }}
          >
            <Button variant="primary" style={{ padding: "8px 14px", fontSize: 13 }}>
              Contact
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
}

export function Hero({ data, onContact }) {
  return (
    <header className="hero" id="top" aria-labelledby="hero-h">
      <div className="hero-grid" aria-hidden="true" />
      <div className="wrap hero-inner">
        <span className="eyebrow">Backend Engineer · Portfolio</span>
        <h1 id="hero-h">
          서버는 조용해야<br />
          합니다<span className="cursor" aria-hidden="true" />
        </h1>
        <div className="role">{data.role}</div>
        <p className="lead">{data.lead}</p>
        <div className="stack-line">{data.stackLine}</div>
        <div className="hero-cta">
          <Button variant="primary" icon="mail" onClick={onContact}>
            이메일 보내기
          </Button>
          <Button
            variant="secondary"
            icon="github"
            onClick={() => window.open(data.github, "_blank")}
          >
            GitHub
          </Button>
        </div>
        <div className="hero-metrics">
          {data.metrics.map((m, i) => (
            <Metric key={i} {...m} />
          ))}
        </div>
      </div>
    </header>
  );
}

export function About({ data }) {
  return (
    <section className="section about" id="about" aria-label="About">
      <div className="wrap">
        <SectionMarker num="01 —" label="About" />
        <div className="about-grid">
          <Reveal>
            {data.about.map((p, i) => (
              <p key={i} className={i === 0 ? "" : "muted"}>
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal className="kw-list">
            {data.strengths.map((s, i) => (
              <div className="kw-item" key={i}>
                <span className="k">{String(i + 1).padStart(2, "0")}</span>
                <span className="t">{s.t}</span>
                <span className="d">{s.d}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Career({ data }) {
  return (
    <section className="section" id="career" aria-labelledby="career-h">
      <div className="wrap">
        <SectionMarker num="02 —" label="Career & Education" />
        <h2 id="career-h">이력</h2>
        <p className="sub">현장에서 시스템을 만들고, 계속 배우며 검증해 왔습니다.</p>
        <div className="cv" style={{ marginTop: 32 }}>
          {data.career.map((g) => (
            <Reveal className="cv-group" key={g.cat}>
              <div className="cv-cat">
                <Icon name={g.icon} size={15} />
                {g.cat}
              </div>
              <div className="cv-items">
                {g.items.map((it, i) => (
                  <div className="cv-row" key={i}>
                    <div className="cv-main">
                      <span className="cv-org">{it.org}</span>
                      <span className="cv-role">{it.role}</span>
                    </div>
                    <span className="cv-period">{it.period}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TechStack({ data }) {
  return (
    <section className="section" id="stack" aria-label="Tech Stack">
      <div className="wrap">
        <SectionMarker num="03 —" label="Tech Stack" />
        <Reveal className="stack-grid">
          {data.stack.map((cat) => (
            <div className="stack-cell" key={cat.cat}>
              <div className="cat">
                <Icon name={cat.icon} size={15} />
                {cat.cat}
              </div>
              <div className="stack-items">
                {cat.items.map((it) => (
                  <Tag key={it} plain>
                    {it}
                  </Tag>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
