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
2. 반응형 가로 스크롤 메뉴  – 메인 페이지 (index.html)/디테일 페이지 (detail.html)
3. 반응형 메뉴버튼 – 서브 페이지 (sub.html)
4. 메뉴 필터링 – 서브 페이지 (sub.html)
5. 스크롤 기반 구매바 노출 – 디테일 페이지 (detail.html)


<h1>메인배너 슬라이드</h1>
<img width="598" height="2147" alt="bannerSlide" src="https://github.com/user-attachments/assets/c2acce7c-d630-4c3b-9485-e774140d24f7" /><br />


* 좌/우 버튼으로 슬라이드 이동<br />
* 현재 페이지 / 전체 페이지 표시<br />
* 마지막 슬라이드 이후 자연스럽게 1번으로 돌아오는 무한 슬라이드<br />
* 3초마다 자동 슬라이드<br />
* 마우스 오버 / 터치 시 자동 슬라이드 일시정지<br />

```javascript
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const currentPageEl = document.querySelector(".current_page");
const totalPageEl = document.querySelector(".total_page");
const slides = document.querySelectorAll(".img_box li");
const slider = document.querySelector(".img_box ul");
```
✏️버튼 요소 가져오기<br />
✏️페이지 숫자 표시 요소 가져오기<br />
✏️슬라이드(li) 목록 가져오기<br />
✏️실제로 스크롤이 일어나는 ul 요소 가져오기<br />

```javascript
let currentPage = 0;
const totalSlides = slides.length;
```
✏️currentPage → 현재 보고 있는 슬라이드 번호 (0부터 시작)<br />
✏️totalSlides → 전체 슬라이드 개수<br />

```javascript
const firstClone = slides[0].cloneNode(true);
slider.appendChild(firstClone);
```
<h5>💡무한 슬라이드를 (클론 추가)</h5>

✏️첫 번째 슬라이드를 복제해서<br />
✏️맨 뒤에 붙임<br />
👉 마지막 슬라이드 다음으로 자연스럽게 첫 번째 슬라이드로 넘어가는 것처럼 보이게 하기 위해<br />


```javascript
function updateCurrentPage(index) {
  currentPageEl.textContent = index + 1;
}
```
✏️index는 0부터 시작하기 때문에 화면에는 1부터 보여야 하니까 +1를 더함<br />

```javascript
prevBtn.addEventListener("click", () => {
  scrollToSlide(currentPage - 1);
});

nextBtn.addEventListener("click", () => {
  scrollToSlide(currentPage + 1);
});
```
✏️prevBtn(왼쪽)버튼을 누르면 왼쪽으로<br />
✏️nextBtn(오른쪽)버튼을 누르면 오른쪽으로<br />
👉 scrollToSlide() 함수 호출<br />

```javascript
function scrollToSlide(index) {
  if (index < 0) {
    index = 0;
  }
  if (index >= totalSlides) {
    index = totalSlides - 1;
  }

  slider.scrollTo({
    left: slider.clientWidth * index,
    behavior: "smooth",
  });

  currentPage = index;
  updateCurrentPage(index);
}
```
<h5>💡실제 이동 함수 (scrollToSlide)</h5>

✏️슬라이드 하나의 너비 = slider.clientWidth<br />
✏️현재 인덱스 × 너비 = 이동 위치<br />
✏️scrollTo()로 부드럽게 이동<br />

```javascript
slider.addEventListener("scroll", () => {
  slides.forEach((slide, index) => {
     const distance = Math.abs(slide.offsetLeft - slider.scrollLeft);

  if (distance < minDistance) {
    minDistance = distance;
    closestIndex = index;
  }
});
```
<h5>💡스크롤 이벤트에서 현재 슬라이드 계산</h5>

✏️각 슬라이드의 위치(offsetLeft)와<br />
✏️현재 스크롤 위치(scrollLeft)의 차이를 계산<br />
✏️가장 가까운 슬라이드를 현재 페이지로 판단<br />
👉 터치 드래그로 이동해도 정확한 페이지 표시 가능<br />

```javascript
if (slider.scrollLeft >= maxScrollLeft) {
  slider.scrollLeft = 0;
  currentPage = 0;
  updateCurrentPage(0);
}
```
<h5>💡무한 슬라이드 복귀</h5>

클론 슬라이드까지 도달하면<br />

✏️ 강제로 scrollLeft = 0<br />
✏️ 진짜 1번 슬라이드로 순간 이동<br />

```javascript
function autoSlide() {
  currentPage++;
  scrollToSlide(currentPage);

if (currentPage === totalSlides - 1) {
  setTimeout(() => {
    slider.scrollTo({
      left: 0,
      behavior: "auto",
    });
    currentPage = 0;
    updateCurrentPage(currentPage);
  }, 3000);
```
<h5>💡마지막 슬라이드 처리</h5>

마지막 슬라이드에 도달하면<br />

✏️ 잠시 보여준 뒤<br />
✏️ 부드러운 효과 없이<br />
✏️ 0번으로 즉시 이동<br />
👉 자연스러운 무한 루프 완성<br />

```javascript
let autoSlideInterval = setInterval(autoSlide, 3000);
```
✏️ 3초마다 다음 슬라이드로 이동.<br />

<h5>마우스후버/터치 시 자동 슬라이드 멈춤</h5>

```javascript
slider.addEventListener("mouseenter", () => {
  clearInterval(autoSlideInterval);
});
```
✏️ 마우스를 올리면 자동 슬라이드 정지<br />

```javascript
slider.addEventListener("mouseleave", () => {
  autoSlideInterval = setInterval(autoSlide, 3000);
});
```
✏️ 마우스를 떼면 자동 슬라이드 시작<br />

```javascript
slider.addEventListener("touchstart", () => {
  clearInterval(autoSlideInterval);
});
```
✏️ 모바일에서 터치할 시 자동 슬라이드 정지<br />

📑 전체 동작 흐름 정리<br />

🎈 슬라이드 개수 확인<br />
🎈 첫 슬라이드 복제 → 맨 뒤에 추가<br />
🎈 버튼 클릭 → scrollToSlide 실행<br />
🎈 스크롤 발생 → 가장 가까운 슬라이드 계산<br />
🎈 마지막 슬라이드 도달 시 → 0번으로 리셋<br />
🎈3초마다 자동 슬라이드<br />
🎈 마우스/터치 인터랙션 시 자동 슬라이드 정지<br />

🌟cloneNode를 이용한 무한 슬라이드 구조<br />
🌟scrollLeft 기반 슬라이드 계산<br />
🌟offsetLeft를 이용한 현재 슬라이드 판별<br />
🌟자동 슬라이드 + 사용자 인터랙션 제어<br />
🌟반응형 환경에서도 동작하도록 clientWidth 사용<br />

scroll 기반으로 구현한 커스텀 무한 슬라이드로, cloneNode를 활용해 자연스러운 루프 구조를 만들고, <br />
scrollLeft와 offsetLeft 계산을 통해 드래그/버튼/자동 슬라이드 상황에서도 정확한 페이지 동기화를 구현했습니다.<br />

<h1>반응형 가로 스크롤 메뉴</h1>
<img width="595" height="524" alt="menu01" src="https://github.com/user-attachments/assets/466a8d2d-6d29-48bd-95ca-a3969b453abb" /><br />

* 좌우 화살표 버튼으로 메뉴 이동<br />
* 화면 크기에 따라 이동 개수 변경<br />
* scrollLeft를 활용한 가로 스크롤 구현<br />
* 반응형 레이아웃과 동기화<br />


```javascript
function getItemsPerMove() {
  if (window.innerWidth >= 769) {
    return 3;
  } else if (window.innerWidth >= 601) {
    return 2;
  } else {
    return 1;
  }
}
```
✏️ 현재 화면 너비에 따라 이동할 메뉴 개수를 결정<br />

👉 window.innerWidth는 현재 브라우저의 화면 너비를 가져오는 JavaScript 속성<br />

PC (769px 이상) ->	3개<br />
타블렛 (601~768px) ->	2개<br />
모바일 (600px 이하) ->	1개<br />

```javascript
rightBtn.addEventListener("click", () => {
  const slideWidth = activeMenu.querySelector("li").offsetWidth + 5;
  const moveCount = getItemsPerMove();

  activeMenu.scrollLeft += slideWidth * moveCount;
});
```
<h5>오른쪽 버튼 클릭 시 스크롤 이동</h5><br />

activeMenu.querySelector("li").offsetWidth + 5;<br />
✏️ 요소의 실제 너비(메뉴) 사이 gap 또는 margin 값 보정<br />

const moveCount = getItemsPerMove();<br />
✏️ 화면 크기에 따라 1 / 2 / 3개 이동<br />

activeMenu.scrollLeft += slideWidth * moveCount;<br />
✏️ scrollLeft → 가로 스크롤 위치<br />
✏️ 메뉴 너비 × 이동 개수 만큼 이동<br />


```javascript
leftBtn.addEventListener("click", () => {
  const slideWidth = activeMenu.querySelector("li").offsetWidth + 5;
  const moveCount = getItemsPerMove();

activeMenu.scrollLeft -= slideWidth * moveCount;
```
<h5>왼쪽 버튼 클릭 시 스크롤 이동</h5><br />
✏️ 동일한 방식으로 scrollLeft 값을 감소시켜 반대 방향으로 이동합니다.<br />
* activeMenu.scrollLeft -= slideWidth * moveCount; <- '-'로 빼서 뒤로 이동<br />

📑 전체 동작 흐름 정리<br />

🎈 window.innerWidth 활용<br />
🎈 scrollLeft 기반 가로 스크롤<br />
🎈 반응형 레이아웃과 스크롤 동기화<br />

window.innerWidth를 활용하여 화면 크기에 따라 이동할 메뉴 개수를 동적으로 변경하고, scrollLeft를 이용해 반응형 가로 스크롤 메뉴를 구현했습니다.<br />
