import React, { useState } from "react";
import { Icon, Metric, Reveal, SectionMarker, Tag } from "./ui";
import { DiagramByKey } from "./diagrams";

function CaseStudy({ c, open }) {
  return (
    <div className={"case" + (open ? " open" : "")}>
      <div className="case-clip">
        <div className="case-inner">
          <div className="case-block">
            <div className="h">
              <span className="n">A.</span>Problem
            </div>
            <p>{c.problem}</p>
          </div>

          <div className="case-block">
            <div className="h">
              <span className="n">B.</span>Architecture
            </div>
            <p>{c.architecture}</p>
            <DiagramByKey id={c.id} />
          </div>

          <div className="case-block">
            <div className="h">
              <span className="n">C.</span>Decisions · Why this stack
            </div>
            {c.decisions.map((d, i) => (
              <div className="decision" key={i}>
                <Icon name="zap" size={16} />
                <div>
                  <b>{d.k}</b> — {d.v}
                </div>
              </div>
            ))}
          </div>

          <div className="case-block">
            <div className="h">
              <span className="n">D.</span>Trouble-shooting
            </div>
            <div className="flow">
              <div className="flow-row">
                <span className="lab">원인</span>
                <span className="val">{c.trouble.cause}</span>
              </div>
              <div className="flow-row">
                <span className="lab">해결</span>
                <span className="val">{c.trouble.fix}</span>
              </div>
              <div className="flow-row res">
                <span className="lab">결과</span>
                <span className="val">{c.trouble.result}</span>
              </div>
            </div>
          </div>

          <div className="case-block">
            <div className="h">
              <span className="n">E.</span>Results
            </div>
            <div className="case-metrics">
              {c.results.map((m, i) => (
                <Metric key={i} {...m} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ p, idx, open, onToggle }) {
  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };
  return (
    <div
      className={"proj-card" + (open ? " open" : "")}
      onClick={onToggle}
      onKeyDown={onKey}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-label={`케이스 ${idx + 1}: ${p.title}`}
    >
      <div className="top">
        <span className="idx">CASE {String(idx + 1).padStart(2, "0")}</span>
        <span className="ttl">{p.title}</span>
        <Icon name="chevron-down" size={20} className="chev" />
      </div>
      <p className="one">{p.one}</p>
      <div className="tags">
        {p.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <CaseStudy c={p} open={open} />
    </div>
  );
}

export function Projects({ data }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="projects" aria-labelledby="projects-h">
      <div className="wrap">
        <SectionMarker num="03 —" label="Projects" />
        <h2 id="projects-h">케이스 스터디</h2>
        <p className="sub">
          문제 → 아키텍처 → 의사결정 → 트러블슈팅 → 정량 결과 순으로 정리했습니다.
        </p>
        <div className="proj-list" style={{ marginTop: 32 }}>
          {data.projects.map((p, i) => (
            <ProjectCard
              key={i}
              p={p}
              idx={i}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Troubleshooting({ data }) {
  return (
    <section className="section" id="troubleshooting" aria-labelledby="ts-h">
      <div className="wrap">
        <SectionMarker num="04 —" label="Trouble-shooting Highlights" />
        <h2 id="ts-h">장애를 줄인 결정들</h2>
        <p className="sub">
          프로젝트를 횡단하는 대표 사례입니다. 원인을 측정으로 좁히고, 재발을 막는 데까지 봅니다.
        </p>
        <div className="ts-list" style={{ marginTop: 28 }}>
          {data.troubleshooting.map((t, i) => (
            <Reveal className="ts-row" key={i}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{t.title}</h3>
                <div className="ts-cols">
                  <div className="ts-col">
                    <div className="l">원인</div>
                    <div className="v">{t.cause}</div>
                  </div>
                  <div className="ts-col">
                    <div className="l">해결</div>
                    <div className="v">{t.fix}</div>
                  </div>
                  <div className="ts-col res">
                    <div className="l">결과</div>
                    <div className="v">{t.result}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
