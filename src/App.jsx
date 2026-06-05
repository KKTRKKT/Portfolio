import React, { useRef, useState } from "react";

import { About, Hero, Nav, TechStack } from "./Components/sections";
import { Projects, Troubleshooting } from "./Components/projects";
import { Contact, Footer, Writing } from "./Components/footer";
import { Icon } from "./Components/ui";

import "./styles.css";

const DATA = {
  name: "Sung Hyun Lee",
  role: "Backend Engineer · Data Platform & Enterprise Systems",
  email: "paulhana6006@gmail.com",
  github: "https://github.com/kktrkkt",
  lead: "연구 데이터 플랫폼과 공공 정산 시스템을 만들며, 측정 가능한 안정성과 일하는 방식을 바꾸는 자동화에 집중해 왔습니다. 좋은 소프트웨어는 조직이 일하는 방식을 근본적으로 바꿀 수 있다고 믿습니다.",
  stackLine: "Spring Boot · JPA/QueryDSL · iRODS · PostgreSQL · Docker · Grafana",

  metrics: [
    { pre: "×", value: "10", cap: "MAU 4K → 40K · 2년 (KISTI)" },
    { value: "6,000", unit: "GB", cap: "iRODS 분산 저장 · 200만+ 건" },
    { value: "99.9", unit: "%", cap: "연간 가용성 · 중대장애 0건" },
  ],

  about: [
    "KISTI 과학기술 AI 데이터 공유·활용 서비스, 커미조아 품질 전산화, 수자원공사 REC 통합관리 시스템을 만들며 연구 데이터 플랫폼과 공공·제조 도메인의 백엔드를 설계해 왔습니다.",
    "복잡한 업무 프로세스를 단순화하고 데이터를 기반으로 의사결정을 가능하게 하는 시스템을 만듭니다. Docker 기반 MSA로 9개 모듈을 분리해 가용성을 확보하고, QueryDSL·Spring Cache로 통계 화면을 즉시 응답으로 바꾸고, SAP 양방향 연동으로 회계 자동화를 만들어 왔습니다.",
    "사이드 프로젝트 COIP에서는 GKE 위에 HPA·PDB·PgBouncer·Jenkins+Kaniko+Trivy 파이프라인을 직접 운영하며, K8S·CI/CD·비용 최적화를 코드 옆에서 함께 다루는 방식을 익히고 있습니다.",
  ],
  strengths: [
    { t: "데이터 플랫폼", d: "iRODS · 6TB · 200만+ 건" },
    { t: "MSA 모듈 설계", d: "Docker · 9 modules" },
    { t: "엔터프라이즈 자동화", d: "SAP · RPA" },
    { t: "K8S 운영 · CI/CD", d: "GKE · PgBouncer · Kaniko" },
  ],

  stack: [
    { cat: "Language", icon: "code", items: ["Java", "Python", "JavaScript", "SQL"] },
    {
      cat: "Framework",
      icon: "layers",
      items: [
        "Spring Boot",
        "JPA / QueryDSL",
        "MyBatis",
        "Spring Security/Cache/Validation",
        "Hasim Framework",
        "Django · DRF · Channels",
      ],
    },
    {
      cat: "Data",
      icon: "database",
      items: ["PostgreSQL", "MariaDB", "Oracle", "Redis", "iRODS", "Solr", "PgBouncer"],
    },
    { cat: "Infra", icon: "server", items: ["Docker", "Nginx", "Kubernetes (GKE)", "Kaniko"] },
    { cat: "Observability", icon: "activity", items: ["Prometheus", "Grafana"] },
    { cat: "Tooling", icon: "git-branch", items: ["Git", "Jenkins", "Maven", "npm", "Trivy"] },
  ],

  projects: [
    {
      id: "coip",
      title: "COIP · 암호화폐 모의투자·자동매매 시뮬레이션",
      one: "실자금 손실 없이 매매 전략을 실험·자동 검증할 수 있는 플랫폼. 2인 팀으로 GKE 기반 배포·CI/CD·비용 최적화까지 직접 운영합니다. (2025.04 – 진행 중)",
      tags: [
        "Django 5.2",
        "DRF",
        "Channels (ASGI)",
        "PostgreSQL 16",
        "PgBouncer",
        "Redis",
        "GKE · K8S v1.35",
        "Jenkins · Kaniko · Trivy",
      ],
      problem:
        "코인 투자자가 실자금 손실 없이 매매 경험과 전략을 실험할 수 있는 환경이 부족했습니다. 단순 시세 추종을 넘어 자기 전략을 자동으로 검증할 수 있는 백테스트까지 한 플랫폼에서 제공해야 했고, 2인 팀이라는 제약 안에서 안정성·확장성·비용을 동시에 만족해야 했습니다.",
      architecture:
        "Django 5.2 SSR을 기본으로 두고, 시세·주문·채팅 초기 로드에만 DRF JSON을 부분 적용했습니다. 실시간 시세·채팅은 Channels + Daphne(ASGI)로 처리하고, Upbit은 REST·WebSocket 모두 프록시 계층을 두어 외부 변경 영향을 격리했습니다. GKE(asia-northeast3) 위에 ingress-nginx · HPA · PDB로 무중단 롤링 업데이트를 구성하고, PgBouncer(transaction mode, pool_size=25)를 두어 Pod 확장 시 DB 커넥션 풀을 한 계층으로 집약했습니다. CI는 Jenkins → pytest → Trivy → Kaniko → GHCR → kubectl 파이프라인으로 보안 점검을 빌드에 내재화했습니다.",
      decisions: [
        {
          k: "DTL + Canvas 차트 직접 구현",
          v: "2인 팀에 React 풀 도입 부담 회피 — SSR 기본, 인터랙티브한 차트만 Canvas로 자유도 확보",
        },
        {
          k: "DRF 부분 적용 + Channels(ASGI)",
          v: "풀 SPA 대신 시세·주문·채팅 초기 로드에만 JSON, 실시간은 ASGI로 WSGI 한계 우회",
        },
        {
          k: "PgBouncer transaction mode",
          v: "Pod 확장 시 앱 풀 합산이 PostgreSQL max_connections 초과 — 풀 관리 계층을 한 곳으로 집약",
        },
        {
          k: "Kaniko 데몬리스 빌드 + Trivy 게이트",
          v: "K8S 런너에서 Docker 데몬 기동 불가 → CI 내 이미지 빌드 + 보안 스캔을 빌드 전 차단 게이트로",
        },
        {
          k: "Spot VM + CronJob 스케일다운",
          v: "GCP 무료 크레딧 한도 내 운영 — staging 비활성 시간대 리소스 자동 반납",
        },
      ],
      trouble: {
        cause:
          "시세 푸시와 사용자 주문이 겹치는 트래픽 스파이크 구간에서 5xx가 다발했고, 로그 분석 결과 PostgreSQL 커넥션 풀 고갈이 가장 잦은 원인이었습니다. HPA로 Pod이 늘수록 각 Pod이 독립 풀을 점유해 max_connections에 빠르게 도달하는 구조적 문제였습니다.",
        fix: "앱 단 풀 확장은 DB 부하만 키운다고 보고 풀 관리 계층을 한 곳으로 모았습니다. PgBouncer를 transaction mode(pool_size=25)로 배치해 짧은 트랜잭션을 다수 클라이언트가 공유하도록 재구성했습니다.",
        result:
          "동일 부하 조건에서 커넥션 점유로 인한 5xx를 사실상 제거, DB max_connections 증설 없이 Pod 수 확장 가능.",
      },
      results: [
        { value: "60", unit: "%", cap: "staging 비용 절감 · Spot+CronJob" },
        { value: "0", cap: "운영 다운타임 · PDB+롤링" },
        { value: "Pod ↑", cap: "PgBouncer · 동시성 한도 확장" },
      ],
    },
    {
      id: "comezoa",
      title: "커미조아 품질 전산화 시스템",
      one: "엑셀·수기·스캔으로 흩어져 있던 품질 관리대장을 전산화하고, 통계 산출 시간을 하루+에서 즉시로 단축했습니다. (2025.05–2025.07)",
      tags: [
        "Spring Boot",
        "JPA",
        "QueryDSL",
        "MariaDB",
        "Thymeleaf",
        "Spring Security · Cache · Validation",
        "Docker",
      ],
      problem:
        "관리대장 작성은 종이 출력 → 수기 → 스캔 → 엑셀 입력의 4단계로 비효율적이었고, 개별 엑셀로 분산 관리되어 통계 작성 시 많은 수작업이 필요했습니다. 입력 형식이 작성자마다 달라 표준화·일관성도 어려웠습니다.",
      architecture:
        "관리대장 10종(수입·공정·출고·출하·내부부적합·외부부적합·내부대여·외부대여·AS·SRC AS)을 단일 도메인 모델로 통합하고, QueryDSL 기반 동적 검색·통계 쿼리와 Spring Cache + 집계 테이블 분리로 대시보드를 구성했습니다.",
      decisions: [
        {
          k: "Spring Cache + 집계 테이블",
          v: "매번 원장 풀스캔으로 만들던 통계를 캐시·집계 분리로 즉시 응답",
        },
        {
          k: "시리얼 변경 이력 추적 모델",
          v: "AS 이후 시리얼 변경되어도 입고~출하·AS 전 과정을 1화면에 추적",
        },
        {
          k: "Spring Validation + 코드 마스터",
          v: "입력 형식·데이터 표준화를 시스템에서 강제해 일관성 확보",
        },
        {
          k: "단위 + 통합 테스트",
          v: "입고→공정→검사→출하→통계 전 흐름을 검증 파이프라인으로 보장",
        },
      ],
      trouble: {
        cause: "월간 품질 통계 페이지가 매번 원장 풀스캔으로 집계되어 산출까지 하루 이상 걸렸습니다.",
        fix: "Spring Cache를 적용하고 집계 테이블을 분리해 대시보드와 통계 화면을 즉시 응답하도록 재구성했습니다.",
        result: "통계 산출 하루+ → 즉시, 관리대장 10종 단일 화면 운영, 입력 단계 4 → 1.",
      },
      results: [
        { value: "10", unit: "종", cap: "관리대장 통합 운영" },
        { value: "4 → 1", cap: "입력 단계 단순화" },
        { value: "즉시", cap: "통계 산출 · was 하루+" },
      ],
    },
    {
      id: "kwater",
      title: "수자원공사 REC 통합관리 시스템",
      one: "REC 매매계약 검증부터 회계전표·내부결재까지를 원클릭으로 자동화하고, 사업자 대민포털과 SAP 양방향 연동을 구축했습니다. (2024.06–2024.11)",
      tags: [
        "Java",
        "MyBatis",
        "Hasim Framework",
        "Oracle",
        "WebSquare",
        "SAP 연동",
        "RPA",
      ],
      problem:
        "RPS 의무공급비율 상향으로 REC 발급량이 급증해 민원이 대폭 늘었고, 매매계약 검증 후 회계전표를 수동 입력하면서 처리 지연과 인적 오류 위험이 상존했습니다. 보고·분석 자료도 수작업으로 취합해 속도와 품질 모두 낮았습니다.",
      architecture:
        "내부 관리 시스템과 대민용 포털을 분리 구축하고, SAP 재무시스템과 양방향 연동을 둬 회계전표 생성·내부결재를 원클릭으로 처리합니다. 에너지공단·전력거래소 데이터는 RPA로 실시간/주기 자동 수급하고, 계약·계좌 변경 이력은 표준 모델로 추적합니다.",
      decisions: [
        {
          k: "원클릭 회계 자동화",
          v: "매매계약 청구내역 자동 대조 → 회계전표 생성 → 내부결재까지 단일 액션",
        },
        {
          k: "SAP 양방향 연동",
          v: "회계 데이터 무결성·보안성 확보, 감사 추적 가능",
        },
        {
          k: "외부 기관 RPA 수급",
          v: "에너지공단·전력거래소 비정형 데이터를 자동 적재해 수작업 제거",
        },
        {
          k: "계약·계좌 변경 이력",
          v: "Hasim 표준 위에 이력 모델을 두어 추적 0 → 100%",
        },
      ],
      trouble: {
        cause:
          "REC 매매계약 검증 후 회계전표를 수동 입력해야 했고, 외부 기관 데이터도 수작업으로 취합되어 처리 지연·인적 오류 위험이 컸습니다.",
        fix: "매매계약 검증 → 회계전표 생성 → 내부결재를 원클릭 흐름으로 묶고, SAP 양방향 연동과 에너지공단·전력거래소 RPA 자동 수급을 결합했습니다.",
        result: "수동 다단계 회계 처리 → 원클릭, 외부 기관 데이터 자동 수급, 대민포털 셀프서비스화.",
      },
      results: [
        { value: "1", unit: "click", cap: "계약 → 전표 → 결재 (was 수동)" },
        { value: "2", unit: "곳", cap: "외부기관 자동 수급 (RPA)" },
        { value: "SAP", cap: "재무 시스템 양방향 연동" },
      ],
    },
    {
      id: "kisti",
      title: "KISTI 과학기술 AI 데이터 공유·활용 서비스",
      one: "연구자가 대규모 데이터셋·모델을 안정적으로 저장·검색·활용할 수 있도록 iRODS 기반 데이터 댐과 9개 모듈 MSA를 설계·구축했습니다. (2022.06–2023.11)",
      tags: [
        "Spring Boot 2.5",
        "JPA",
        "PostgreSQL 14",
        "Redis 6",
        "iRODS",
        "Solr",
        "Docker (MSA)",
        "Prometheus · Grafana",
      ],
      problem:
        "연구 데이터 공유·활용 수요는 늘었지만 AI 연구자가 활용할 인프라가 부족했습니다. 대규모 비정형 데이터를 안정적으로 저장·관리하고, 다기관 사용자에게 권한 기반으로 제공해야 했습니다.",
      architecture:
        "iRODS Cluster 3 servers를 데이터 댐으로 두고, Tomcat 9개 모듈(common · adm · user · kafe · serv · sftp · openapi · competition · wordpressClient)로 분리한 Docker 기반 MSA를 구축했습니다. 인증은 Spring Security SAML2 + Redis 세션으로 일원화하고, Prometheus·Grafana로 운영을 가시화했습니다.",
      decisions: [
        {
          k: "iRODS + davrods/sftp 분리",
          v: "6TB·200만+ 건 비정형 데이터의 분산 저장과 권한 일관성 확보",
        },
        {
          k: "9개 모듈 MSA (Docker)",
          v: "관리자·사용자·OpenAPI·경진대회를 독립 배포 단위로 분리해 영향 범위 최소화",
        },
        {
          k: "SAML2 + Redis 세션",
          v: "다기관 사용자 인증을 SSO로 일원화 (kafe 모듈)",
        },
        {
          k: "Solr + DOI + OpenAPI",
          v: "검색·외부 인용·재사용 채널을 한 번에 — 학술적 인용 가능 구조",
        },
      ],
      trouble: {
        cause:
          "초기 모놀리식 구조로 기능 결합도가 높아 배포 단위가 크고, 다기관 사용자 인증이 분산되어 있었습니다.",
        fix: "도메인별로 9개 Tomcat 모듈로 분리해 Docker 기반 MSA로 재구성하고, Spring Security SAML2 + Redis 세션으로 SSO를 일원화했습니다.",
        result: "연간 가용성 99.9% 유지, 중대 장애 0건, MAU 4,000 → 40,000 (2년 10×).",
      },
      results: [
        { pre: "×", value: "10", cap: "MAU 4K → 40K · 2년" },
        { value: "99.9", unit: "%", cap: "가용성 · 중대장애 0" },
        { value: "8,000", unit: "+", cap: "OpenAPI 외부기관 활용" },
      ],
    },
  ],

  troubleshooting: [
    {
      title: "모놀리식 구조의 배포·운영 부담 (KISTI)",
      cause: "단일 was로 기능 결합도가 높아 배포 단위가 크고 장애 영향 범위가 넓었습니다.",
      fix: "도메인별 9개 Tomcat 모듈로 분리해 Docker 기반 MSA로 재구성, iRODS Cluster 3 servers로 데이터 계층을 분리.",
      result: "연간 가용성 99.9%, 중대장애 0건, MAU 2년 10×.",
    },
    {
      title: "통계 페이지 풀스캔 지연 (커미조아)",
      cause: "월간 품질 통계가 매번 원장 풀스캔으로 집계되어 산출까지 하루 이상 소요.",
      fix: "Spring Cache + 집계 테이블 분리로 통계와 대시보드를 즉시 응답 구조로 재구성.",
      result: "통계 산출 하루+ → 즉시, 관리대장 10종 단일 화면 운영.",
    },
    {
      title: "시리얼 변경에 따른 추적 단절 (커미조아)",
      cause: "AS 이후 제품 시리얼번호가 변경되어 기존 키로는 전 과정 추적이 불가능.",
      fix: "시리얼 변경 이력을 도메인 모델에 1차 키로 두고 제품조회를 이력 기반 탐색으로 재설계.",
      result: "입고 ~ 출하 · AS까지 1화면 추적, 추적률 0 → 100%.",
    },
    {
      title: "회계 처리 수작업·외부 데이터 수기 취합 (수자원)",
      cause: "REC 발급량 급증에도 매매계약 검증·회계전표·외부기관 데이터 수급이 모두 수작업.",
      fix: "매매계약 → 회계전표 → 결재 원클릭 자동화 + SAP 양방향 연동 + 에너지공단·전력거래소 RPA 수급.",
      result: "수동 다단계 → 원클릭, 외부기관 데이터 자동 수급, 회계 데이터 무결성 확보.",
    },
    {
      title: "K8S Pod 확장 시 DB 커넥션 고갈 (COIP)",
      cause:
        "HPA로 Pod이 늘수록 각 Pod의 독립 풀이 합산되어 PostgreSQL max_connections에 빠르게 도달, 트래픽 스파이크 구간에서 5xx 다발.",
      fix: "PgBouncer를 transaction mode(pool_size=25)로 배치해 풀 관리를 한 계층으로 집약, 짧은 트랜잭션을 다수 클라이언트가 공유하도록 재구성.",
      result:
        "동일 부하에서 커넥션 점유 5xx 사실상 제거, max_connections 증설 없이 Pod 수 확장 가능.",
    },
  ],

  writing: [],
};

function Toast({ msg, show }) {
  return (
    <div
      className={"toast" + (show ? " show" : "")}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <Icon name="check" size={15} />
      {msg}
    </div>
  );
}

function App() {
  const [toast, setToast] = useState({ msg: "", show: false });
  const tRef = useRef(null);
  const copy = (text) => {
    const isResume = text.includes("이력서");
    if (!isResume && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setToast({
      msg: isResume ? "이력서 PDF 다운로드 (데모)" : "이메일 주소를 복사했습니다",
      show: true,
    });
    clearTimeout(tRef.current);
    tRef.current = setTimeout(() => setToast((s) => ({ ...s, show: false })), 1900);
  };
  const goContact = () => {
    const el = document.getElementById("contact");
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: "smooth" });
  };

  return (
    <>
      <a className="skip-link" href="#main-content">본문으로 건너뛰기</a>
      <Nav onContact={goContact} />
      <main id="main-content">
        <Hero data={DATA} onContact={goContact} />
        <About data={DATA} />
        <TechStack data={DATA} />
        <Projects data={DATA} />
        <Troubleshooting data={DATA} />
        <Writing data={DATA} />
        <Contact data={DATA} onCopy={copy} />
      </main>
      <Footer />
      <Toast msg={toast.msg} show={toast.show} />
    </>
  );
}

export default App;
