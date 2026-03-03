gsap.registerPlugin(ScrollTrigger);

const buyLine = document.querySelector(".buyLine");

// 400px 지나면 나타남
gsap.to(buyLine, {
  opacity: 1,
  duration: 0.3,
  scrollTrigger: {
    trigger: document.body,
    start: "top -400",
    toggleActions: "play reverse play reverse",
  },
});

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

/************** gsap *********************/

const sub = document.querySelector(".sub");
const add = document.querySelector(".add");
const countNum = document.querySelector(".countNum");
const totalNum = document.querySelector(".totalNum");
const totalSum = document.querySelector(".totalSum");

const price = Number(buyLine.dataset.price);

add.addEventListener("click", () => {
  let count = Number(countNum.value);
  count++;

  countNum.value = count;
  totalNum.textContent = `${count}개`;
  totalSum.textContent = (count * price).toLocaleString() + "원";
});

sub.addEventListener("click", () => {
  let count = Number(countNum.value);

  if (count <= 1) return;

  count--;

  countNum.value = count;
  totalNum.textContent = `${count}개`;
  totalSum.textContent = (count * price).toLocaleString() + "원";
});

const buyLines = document.querySelectorAll('.buyLine');

buyLines.forEach((line) => {
  const price = Number(line.dataset.price);

  const addBtn = line.querySelector('.add');
  const subBtn = line.querySelector('.sub');
  const input = line.querySelector('.countNum');
  const totalNum = line.querySelector('.totalNum');
  const totalSum = line.querySelector('.totalSum');

  function update() {
    const count = Number(input.value);
    totalNum.textContent = count;
    totalSum.textContent = (price * count).toLocaleString() + '원';
  }

  addBtn.addEventListener('click', () => {
    input.value = Number(input.value) + 1;
    update();
  });

  subBtn.addEventListener('click', () => {
    if(input.value > 1){
      input.value = Number(input.value) - 1;
      update();
    }
  });

  update();
})
/************** 수량 더하기 빼기 버튼 *********************/

const detailImg = document.querySelector(".MDitem_detailImg");
const overlay = document.querySelector(".gradient-overlay");
const moreBtn = document.querySelector(".detailMore_btn");
const btnTxt = document.querySelector(".btnTxt");
const icon = document.querySelector(".detailMore_btn i");

moreBtn.addEventListener("click", () => {
  detailImg.classList.toggle("on");

  if (detailImg.classList.contains("on")) {
    overlay.style.display = "none";
    btnTxt.textContent = "자세히 보기 닫기";
    icon.classList.replace("fa-angle-down", "fa-angle-up");
  } else {
    overlay.style.display = "block";
    btnTxt.textContent = "자세히 보기";
    icon.classList.replace("fa-angle-uo", "fa-angle-down");
  }
});
/************** 자세히 보기 버튼 *********************/
const MDlist = document.querySelector(".otherMD");
const rightBtn = document.querySelector(".rightBtn");
const leftBtn = document.querySelector(".leftBtn");
const indicators = document.querySelectorAll(".check div");
let currentIndex = 0;

function getItemsPerMove() {
  if (window.innerWidth >= 769) {
    return 4;
  } else if (window.innerWidth >= 601) {
    return 3;
  } else {
    return 2;
  }
}

function updateIndicator(index) {
  indicators.forEach((dot, i) => {
    dot.classList.toggle("on", i === index);
  });
}

rightBtn.addEventListener("click", () => {
  const slideWidth = MDlist.querySelector("li").offsetWidth + 10;
  const moveCount = getItemsPerMove();
  currentIndex++;

  if (currentIndex >= indicators.length) {
    currentIndex = indicators.length - 1;
  }

  updateIndicator(currentIndex);

  MDlist.scrollLeft += slideWidth * moveCount;

  if (MDlist.scrollLeft > 0);
  leftBtn.style.opacity = "1";

  if (MDlist.scrollLeft + MDlist.clientWidth >= MDlist.scrollWidth - 1) {
    rightBtn.style.opacity = "0";
  }
});

leftBtn.addEventListener("click", () => {
  const slideWidth = MDlist.querySelector("li").offsetWidth + 10;
  const moveCount = getItemsPerMove();
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = 0;
  }
  updateIndicator(currentIndex);

  MDlist.scrollLeft -= slideWidth * moveCount;
  if (MDlist.scrollLeft <= 0) {
    leftBtn.style.opacity = "0";
  }

  rightBtn.style.opacity = "1";
});
/************** 관련 MD상품 리스트 화살표버튼 기능*********************/
