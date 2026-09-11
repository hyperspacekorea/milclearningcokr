# milclearning.co.kr — 정적 사이트

밀크러닝(MILC LEARNING) 브랜드 홈페이지. **WordPress 4.7 + Enfold 테마**로 운영되던 사이트를
**정적 HTML/CSS/JS** 로 전환한 결과물이다.

- 원본: `http://www.milclearning.co.kr` (카페24 웹호스팅, PHP 5.5 + MySQL)
- 전환일: 2026-09-10
- 배포: GitHub Pages (`hyperspacekorea/milclearningcokr`, 커스텀 도메인 `www.milclearning.co.kr`)

## 왜 정적으로 전환했나

호스팅사가 PHP 8.4 로 강제 전환을 통보했는데, 다음 세 가지가 모두 걸렸다.

1. **WordPress 4.7 은 PHP 7.1 이 상한** — PHP 8.4 에서는 실행 자체가 안 된다.
2. **Enfold 3.8.5(2017년, 상용) 는 WordPress 5 이상 미대응** — 제작사 공식 입장. 라이선스도 분실 상태.
3. **kboard·bbs-e-franchise 등 플러그인**도 PHP 8 제거 함수를 사용.

반면 사이트 실체는 **페이지 9개 · 글 11개 · 게시판 글 21개(마지막 2023년) · 회원 1명(관리자)** 인
사실상 브로슈어였고, 핵심 기능인 `STUDY ROOM`·`LEVEL TEST` 는 별도 시스템(`milcroom.co.kr`) 링크였다.

→ 정적 전환으로 **PHP 버전 문제가 영구 소멸**하고, 보안 위험(미패치 취약점 다수)도 함께 사라졌다.

## 구성

```
/                      홈
/eintro/ /milkrun/ …   밀크교육·입학안내·커리큘럼·밀크비즈 하위 페이지
/notice/               공지사항 (목록 + 상세 19건)
/faq/                  FAQ (스팸 게시글 3건 삭제, 현재 0건)
/franchisee/           가맹점 찾기 (지역별 17 + 지점 상세)
/contact/ /contactus/  오시는 길 + 가맹문의 폼
/contact/thanks/       가맹문의 접수 완료 페이지 (폼 제출 후 이동, 검색 제외 noindex)
/_redirects            구 WordPress 주소 → 현재 주소 301
/wp-content/ …         원본 경로 그대로 보존한 에셋(CSS·JS·이미지·폰트)
```

**에셋 경로를 원본 그대로 둔 이유**: CSS 안의 `url()` 참조가 그대로 유효해야
배경·아이콘·폰트가 깨지지 않는다.

## 외부 의존

| 대상 | 용도 |
| --- | --- |
| `fonts.googleapis.com` | 웹폰트 |
| `dapi.kakao.com` · `i1.daumcdn.net` | 가맹점 상세의 카카오 지도 |
| `milcroom.co.kr` | STUDY ROOM · LEVEL TEST 링크 (별도 Java/JSP 시스템) |
| `api.web3forms.com` | 가맹문의 폼 → 이메일 전달 |

⚠️ `milcroom.co.kr` 은 **HTTPS 를 지원하지 않는다.** 그래서 원래 가맹문의에 쓰이던
`<iframe src="http://academy.milcroom.co.kr/...">` 는 HTTPS 사이트에서 차단되므로
동일 항목의 자체 폼으로 대체했다.

## 가맹문의 폼

`contact` · `contactus` 두 페이지에 있으며 Web3Forms 로 이메일 전달한다.

- 수신: `drsongusa@yahoo.com` 한 곳 (Web3Forms 무료 플랜은 참조 발송(`ccemail`)이 Pro 전용이라 사용하지 않음)
- 항목 11개는 기존 milcroom 폼과 동일 + **개인정보 수집 동의** 추가
- `access_key` 적용 완료 (Web3Forms 계정 `help@suggestly.co.kr`, 폼 이름 「밀크러닝 가맹문의」). 이 키는 비밀값이 아니라 공개용 식별자다.
- 제출 후 이동: hidden `redirect` = `https://www.milclearning.co.kr/contact/thanks/`
  (무료 플랜은 **같은 도메인만**, `https://` 절대주소 필수. 도메인이 바뀌면 이 값도 바꿔야 한다)
- 수신 메일 표시: 보낸 사람 이름 `밀크러닝 홈페이지`(`from_name`), 주소는 Web3Forms 시스템 주소
  `notify+…@web3forms.com`(변경은 Enterprise 전용). **답장(Reply-To)은 신청자가 입력한 E-MAIL** 로 간다.
  스팸함 방지를 위해 수신자 주소록에 `notify@web3forms.com` 추가 권장.
- 완료 페이지는 `rtmilc2/_dev/build/make_thanks_page.py` 로 `contact/index.html` 의 머리글·바닥글을 복제해 만든다.

## 콘텐츠 수정 방법

정적 사이트이므로 관리자 화면이 없다. 공지 추가·내용 수정은 HTML 파일을 직접 고쳐
커밋·푸시하면 GitHub Pages 가 자동 재배포한다.

## 원본 보관

전환 전 WordPress 소스와 DB 덤프는 `_READINGTOWN/rtmilc2/` 에 있다
(원본 압축본은 OneDrive `리딩타운 공유/20260910_rtmilc/`).
전환에 사용한 스크립트는 그쪽 `_dev/build/` 에 있다.
