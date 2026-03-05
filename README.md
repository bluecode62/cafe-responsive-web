# ☕ 할리스 리뉴얼 반응형 사이트 (팀/개인)
 
## 🛠 사용 기술
- HTML5
- Sass
- JavaScript
- Gsap
  
## 📂 페이지 구성
- 메인 페이지 (모바일/타블렛/PC)
- 상품 리스트 서브 페이지 (모바일/타블렛/PC)
- 상품 상세 디테일 페이지 (모바일/타블렛/PC)

## ✨ 주요 기능
1. 메인배너 슬라이드 – 메인 페이지 (index.html)
2. 반응형 가로 스크롤  – 메인 페이지 (index.html)
3. 반응형 메뉴 – 서브 페이지 (sub.html)
4. 메뉴 필터링 – 서브 페이지 (sub.html)
5. 스크롤 기반 구매바 노출 & 반응형 상품 리스트 – 디테일 페이지 (detail.html)


<img width="598" height="2147" alt="bannerSlide" src="https://github.com/user-attachments/assets/c2acce7c-d630-4c3b-9485-e774140d24f7" /><br />

<h1>메인배너 슬라이드</h1>

* 좌/우 버튼으로 슬라이드 이동
* 현재 페이지 / 전체 페이지 표시
* 마지막 슬라이드 이후 자연스럽게 1번으로 돌아오는 무한 슬라이드
* 3초마다 자동 슬라이드
* 마우스 오버 / 터치 시 자동 슬라이드 일시정지

```javascript
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const currentPageEl = document.querySelector(".current_page");
const totalPageEl = document.querySelector(".total_page");
const slides = document.querySelectorAll(".img_box li");
const slider = document.querySelector(".img_box ul");
```
