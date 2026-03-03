document.addEventListener("DOMContentLoaded", () => {
  const open = document.querySelector(".arcodian");
  const subMenu = document.querySelector(".sub_menu");
  const close = document.querySelector(".close_box");
  const menuItems = document.querySelectorAll(".subMenu_list > li");

  open.addEventListener("click", () => {
    subMenu.style.transform = "translateX(0px)";
  });
  close.addEventListener("click", () => {
    subMenu.style.transform = "translateX(300px)";
  });

  menuItems.forEach((item) => {
    const inside = item.querySelector(".inside");

    item.addEventListener("click", (e) => {
      e.stopPropagation();

      document.querySelectorAll(".inside").forEach((menu) => {
        if (menu !== inside) {
          menu.style.maxHeight = null;
        }
      });

      if (inside.style.maxHeight) {
        inside.style.maxHeight = null;
      } else {
        inside.style.maxHeight = inside.scrollHeight + "px";
      }
    });
  });
  // 아코디언 서브메뉴 열기닫기

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const currentPageEl = document.querySelector(".current_page");
  const totalPageEl = document.querySelector(".total_page");
  const slides = document.querySelectorAll(".img_box li");
  const slider = document.querySelector(".img_box ul");

  let currentPage = 0;
  const totalSlides = slides.length;
  const firstClone = slides[0].cloneNode(true);
  slider.appendChild(firstClone);

  totalPageEl.textContent = totalSlides;

  function updateCurrentPage(index) {
    currentPageEl.textContent = index + 1;
  }

  prevBtn.addEventListener("click", () => {
    scrollToSlide(currentPage - 1);
  });

  nextBtn.addEventListener("click", () => {
    scrollToSlide(currentPage + 1);
  });

  slider.addEventListener("scroll", () => {
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

    if (slider.scrollLeft < 0) {
      slider.scrollLeft = 0;
    }

    if (slider.scrollLeft > maxScrollLeft) {
      slider.scrollLeft = maxScrollLeft;
    }

    if (slider.scrollLeft >= maxScrollLeft) {
      slider.scrollLeft = 0;
      currentPage = 0;
      updateCurrentPage(0);
    }

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
  });

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

  scrollToSlide(0);

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
    }
  }

  let autoSlideInterval = setInterval(autoSlide, 3000);

  slider.addEventListener("touchstart", () => {
    clearInterval(autoSlideInterval);
  });

  slider.addEventListener("touched", () => {
    autoSlideInterval = setInterval(autoSlide, 3000);
  });

  slider.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval);
  });

  slider.addEventListener("mouseleave", () => {
    autoSlideInterval = setInterval(autoSlide, 3000);
  });

  //메인배너 스크롤 슬라이드, 스크롤 슬라이드 페이지수

  const btns = document.querySelectorAll(".btn_category li");
  const categoryBtns = document.querySelectorAll(".btn_category li");
  const allMenus = document.querySelectorAll(".newMenu_list");
  let activeMenu = document.querySelector(".newMenu_list");

  allMenus[0].style.display = "block";

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((b) => {
        b.classList.remove("active");
        b.querySelector(".btn_category .icon_img").classList.remove("active");
      });
      btn.classList.add("active");
      btn.querySelector(".icon_img").classList.add("active");
    });
  });

  categoryBtns.forEach((label, idx) => {
    label.addEventListener("click", () => {
      allMenus.forEach((menu) => (menu.style.display = "none"));
      activeMenu = allMenus[idx];
      activeMenu.style.display = "block";
    });
  });
  // 신메뉴 카테고리 버튼과 리스트 활성화

  const rightBtn = document.querySelector(".arrow_box .right");
  const leftBtn = document.querySelector(".arrow_box .left");

  function getItemsPerMove() {
    if (window.innerWidth >= 769) {
      return 3;
    } else if (window.innerWidth >= 601) {
      return 2;
    } else {
      return 1;
    }
  }

  rightBtn.addEventListener("click", () => {
    const slideWidth = activeMenu.querySelector("li").offsetWidth + 5;
    const moveCount = getItemsPerMove();

    activeMenu.scrollLeft += slideWidth * moveCount;
  });

  leftBtn.addEventListener("click", () => {
    const slideWidth = activeMenu.querySelector("li").offsetWidth + 5;
    const moveCount = getItemsPerMove();

    activeMenu.scrollLeft -= slideWidth * moveCount;
  });
  // 신메뉴 화살표버튼 활성화
  
  const eventBox = document.querySelector(".pc_list");
  const eventImgs = document.querySelectorAll(".pc_list li");
  const eventLeft = document.querySelector(".eventLeft");
  const eventRight = document.querySelector(".eventRight");
  const total = eventImgs.length;
  let currentIndex = 0;
  let timer;

  eventRight.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex >= total) {
      currentIndex = 0;
    }

    eventImgs.forEach((list) => {
      list.classList.remove("on");
    });

    eventImgs[currentIndex].classList.add("on");
  });

  eventLeft.addEventListener("click", () => {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = total - 1;
    }
    eventImgs.forEach((list) => {
      list.classList.remove("on");
    });
    eventImgs[currentIndex].classList.add("on");
  });

  function showSlide(index) {
    eventImgs.forEach((li) => li.classList.remove("on"));
    eventImgs[index].classList.add("on");
  }

  function stopAuto() {
    clearInterval(timer);
  }
  function goNext() {
    timer = setInterval(() => {
      currentIndex++;

      if (currentIndex >= total) {
        currentIndex = 0;
      }

      showSlide(currentIndex);
    }, 2000);
  }
  goNext();

  eventBox.addEventListener("mouseenter", () => {
    stopAuto();
  });
  eventBox.addEventListener("mouseleave", () => {
    goNext();
  });

  // 이벤트 리스트 버튼 활성화
  const input = document.querySelector(".searchbar");
  const clickBtn = document.querySelector(".search_icon");

  function search() {
    const keyword = input.value.trim();
    if (!keyword) return;
    window.open(
      `https://map.naver.com/v5/search/${encodeURIComponent(keyword)}`,
      "_blank",
    );
  }

  clickBtn.addEventListener("click", search);

  input.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
      search();
    }
  })
  // 매장찾기 검색창 활성화

  // 모달창 닫기
  const modal = document.getElementById("mobileModal");
  const closeButtons = document.querySelectorAll(".close");

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  });

  modal.addEventListener("click", (e) => {
    if(e.target === modal) {
      modal.style.display = "none";
    }
  })
});
