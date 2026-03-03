document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menuImg_list li");
  const menus = document.querySelectorAll(".menu_list li");
  const menuLists = document.querySelectorAll(".menuImg_list");
  const filterBoxes = document.querySelectorAll(".filter_box");
  const bannerImg = document.querySelector(".subBanner_img");
  const bannerTitle = document.querySelector(".Menu_title p");
  const bannerWord = document.querySelector(".Menu_title .shorts");
  const breadcrumbLast = document.querySelector(".bread_crum span:last-child");

  const bannerData = {
    newMenu: {
      img: "subBanner01",
      title: "HOLLYS_SEASONAL MENU",
      word: "할리스만의 새로운 신메뉴 이야기",
      breadcrumb: "신메뉴",
    },
    drinkMenu: {
      img: "subBanner02",
      title: "HOLLYS_BEVERAGE",
      word: "할리스만와 함께하는 하루의 시작",
      breadcrumb: "음료",
    },
    foodMenu: {
      img: "subBanner03",
      title: "HOLLYS_FOOD",
      word: "할리스의 특별 수제푸드로 행복감상",
      breadcrumb: "푸드",
    },
    MDmenu: {
      img: "subBanner04",
      title: "HOLLYS_MD",
      word: "할리스의 전용굿즈와 커피제품 공간",
      breadcrumb: "MD",
    },
  };

  menus.forEach((menu) => {
    menu.addEventListener("click", () => {
      const target = menu.dataset.menu;
      const data = bannerData[target];

      menus.forEach((m) => m.classList.remove("on"));
      menu.classList.add("on");

      menuLists.forEach((list) => list.classList.remove("on"));
      document.querySelector(`.${target}`).classList.add("on");

      filterBoxes.forEach((box) => box.classList.remove("on"));
      document.querySelector(`.${target}_filter`).classList.add("on");
      bannerImg.style.backgroundImage = `url(./images/${data.img}.png)`;
      bannerTitle.textContent = data.title;
      bannerWord.textContent = data.word;
      breadcrumbLast.textContent = data.breadcrumb;
    });
  });
  // 메뉴 카테고리와 필터창 활성화

  menuItems.forEach((item) => {
    const imgBox = item.querySelector(".menu_imgBox");
    const shadow = item.querySelector(".menu_shadow");
    const newMark = item.querySelector(".newMark");

    imgBox.addEventListener("click", () => {
      const isOpen = shadow.classList.contains("open");

      document.querySelectorAll(".menu_shadow").forEach((s) => {
        s.classList.remove("open");
        if (newMark) {
          newMark.style.display = "block";
        }
      });

      if (!isOpen) {
        shadow.classList.add("open");
        if (newMark) {
          newMark.style.display = "none";
        }
      }
    });
  });
  // 메뉴 클릭 그림자 텍스트 활성화
  
  const moreBtn = document.querySelector(".more_btn");
  let currentCount = 0;
  let showCount = getShowCount();
  let currentMenu = document.querySelector(".menuImg_list.on");

  function getCurrentMenu() {
    return document.querySelector(".menuImg_list.on");
  }
  function getShowCount() {
    const width = window.innerWidth;

    if (width < 768) return 8;
    if (width < 1024) return 9;
    return 12;
  }

  function showMenuItems(reset = false) {
    const items = currentMenu.querySelectorAll("li");

    if (reset) currentCount = 0;

    const nextCount = currentCount + showCount;

    items.forEach((item, index) => {
      if (index < nextCount) {
        item.style.display = "block";
      }
    });

    currentCount = nextCount;

    if (currentCount >= items.length) {
      moreBtn.style.display = "none";
    } else {
      moreBtn.style.display = "block";
    }
  }

  showMenuItems(true);

  moreBtn.addEventListener("click", () => {
    showMenuItems();
  });

  document.querySelectorAll(".menu_list li").forEach((menu) => {
    menu.addEventListener("click", () => {
      document.querySelector(".menu_list li.on").classList.remove("on");
      menu.classList.add("on");

      document.querySelector(".menuImg_list.on").classList.remove("on");
      currentMenu = document.querySelector(`.${menu.dataset.menu}`);
      currentMenu.classList.add("on");

      document
        .querySelectorAll(".filter_check input")
        .forEach((i) => (i.checked = false));

      showCount = getShowCount();
      showMenuItems(true);
    });
  });

  window.addEventListener("resize", () => {
    showCount = getShowCount();
  });
  //더보기 버튼 반응형 구현 

  function applyFilter() {
    const currentMenu = getCurrentMenu();
    const items = currentMenu.querySelectorAll("li");

    const checkedValues = Array.from(
      document.querySelectorAll(".filter_check input:checked"),
    ).map((input) => input.value);

    if (checkedValues.length === 0) {
      showMenuItems(true);
      return;
    }

    items.forEach((item) => {
      if (checkedValues.includes(item.dataset.filter)) {
        item.style.display = "block";
        currentMenu.querySelector("ul").appendChild(item);
      } else {
        item.style.display = "none";
      }
    });
    moreBtn.style.display = "none";
  }

  document.querySelectorAll(".filter_check input").forEach((input) => {
    input.addEventListener("change", applyFilter);
  });
  //필터링 구현
});
