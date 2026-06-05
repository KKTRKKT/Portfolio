# 이성현 · Backend Engineer Portfolio

연구 데이터 플랫폼과 공공 정산 시스템을 만드는 백엔드 엔지니어 이성현의 포트폴리오 사이트.

- 운영 도메인: <https://portfolio.kktrkkt.dev>
- 케이스 스터디: KISTI 과학기술 AI 데이터 공유·활용 서비스 · 커미조아 품질 전산화 · 수자원공사 REC 통합관리 · COIP 암호화폐 모의투자·자동매매 시뮬레이션 (GKE · CI/CD)

## 스택

- React 18 · Parcel 2
- Pretendard Variable · IBM Plex Mono
- CSS Custom Properties 기반 디자인 토큰 (`src/tokens.css`)

## 구조

```
src/
├── index.html            # Parcel 엔트리, 메타·OG 태그
├── index.js              # React 18 createRoot 마운트
├── App.jsx               # DATA + 컴포지션 + Toast
├── tokens.css            # 디자인 토큰 (color · type · spacing · motion)
├── styles.css            # 컴포넌트 스타일
└── Components/
    ├── ui.jsx            # Icon · Button · Chip · Tag · Metric · Reveal · SectionMarker
    ├── sections.jsx      # Nav (scroll-spy) · Hero · About · TechStack
    ├── projects.jsx      # Projects · CaseStudy · Troubleshooting
    └── footer.jsx        # Writing · Contact · Footer

design-system/            # 디자인 시스템 원본 (토큰·프리뷰·UI 키트)
docs/                     # 케이스 PDF · 리디자인 계획서 · 메트릭 시트
```

## 개발

```bash
npm install
npm start           # parcel dev server → http://localhost:1234
npm run build       # 프로덕션 빌드 → dist/
npm run deploy      # gh-pages 배포 (predeploy → build-gh 후 push)
```

## 콘텐츠 갱신

모든 콘텐츠는 `src/App.jsx`의 `DATA` 객체에 집중되어 있다. Hero 지표·About·Tech Stack·Projects 4건·Trouble-shooting 5건·Writing을 여기서 수정한다. 케이스별 아키텍처 다이어그램은 `src/Components/diagrams.jsx`의 `REGISTRY`에 키 단위로 등록한다.

## 디자인 원칙

- 밝은 종이(`--paper`) 베이스 + 단일 블루프린트 블루(`--accent #2A4BD8`)
- Pretendard 본문, IBM Plex Mono로 지표·라벨·코드
- 한국어 `-습니다` 톤, 측정된 숫자로 뒷받침
- 헤어라인 경계와 조용한 페이드 — `prefers-reduced-motion` 존중

## 참고 문서

- `docs/portfolio-redesign-plan.md` — 리디자인 계획서 (IA · 와이어프레임 · Phase 1~8)
- `docs/coip-project-addition-plan.md` — Case 04(COIP) 추가 계획서 (5단 포맷 콘텐츠 · GKE 다이어그램 · 단계별 실행)
- `docs/metrics-todo.md` — 케이스별 정량 지표 확정 시트
- `design-system/SKILL.md` — 디자인 시스템 사용 규칙
