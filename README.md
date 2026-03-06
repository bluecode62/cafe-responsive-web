# ☕ 할리스 리뉴얼 반응형 사이트 (팀/개인)
: PC / Tablet / Mobile 환경에서 사용할 수 있도록 반응형 레이아웃을 적용했으며,
JavaScript와 GSAP을 활용해 스크롤 기반 인터랙션과 상품 구매 UI 기능을 구현했습니다.

## 🛠 사용 기술
- HTML5
- CSS3 / SCSS
- JavaScript (ES6)
- GSAP ScrollTrigger
  
## 📂 페이지 구성
- 메인 페이지 (모바일/타블렛/PC)
- 상품 리스트 서브 페이지 (모바일/타블렛/PC)
- 상품 상세 디테일 페이지 (모바일/타블렛/PC)

## ✨ 주요 기능
1. 메인배너 슬라이드 – 메인 페이지 (index.html)
2. 반응형 가로 스크롤 메뉴  – 메인 페이지 (index.html)/디테일 페이지 (detail.html)
3. 반응형 세로 더보기 버튼 – 서브 페이지 (sub.html)
4. 체크박스 기반 필터링 – 서브 페이지 (sub.html)
5. 스크롤 기반 구매창 노출 및 수량계산 기능 – 디테일 페이지 (detail.html)


<h1>메인배너 슬라이드</h1>
<img width="598" height="2147" alt="bannerSlide" src="https://github.com/user-attachments/assets/a186f020-da75-4003-81d1-f952c9efe0c7" /><br />


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
✏️(prevBtn, nextBtn) 버튼 요소 가져오기<br />
✏️(currentPageEl(현재), totalPageEl(전체))페이지 숫자 표시 요소 가져오기<br />
✏️슬라이드(slides)  == (li) 목록 가져오기<br />
✏️실제로 스크롤이 일어나는 ul 요소(slider) 가져오기<br />

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
<h5>💡무한 슬라이드(클론 추가)</h5>

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
<br />
📑 전체 동작 흐름 정리<br />
<br />
🎈 window.innerWidth 활용<br />
🎈 scrollLeft 기반 가로 스크롤<br />
🎈 반응형 레이아웃과 스크롤 동기화<br />
<br />
window.innerWidth를 활용하여 화면 크기에 따라 이동할 메뉴 개수를 동적으로 변경하고, scrollLeft를 이용해 반응형 가로 스크롤 메뉴를 구현했습니다.<br />


<h1>반응형 세로 더보기 버튼</h1>
<img width="609" height="1249" alt="moeBtn" src="https://github.com/user-attachments/assets/4736d606-fcc9-4288-a4a4-3257c31cb011" /><br />
<br/>
* window.innerWidth로 반응형 개수 제어<br />
* 현재 보여준 개수(currentCount) 관리<br />
* 더보기 클릭 시 추가 노출<br />
<br />

```javascript
const moreBtn = document.querySelector(".more_btn");
let currentCount = 0;
let showCount = getShowCount();
let currentMenu = document.querySelector(".menuImg_list.on");
```
📝변수	역할<br />
✏️ moreBtn: 더보기 버튼<br />
✏️ currentCount: 현재 보여지고 있는 상품 개수<br />
✏️ showCount: 한 번에 보여줄 상품 개수<br />
✏️ currentMenu: 현재 선택된 메뉴 리스트<br />
<br />

```javascript
function getCurrentMenu() {
  return document.querySelector(".menuImg_list.on");
}
```
📝 현재 선택된 메뉴 리스트(.on)를 가져오는 함수<br />
<br />

```javascript
function getShowCount() {
  const width = window.innerWidth;

  if (width < 768) return 8;
  if (width < 1024) return 9;
  return 12;
}
```
📝현재 화면 크기에 따라 보여줄 상품 개수를 결정하는 함수<br />
✏️모바일 (<768px)	8개<br />
✏️타블렛 (768~1023px)	9개<br />
✏️PC (1024px 이상)	12개<br />

```javascript
function showMenuItems(reset = false) {
```
📝 상품을 실제로 화면에 보여주는 함수<br />


```javascript
 const items = currentMenu.querySelectorAll("li");
```
✏️ 현재 메뉴 안에 있는 모든 상품 li 요소를 가져옵니다.<br />

```javascript
if (reset) currentCount = 0;
```
✏️ reset이 true이면<br />
👉 현재 보여준 개수를 0으로 초기화<br />

💡 메뉴를 바꿀 때 필요<br />

```javascript
const nextCount = currentCount + showCount;
```
📝 다음에 보여줄 개수 계산<br />

✏️현재 8개 보여졌고 showCount가 8이면<br />
👉 다음에 16개까지 보여주기<br />

```javascript
items.forEach((item, index) => {
  if (index < nextCount) {
    item.style.display = "block";
  }
});
```
📝 실제 상품 표시<br />

상품 리스트를 반복하면서<br />

✏️index < nextCount 인 상품만<br />
✏️display: block으로 보여줍니다.<br />

```javascript
currentCount = nextCount;
```
✏️ 현재 표시 개수 업데이트<br />

```javascript
if (currentCount >= items.length) {
  moreBtn.style.display = "none";
} else {
  moreBtn.style.display = "block";
}
```
모든 상품이 다 보여지면
👉 더보기 버튼 숨김

아직 남아있으면
👉 버튼 계속 표시

```javascript
showMenuItems(true);
```
📝 첫 화면 초기 표시<br />

페이지가 처음 열릴 때<br />

✏️ reset = true<br />
✏️ 초기 개수만 보여줌<br />

```javascript
moreBtn.addEventListener("click", () => {
  showMenuItems();
});
```

더보기 버튼을 누르면<br />

👉 showMenuItems() 실행<br />
👉 다음 상품들이 추가로 표시됨<br />

```javascript
document.querySelectorAll(".menu_list li").forEach((menu) => {
```
✏️ 각 메뉴 버튼에 클릭 이벤트를 추가<br />

```javascript
document.querySelector(".menu_list li.on").classList.remove("on");
```
✏️ 기존 선택 메뉴 제거<br />

```javascript
menu.classList.add("on");
```
✏️ 클릭한 메뉴 활성화<br />

```javascript
document.querySelector(".menuImg_list.on").classList.remove("on");
currentMenu = document.querySelector(`.${menu.dataset.menu}`);
currentMenu.classList.add("on");
```
✏️ 메뉴 버튼의 data-menu 값을 이용해<br />
✏️ 해당 메뉴 이미지 리스트를 표시합니다.<br />

ex)data-menu="coffee"<br />
👉 .coffee 리스트 표시<br />

```javascript
document
  .querySelectorAll(".filter_check input")
  .forEach((i) => (i.checked = false));
```
메뉴 변경 시<br />
👉 필터 체크 상태 초기화<br />

```javascript
showCount = getShowCount();
showMenuItems(true);
```
새 메뉴 기준으로<br />

👉 보여줄 개수 다시 계산<br />
👉 상품 다시 표시<br />

```javascript
window.addEventListener("resize", () => {
  showCount = getShowCount();
});
```
브라우저 크기가 바뀌면<br />
👉 보여줄 개수 다시 계산<br />

📑 전체 동작 흐름 정리<br />
<br />
🎈 화면 크기 확인 → 보여줄 개수 결정<br />
🎈 첫 화면에서 상품 일부만 표시<br />
🎈 더보기 클릭 → 상품 추가 표시<br />
🎈 모든 상품 표시 시 버튼 숨김<br />
🎈 메뉴 변경 시 상품 초기화<br />
🎈 화면 크기 변경 시 표시 개수 재계산<br />

🌟window.innerWidth → 반응형 동작 제어<br />
🌟currentCount 상태 관리 → 현재 표시 개수<br />
🌟display 조작 → 상품 노출 제어<br />
🌟dataset 활용 → 메뉴와 콘텐츠 연결<br />
🌟resize 이벤트 대응 → 화면 변경 대응<br />

window.innerWidth를 활용하여 화면 크기에 따라 상품 노출 개수를 다르게 설정하고,<br />
“더보기” 버튼 클릭 시 currentCount 상태를 관리하여 상품 리스트를 점진적으로 표시하는 반응형 UI 기능을 구현했습니다.<br />


<h1>체크박스 기반 필터링</h1> 
<img width="616" height="537" alt="filter01" src="https://github.com/user-attachments/assets/0fa5eb66-e58d-4a34-afe7-647133540020" /><br />

* 체크된 checkbox 값 가져오기<br />
* dataset으로 상품 필터 값 확인<br />
* 조건에 맞는 상품만 표시<br />
* 필터 적용 시 더보기 기능 비활성화<br />

```javascript
function applyFilter() {
 const currentMenu = getCurrentMenu();
 const items = currentMenu.querySelectorAll("li");
```
📝 체크박스 상태가 변경될 때 실행되는 필터링 함수<br />
✏️현재 선택된 메뉴 리스트 가져오기<br />
✏️해당 메뉴 안의 모든 상품(li) 가져오기<br />
ex)
.menuImg_list
  li (상품1)
  li (상품2)
  li (상품3)

```javascript
const checkedValues = Array.from(
  document.querySelectorAll(".filter_check input:checked"),
).map((input) => input.value);
```
✏️ 현재 체크된 필터 값을 배열로 만드는 코드<br />

```javascript
Array.from(...)
```
✏️querySelectorAll 결과는 NodeList라서<br />
✏️배열 메서드(map)를 사용하려면 배열로 변환<br />

```javascript
document.querySelectorAll(".filter_check input:checked"),
.map((input) => input.value)
```
✏️:checked → 체크된 input만 선택<br />
✏️value 값만 추출<br />

```javascript
if (checkedValues.length === 0) {
  showMenuItems(true);
  return;
}
```
체크된 필터가 하나도 없으면<br />

👉 필터를 적용하지 않고<br />
👉 기존 상품 리스트 상태로 복구<br />

```javascript
items.forEach((item) => {
 if (checkedValues.includes(item.dataset.filter)){
item.style.display = "block";
currentMenu.querySelector("ul").appendChild(item);
}
```
✏️ 모든 상품을 하나씩 검사.<br />
✏️ 체크된 필터와 상품 필터가 같으면 표시<br />
✏️ 필터가 같으면 상품 표시<br />


💡상품 순서 재정렬
```javascript
currentMenu.querySelector("ul").appendChild(item);
```
👉 필터된 상품들을 리스트 안에서 다시 정렬<br />
👉 조건에 맞는 상품을 리스트 맨 뒤로 이동(appendChild())<br />

```javascript
moreBtn.style.display = "none";
```
👉 필터가 적용된 상태에서는 더보기 버튼을 사용하지 않도록 숨김

``` 
document.querySelectorAll(".filter_check input").forEach((input) => {
  input.addEventListener("change", applyFilter);
});
```
👉 각 체크박스에 이벤트를 추가 
👉 체크 상태가 바뀔 때마다 필터가 실행(체크, 체크해제)


📑 전체 동작 흐름 정리<br />
<br />
🎈 사용자가 필터 체크<br />
🎈 change 이벤트 발생<br />
🎈 applyFilter 함수 실행<br />
🎈 체크된 필터 값 배열 생성<br />
🎈 상품 dataset 값과 비교<br />
🎈 조건 맞는 상품만 표시<br />
🎈 필터 적용 시 더보기 버튼 숨김<br />

체크박스 상태를 감지하여 선택된 필터 값들을 배열로 생성하고,<br /> 
각 상품의 data-filter 값과 비교하여 조건에 맞는 상품만 표시하는 필터링 기능을 구현했습니다.<br />
상품 리스트는 "더보기" 버튼으로 점진적으로 표시되도록 구현했으며, <br />
필터가 적용된 경우에는 조건에 맞는 상품을 한 번에 표시하도록 설계했습니다. <br />

<h1>스크롤 기반 구매창 노출 및 수량계산 기능</h1>
<img width="452" height="520" alt="디테일스크롤01" src="https://github.com/user-attachments/assets/bb49bc26-43e7-4dc8-90e7-4e9a6ed03b20" /><br />
<img width="552" height="497" alt="디테일스크롤02" src="https://github.com/user-attachments/assets/697d3016-182e-4dac-9c45-58e6edef2503" /><br />
<img width="566" height="594" alt="디테일스크롤03" src="https://github.com/user-attachments/assets/87b9429d-b056-449b-b641-3b0ae985bb5f" /><br />

``` 
// 페이지 상단에서 400px 이상 스크롤 시 구매 영역 표시
gsap.to(buyLine, {
  opacity: 1,
  duration: 0.3,
  scrollTrigger: {
    trigger: document.body,
    start: "top -400",
    toggleActions: "play reverse play reverse",
  },
});

// MD상품 영역(recommendation)이 나타나면 구매 영역 다시 숨김
gsap.to(buyLine, {
  opacity: 0,
  duration: 0.3,
  scrollTrigger: {
    trigger: ".recommendation",
    start: "top bottom",
    end: "bottom top",
    toggleActions: "play reverse play reverse",
  },
});
```
✏️ 스크롤 위치에 따라 구매 UI가 자연스럽게 등장/숨김 처리되도록 구현 

```
<div class="buyLine" data-price="14900">
-> const price = Number(line.dataset.price);
```
✏️ 상품 가격을 HTML의 data-price 속성을 통해 가져오도록 구성<br />
✏️ JavaScript에서 data-price으로 가격 데이터 사용<br />

```
const buyLines = document.querySelectorAll('.buyLine');
buyLines.forEach((line) => {
```
✏️  페이지에 동일한 구매 UI가 여러 개 있을 수 있기 때문에<br />
querySelectorAll을 사용해 각 요소를 반복 처리하도록 구현<br />

```
function update() {
  const count = Number(input.value);
  totalNum.textContent = count;
  totalSum.textContent = (price * count).toLocaleString() + '원';
}
```
✏️ 수량이 변경될 때마다 총 수량과 총 가격을 업데이트하는 함수<br />
✏️ 총 가격이 개수 증가수 * 가격으로 반환<br />
✏️ toLocaleString()을 사용하여 가격에 천 단위 콤마가 자동 적용<br />

```
// 수량 증가버튼
addBtn.addEventListener('click', () => {
  input.value = Number(input.value) + 1;
  update();
});

// 수량 감소버튼
subBtn.addEventListener('click', () => {
  if(input.value > 1){
    input.value = Number(input.value) - 1;
    update();
  }
});
```
✏️ 버튼 클릭 시 수량이 변경되고, update() 함수를 호출하여 가격이 다시 계산<br />
✏️ 수량 감소 시에는 1 이하로 내려가지 않도록 제한<br />

📑 전체 동작 흐름 정리<br />
<br />
🎈GSAP ScrollTrigger를 활용한 스크롤 기반 UI 인터랙션 구현<br />
🎈dataset를 활용한 상품 가격 관리<br />
🎈이벤트 기반 수량 변경 및 총 가격 자동 계산<br />
🎈동일한 구조의 UI 반복 처리 구조 구현<br />

사용자 스크롤 흐름에 맞춰 GSAP의 ScrollTrigger를 사용하여 특정 스크롤 위치에 도달하면 요소의 opacity가 변경되도록 설정했습니다.<br />
상품 상세 페이지에서 자연스럽게 구매 행동으로 이어지도록 구성했습니다.<br />

🚀 트러블 슈팅<br />
1️⃣ 메인 배너 슬라이드 구현 문제<br />

할리스 반응형 사이트 구현 중, 가장 기억에 남는 문제는 메인 배너 슬라이드였습니다.<br />
처음 구현할 때 offset을 사용해 너비를 계산했더니 첫 번째 배너 이미지만 보이고, 다음 이미지는 백지로 나타나는 현상이 발생했고,<br />
마지막 슬라이드에서는 뚝뚝 끊기는 문제와 첫 번째 슬라이드로 돌아갈 때 뒤로 재생되는 현상도 있었습니다.<br />

* 너비 계산 문제<br />

처음에는 offsetWidth로 슬라이드 너비를 계산했으나, margin과 border가 포함되지 않아 실제 화면에 맞는 스크롤 위치 계산이 안 됨.<br />
: scrollWidth와 slider.clientWidth를 활용하여 실제 스크롤 가능한 전체 너비와 현재 보이는 영역 너비를 기준으로 슬라이드 위치를 계산.<br />

* 현재 슬라이드 위치 추적 문제<br />

여러 슬라이드 중 어떤 것이 화면에 가장 가까운지 정확하게 계산할 필요가 있었음.<br />
: 아래 코드로 화면과 가장 가까운 슬라이드 index를 계산했습니다.<br />

```
let closestIndex = 0;
let minDistance = Infinity;

slides.forEach((slide, index) => {
  const distance = Math.abs(slide.offsetLeft - slider.scrollLeft);

  if (distance < minDistance) {
    minDistance = distance;
    closestIndex = index;
  }
});

if (closestIndex !== currentPage) {
  currentPage = closestIndex;
  updateCurrentPage(currentPage);
}
```
Infinity는 처음 최소값을 비교할 때 사용되었습니다.<br />
처음엔 어떤 값도 없기 때문에, 무한대부터 시작해서 실제 거리(distance)가 더 작으면 갱신하는 방식입니다.<br />
이렇게 하면 스크롤 위치와 가장 가까운 슬라이드를 정확하게 찾을 수 있습니다.<br />

👉 scrollWidth와 slider.clientWidth가 슬라이드 구현에서 가장 핵심적인 메서드라는 점을 체감했습니다.<br />
~~~
scrollWidth: 내부 컨텐츠 전체 너비 (margin 포함 여부는 브라우저 차이가 있음)
clientWidth: 보이는 영역 너비 (padding 포함, scrollbar 제외)
~~~

👉 화면에 가장 가까운 슬라이드를 계산하고 현재 페이지를 업데이트하는 로직을 이해하면서,<br />
    단순히 offset만으로는 UI 동작이 완벽하지 않다는 점을 배웠습니다.<br />
👉 결과적으로 스크롤 기반 슬라이드 구현 원리와 위치 계산 로직을 익히는 계기가 되었습니다.<br />
<br />
📍 Git Page 링크:  https://bluecode62.github.io/cafe-responsive-web/


