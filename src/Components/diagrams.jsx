import React from "react";

const C = {
  ink: "#17181B",
  ink2: "#565860",
  ink3: "#8B8D94",
  line: "#E7E7E1",
  lineStrong: "#D4D4CD",
  surface: "#FFFFFF",
  surface2: "#F4F4F0",
  accent: "#2A4BD8",
  accentHover: "#1F39AE",
  accentSoft: "#ECEFFB",
  accentLine: "#C6D0F4",
  pos: "#1E7F4E",
};

const MONO = "'IBM Plex Mono', ui-monospace, monospace";

function Defs() {
  return (
    <defs>
      <marker
        id="arrow"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M0,0 L10,5 L0,10 z" fill={C.ink3} />
      </marker>
      <marker
        id="arrow-accent"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M0,0 L10,5 L0,10 z" fill={C.accent} />
      </marker>
    </defs>
  );
}

function Box({ x, y, w = 110, h = 50, label, sub, accent = false }) {
  const cx = x + w / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="6"
        fill={accent ? C.accentSoft : C.surface}
        stroke={accent ? C.accentLine : C.lineStrong}
        strokeWidth="1"
      />
      <text
        x={cx}
        y={sub ? y + h / 2 - 2 : y + h / 2 + 4}
        textAnchor="middle"
        fontFamily={MONO}
        fontSize="11"
        fontWeight={accent ? 500 : 400}
        fill={accent ? C.accentHover : C.ink}
      >
        {label}
      </text>
      {sub ? (
        <text
          x={cx}
          y={y + h / 2 + 13}
          textAnchor="middle"
          fontFamily={MONO}
          fontSize="9"
          fill={C.ink3}
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

function LayerLabel({ x = 24, y, text }) {
  return (
    <text
      x={x}
      y={y}
      fontFamily={MONO}
      fontSize="10"
      fill={C.ink3}
      letterSpacing="0.12em"
    >
      {text.toUpperCase()}
    </text>
  );
}

function Arrow({ x1, y1, x2, y2, dashed = false, accent = false }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={accent ? C.accent : C.ink3}
      strokeWidth="1"
      strokeDasharray={dashed ? "4 4" : undefined}
      markerEnd={`url(#${accent ? "arrow-accent" : "arrow"})`}
    />
  );
}

function PlainLine({ x1, y1, x2, y2, dashed = false }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={C.ink3}
      strokeWidth="1"
      strokeDasharray={dashed ? "4 4" : undefined}
    />
  );
}

function MicroLabel({ x, y, text, anchor = "middle" }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={MONO}
      fontSize="10"
      fill={C.ink3}
    >
      {text}
    </text>
  );
}

/* ===================== KISTI · MSA Architecture ===================== */
function KistiDiagram() {
  return (
    <svg
      viewBox="0 0 1080 510"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="KISTI 9-module MSA architecture with iRODS cluster and observability stack"
    >
      <Defs />

      {/* Frontend Layer */}
      <LayerLabel y={79} text="Frontend" />
      <Box x={280} y={50} w={240} label="NGINX front" />
      <Box x={560} y={50} w={240} label="Next.js wordpressClient" />

      {/* connector to Application */}
      <Arrow x1={540} y1={102} x2={540} y2={118} />

      {/* Application Layer — Tomcat runtime + Wordpress (deploy targets) */}
      <LayerLabel y={149} text="Application · Tomcat + Wordpress" />
      {[
        ["adm", 119],
        ["serv", 242],
        ["openapi", 365],
        ["user", 488],
        ["competition", 611],
        ["kafe", 734],
        ["Wordpress", 857],
      ].map(([label, x]) => (
        <Box key={label} x={x} y={120} w={105} label={label} />
      ))}

      {/* connector to Infra */}
      <Arrow x1={540} y1={172} x2={540} y2={188} />

      {/* Infra / Platform Layer */}
      <LayerLabel y={219} text="Infra · Platform" />
      <Box x={126} y={190} w={180} label="Solr" sub="search" />
      <Box x={342} y={190} w={180} label="davrods" sub="WebDAV → iRODS" />
      <Box x={558} y={190} w={180} label="davrods-ticket" sub="권한 토큰" />
      <Box x={774} y={190} w={180} label="sftp" sub="iRODS Jargon" />

      {/* connector to Database */}
      <Arrow x1={540} y1={242} x2={540} y2={258} />

      {/* Database Layer */}
      <LayerLabel y={289} text="Database" />
      <Box x={290} y={260} w={220} label="Postgres" sub="repo-db" />
      <Box x={570} y={260} w={220} label="Redis" sub="session-db" />

      {/* connector to External Storage */}
      <Arrow x1={540} y1={312} x2={540} y2={328} />

      {/* External Storage */}
      <LayerLabel y={359} text="External Storage" />
      <Box
        x={300}
        y={330}
        w={480}
        h={60}
        label="iRODS Cluster"
        sub="3 servers · 6,000 GB · 2,033,174 items"
        accent
      />

      {/* Monitoring Layer (side-by-side, sourced from Application via Spring Boot Actuator) */}
      <LayerLabel y={439} text="Monitoring" />
      <Box x={290} y={410} w={220} label="Prometheus" sub="metrics scrape" />
      <Box x={570} y={410} w={220} label="Grafana" sub="dashboards · alerts" />

      {/* dashed metrics scrape from Application → Prometheus */}
      <PlainLine x1={975} y1={172} x2={975} y2={435} dashed />
      <PlainLine x1={975} y1={435} x2={790} y2={435} dashed />
      <MicroLabel x={978} y={300} text="actuator → scrape" anchor="start" />

      {/* badge */}
      <text
        x={1056}
        y={28}
        textAnchor="end"
        fontFamily={MONO}
        fontSize="10"
        fill={C.ink3}
        letterSpacing="0.1em"
      >
        DOCKER · MSA
      </text>
    </svg>
  );
}

/* ===================== 커미조아 · Package Dependency Map ===================== */
function ComezoaDiagram() {
  /* Group container with title + count badge */
  const GroupBox = ({ x, y, w, h, title, count, children }) => (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="8"
        fill={C.surface2}
        stroke={C.lineStrong}
        strokeWidth="1"
      />
      <text
        x={x + 18}
        y={y + 22}
        fontFamily={MONO}
        fontSize="10"
        fill={C.accentHover}
        letterSpacing="0.12em"
      >
        {title.toUpperCase()}
      </text>
      <text
        x={x + w - 18}
        y={y + 22}
        textAnchor="end"
        fontFamily={MONO}
        fontSize="10"
        fill={C.ink3}
      >
        {count}
      </text>
      {children}
    </g>
  );

  /* In-box text line */
  const ML = ({ x, y, children, accent = false, small = false }) => (
    <text
      x={x}
      y={y}
      fontFamily={MONO}
      fontSize={small ? 10 : 11}
      fill={accent ? C.accentHover : C.ink}
      fontWeight={accent ? 500 : 400}
    >
      {children}
    </text>
  );

  return (
    <svg
      viewBox="0 0 1080 600"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="커미조아 ERP 패키지 의존성 맵 — Spring Boot 모듈 구조"
    >
      <Defs />

      {/* App entry */}
      <Box
        x={420}
        y={30}
        w={240}
        h={55}
        label="App.java"
        sub="@SpringBootApplication"
        accent
      />
      <Arrow x1={540} y1={87} x2={540} y2={113} />

      {/* Group 1 — Workflow Pipeline */}
      <GroupBox
        x={40}
        y={120}
        w={620}
        h={150}
        title="Workflow Pipeline"
        count="8 modules"
      >
        <ML x={58} y={180}>inbound · process · inspection · shipment_qc</ML>
        <ML x={58} y={210}>
          shipment · shipment_return · product_returns · src_as
        </ML>
        <ML x={58} y={246} small>
          입고 → 공정 → 검사 → 출고 → 반품/AS
        </ML>
      </GroupBox>

      {/* Group 2 — Defect & After-Sales */}
      <GroupBox
        x={680}
        y={120}
        w={360}
        h={150}
        title="Defect & AS"
        count="3 modules"
      >
        <ML x={698} y={180}>inner_defect · external_defect</ML>
        <ML x={698} y={210}>as</ML>
        <ML x={698} y={246} small>
          부적합 · 사후 처리
        </ML>
      </GroupBox>

      {/* Group 3 — Master Data & Assets */}
      <GroupBox
        x={40}
        y={290}
        w={480}
        h={150}
        title="Master Data & Assets"
        count="8 modules"
      >
        <ML x={58} y={350}>product · item · platform · vendor</ML>
        <ML x={58} y={380}>company · code · jig · instrument</ML>
        <ML x={58} y={416} small>
          제품·자산·코드 마스터
        </ML>
      </GroupBox>

      {/* Group 4 — Cross-cutting (with fan-in highlights) */}
      <GroupBox
        x={540}
        y={290}
        w={500}
        h={150}
        title="Cross-cutting"
        count="18 modules"
      >
        <ML x={558} y={346} accent>
          ★ account · file · change_point · board
        </ML>
        <ML x={558} y={374}>
          authority · member · menu · notification · send_email
        </ML>
        <ML x={558} y={400} small>
          site · main · dashboard · statistics · quality_doc · privacy_policy
        </ML>
        <ML x={558} y={424} small>
          ★ fan-in 50회+ · access_log · error_log · example
        </ML>
      </GroupBox>

      <Arrow x1={540} y1={447} x2={540} y2={473} />

      {/* Infra Layer */}
      <text
        x={40}
        y={490}
        fontFamily={MONO}
        fontSize="10"
        fill={C.ink3}
        letterSpacing="0.12em"
      >
        INFRA · 9 PACKAGES
      </text>
      {[
        ["config", 27],
        ["entity", 142],
        ["excel", 257],
        ["file", 372],
        ["mail", 487],
        ["pdf", 602],
        ["sftp", 717],
        ["utils", 832],
        ["validator", 947],
      ].map(([label, x]) => (
        <Box key={label} x={x} y={500} w={105} h={45} label={label} />
      ))}

      {/* Badge */}
      <text
        x={1056}
        y={22}
        textAnchor="end"
        fontFamily={MONO}
        fontSize="10"
        fill={C.ink3}
        letterSpacing="0.1em"
      >
        PACKAGE MAP · 37 + 9
      </text>
    </svg>
  );
}

/* ===================== COIP · GKE Topology ===================== */
function CoipDiagram() {
  return (
    <svg
      viewBox="0 0 1080 580"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="COIP GKE topology — ingress, Daphne ASGI, PgBouncer, Postgres, Redis, Upbit proxies, CI/CD pipeline"
    >
      <Defs />

      {/* Edge Layer */}
      <LayerLabel y={79} text="Edge · TLS" />
      <Box x={180} y={50} w={260} label="Cloudflare DNS" sub="origin" />
      <Box
        x={460}
        y={50}
        w={260}
        label="ingress-nginx"
        sub="cert-manager · Let's Encrypt"
      />
      <Box x={740} y={50} w={200} label="Browser" sub="DTL + Canvas" />
      <Arrow x1={310} y1={102} x2={310} y2={118} />
      <Arrow x1={590} y1={102} x2={590} y2={118} />

      {/* Application Layer */}
      <LayerLabel y={149} text="Application · GKE · asia-northeast3" />
      <Box
        x={140}
        y={120}
        w={300}
        h={55}
        label="Daphne (ASGI)"
        sub="Django 5.2 + DRF + Channels"
        accent
      />
      <Box
        x={460}
        y={120}
        w={220}
        h={55}
        label="HPA · PDB"
        sub="rolling update · 0 downtime"
      />
      <Box
        x={700}
        y={120}
        w={240}
        h={55}
        label="JWT (simplejwt)"
        sub="stateless · multi-Pod"
      />
      <Arrow x1={290} y1={177} x2={290} y2={213} />
      <Arrow x1={560} y1={177} x2={770} y2={213} />

      {/* Data Layer */}
      <LayerLabel y={244} text="Data" />
      <Box
        x={140}
        y={215}
        w={300}
        h={55}
        label="PgBouncer"
        sub="transaction · pool_size=25"
        accent
      />
      <Box
        x={700}
        y={215}
        w={240}
        h={55}
        label="Redis"
        sub="cache · broker · rate-limit"
      />
      <Arrow x1={290} y1={272} x2={290} y2={308} />

      {/* Storage Layer */}
      <LayerLabel y={339} text="Storage · Persistent" />
      <Box
        x={140}
        y={310}
        w={300}
        h={55}
        label="PostgreSQL 16"
        sub="PD · RWO · 잔고/주문 트랜잭션"
      />
      <Box
        x={500}
        y={310}
        w={200}
        h={55}
        label="NFS"
        sub="RWX · 미디어 공유"
      />

      {/* External Layer (right side, parallel to Data) */}
      <LayerLabel x={720} y={339} text="External · Upbit" />
      <Box
        x={700}
        y={310}
        w={240}
        h={55}
        label="REST / WS Proxy"
        sub="httpx · websockets"
      />
      {/* dashed connector App → Upbit proxy */}
      <PlainLine x1={940} y1={147} x2={995} y2={147} dashed />
      <PlainLine x1={995} y1={147} x2={995} y2={337} dashed />
      <PlainLine x1={995} y1={337} x2={940} y2={337} dashed />
      <MicroLabel x={1000} y={245} text="proxy isolate" anchor="start" />

      {/* CI/CD Pipeline */}
      <LayerLabel y={429} text="CI/CD · Jenkins Pipeline" />
      {[
        ["GitHub", 60],
        ["pytest", 200],
        ["Trivy", 340],
        ["Kaniko", 480],
        ["GHCR", 620],
        ["kubectl", 760],
      ].map(([label, x], i) => (
        <React.Fragment key={label}>
          <Box x={x} y={400} w={120} h={50} label={label} />
          {i < 5 ? (
            <Arrow x1={x + 120} y1={425} x2={x + 140} y2={425} accent />
          ) : null}
        </React.Fragment>
      ))}
      <Arrow x1={820} y1={425} x2={900} y2={425} accent />
      <Box
        x={900}
        y={400}
        w={140}
        h={50}
        label="GKE Cluster"
        sub="deploy"
        accent
      />

      {/* Cost Optimization Footnote */}
      <LayerLabel y={509} text="Cost · Environment" />
      <Box
        x={60}
        y={480}
        w={460}
        h={55}
        label="staging — Spot VM + CronJob"
        sub="09:00 stop · 00:00 start · ~60% saved"
      />
      <Box
        x={560}
        y={480}
        w={460}
        h={55}
        label="prod — On-demand · HPA + PDB"
        sub="K8S v1.35 · ingress-nginx"
      />

      {/* badge */}
      <text
        x={1056}
        y={28}
        textAnchor="end"
        fontFamily={MONO}
        fontSize="10"
        fill={C.ink3}
        letterSpacing="0.1em"
      >
        GKE · K8S v1.35
      </text>
    </svg>
  );
}

const REGISTRY = {
  kisti: { Comp: KistiDiagram, source: "MSA 구조도" },
  comezoa: { Comp: ComezoaDiagram, source: "패키지 의존성 · 37 + 9" },
  coip: { Comp: CoipDiagram, source: "GKE · K8S 토폴로지" },
};

export function DiagramByKey({ id }) {
  if (id === "kwater") {
    return (
      <div className="diagram diagram-nda" role="note">
        <span className="badge">NDA</span>
        <span>보안상 시스템 구조도는 공개하지 않습니다.</span>
      </div>
    );
  }
  const entry = REGISTRY[id];
  if (!entry) {
    return (
      <div className="diagram diagram-empty">
        아키텍처 다이어그램 — 이미지 교체 영역
      </div>
    );
  }
  const { Comp, source } = entry;
  return (
    <figure className="diagram">
      <figcaption className="diagram-label">
        <span>Architecture</span>
        <span className="badge">{source}</span>
      </figcaption>
      <Comp />
    </figure>
  );
}
