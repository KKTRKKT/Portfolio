import React from "react";
import { Button, Icon, SectionMarker } from "./ui";

export function Writing({ data }) {
  const hasItems = data.writing && data.writing.length > 0;
  return (
    <section className="section" id="writing" aria-labelledby="writing-h">
      <div className="wrap">
        <SectionMarker num="05 —" label="Writing / Insights" />
        <h2 id="writing-h">기록</h2>
        <p className="sub">고민의 과정을 글로 남깁니다. 회고와 기술 노트.</p>
        {hasItems ? (
          <div className="write-list" style={{ marginTop: 24 }}>
            {data.writing.map((w, i) => (
              <a
                className="write-row"
                key={i}
                href={w.href || "#"}
                onClick={(e) => {
                  if (!w.href) e.preventDefault();
                }}
              >
                <span className="date">{w.date}</span>
                <span className="t">{w.title}</span>
                <Icon name="arrow-up-right" size={17} />
              </a>
            ))}
          </div>
        ) : (
          <div className="write-empty" style={{ marginTop: 24 }}>
            준비 중입니다. 회고 글을 정리하는 대로 이곳에 올립니다.
          </div>
        )}
      </div>
    </section>
  );
}

export function Contact({ data, onCopy }) {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-h">
      <div className="wrap">
        <SectionMarker num="06 —" label="Contact" />
        <h2 id="contact-h">함께 풀고 싶은 문제가 있다면</h2>
        <p className="lead">
          백엔드·데이터 플랫폼 관련 제안을 환영합니다. 가장 빠른 연락은 이메일입니다.
        </p>
        <div className="contact-actions">
          <Button
            variant="primary"
            icon="mail"
            onClick={() => (window.location.href = "mailto:" + data.email)}
          >
            {data.email}
          </Button>
          <Button variant="secondary" icon="copy" onClick={() => onCopy(data.email)}>
            복사
          </Button>
          <Button
            variant="secondary"
            icon="download"
            onClick={() => window.print()}
            aria-label="이력서를 PDF로 저장"
          >
            이력서 PDF
          </Button>
        </div>
        <div className="contact-meta">
          <a href={data.github} target="_blank" rel="noreferrer">
            <Icon name="github" size={16} />
            github.com/kktrkkt
          </a>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Icon name="arrow-up-right" size={16} />
            맨 위로
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="wrap">
      <div className="foot">
        <span className="c">© 2026 Sung Hyun Lee</span>
        <span className="c">Built with Pretendard · IBM Plex Mono</span>
      </div>
    </footer>
  );
}
