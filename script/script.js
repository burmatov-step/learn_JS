window.addEventListener("DOMContentLoaded", () => {
  function countTimer(deadline) {
    let timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);

      return {
        timeRemaining,

        hours,

        minutes,

        seconds,
      };
    }

    function updateClock() {
      let timer = getTimeRemaining();

      timer.hours < 10
        ? (timerHours.textContent = "0" + timer.hours)
        : (timerHours.textContent = timer.hours);

      timer.minutes < 10
        ? (timerMinutes.textContent = "0" + timer.minutes)
        : (timerMinutes.textContent = timer.minutes);

      timer.seconds < 10
        ? (timerSeconds.textContent = "0" + timer.seconds)
        : (timerSeconds.textContent = timer.seconds);
    }
    let idInterval;

    if (getTimeRemaining().timeRemaining > 0) {
      idInterval = setInterval(updateClock, 1000);
    } else {
      clearInterval(idInterval);
    }
  }

  countTimer("09 september 2020");

  const toggleMenu = () => {
    const menu = document.querySelector("menu"),
      closeBtn = document.querySelector(".close-btn"),
      serviceBlock = document.querySelector("#service-block"),
      portfolio = document.querySelector("#portfolio"),
      calc = document.querySelector("#calc"),
      command = document.querySelector("#command"),
      connect = document.querySelector("#connect"),
      main = document.querySelector("main");

    const handlerMenu = () => {
      menu.classList.toggle("active-menu");
    };

    //  Функция скроллинга
    function scrollTo(elem) {
      window.scroll({
        left: 0,
        top: elem.offsetTop,
        behavior: "smooth",
      });
    }

    document.body.addEventListener("click", (e) => {
      let target = e.target;
      const closeMenu = target.closest("menu");

      // закрытие при клике мимо меню
      if (menu.classList.contains("active-menu") && !closeMenu) {
        handlerMenu();
      }
      if (target.closest(".menu")) handlerMenu();
      // скрол на второй блок
      if (target.closest('[href="#service-block"]')) {
        e.preventDefault();
        let num = serviceBlock;

        scrollTo(num);
      }

      // закрытие при нажатии на пункт меню
      if (target.closest("menu>li")) {
        e.preventDefault();
        handlerMenu();
      }
      // закрытие при нажатии на крестик
      if (target === closeBtn) {
        handlerMenu();
      }
      // скролл при клике на пункты в меню
      if (target.hash === "#service-block") {
        let num = serviceBlock;
        scrollTo(num);
      }
      if (target.hash === "#portfolio") {
        let num = portfolio;
        scrollTo(num);
      }
      if (target.hash === "#calc") {
        let num = calc;
        scrollTo(num);
      }
      if (target.hash === "#command") {
        let num = command;
        scrollTo(num);
      }

      if (target.hash === "#connect") {
        let num = connect;
        scrollTo(num);
      }
    });
  };

  toggleMenu();

  // popup

  const togglePopup = () => {
    const popup = document.querySelector(".popup"),
      popupBtn = document.querySelectorAll(".popup-btn"),
      popupClose = document.querySelector(".popup-close"),
      popupContent = document.querySelector(".popup-content");

    popup.addEventListener("click", (event) => {
      let target = event.target;
      if (target.classList.contains("popup-close")) {
        popup.style.display = "none";
      } else {
        target = target.closest(".popup-content");
        if (!target) {
          popup.style.display = "none";
        }
      }
    });

    function transEl() {
      if (document.documentElement.clientWidth > 768) {
        popupContent.style.transform = `translateX(-200px)`;
      } else {
        popupContent.style.transform = `translateX(-50px)`;
      }
    }

    popupBtn.forEach((item) => {
      item.addEventListener("click", () => {
        transEl();
        popup.style.display = "block";
        let start = Date.now();
        let timer = setInterval(() => {
          let timerPassed = Date.now() - start;
          if (
            timerPassed >= 500 ||
            document.documentElement.clientWidth < 768
          ) {
            clearInterval(timer);
            return;
          }
          draw(timerPassed);
        }, 20);
        function draw(timerPassed) {
          popupContent.style.transform = `translateX(${
            -200 + timerPassed / 5
          }px)`;
        }
      });
    });
  };

  togglePopup();

  // табы

  const tabs = () => {
    const tabHeader = document.querySelector(".service-header"),
      tab = tabHeader.querySelectorAll(".service-header-tab"),
      tabContent = document.querySelectorAll(".service-tab");
    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add("active");
          tabContent[i].classList.remove("d-none");
        } else {
          tabContent[i].classList.add("d-none");
          tab[i].classList.remove("active");
        }
      }
    };
    tabHeader.addEventListener("click", (event) => {
      let target = event.target;
      target = target.closest(".service-header-tab");
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  tabs();
});

// слайдер

const slider = () => {
  const slide = document.querySelectorAll(".portfolio-item"),
    btn = document.querySelector(".portfolio-btn"),
    dots = document.querySelector(".portfolio-dots"),
    slider = document.querySelector(".portfolio-content");

  let currentSlide = 0,
    interval,
    numDot = slide.length;

  const createDot = (el) => {
    let dote = document.createElement("li");
    dote.classList.add("dot");
    if (el === numDot) {
      dote.classList.add("dot-active");
    }
    dots.append(dote);
    el--;
    if (el !== 0) createDot(el);
  };
  createDot(numDot);
  const dot = document.querySelectorAll(".dot");

  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };

  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };

  const autoPlaySlide = () => {
    prevSlide(slide, currentSlide, "portfolio-item-active");
    prevSlide(dot, currentSlide, "dot-active");

    currentSlide++;
    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    nextSlide(slide, currentSlide, "portfolio-item-active");
    nextSlide(dot, currentSlide, "dot-active");
  };

  const startSlide = (time = 3000) => {
    interval = setInterval(autoPlaySlide, time);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  slider.addEventListener("click", (event) => {
    event.preventDefault();
    let target = event.target;
    if (!target.matches(".portfolio-btn, .dot")) {
      return;
    }
    prevSlide(slide, currentSlide, "portfolio-item-active");
    prevSlide(dot, currentSlide, "dot-active");
    if (target.matches("#arrow-right")) {
      currentSlide++;
    } else if (target.matches("#arrow-left")) {
      currentSlide--;
    } else if (target.matches(".dot")) {
      dot.forEach((item, index) => {
        if (item === target) {
          currentSlide = index;
        }
      });
    }

    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    if (currentSlide < 0) {
      currentSlide = slide.length - 1;
    }
    nextSlide(slide, currentSlide, "portfolio-item-active");
    nextSlide(dot, currentSlide, "dot-active");
  });

  slider.addEventListener("mouseover", (event) => {
    if (
      event.target.matches(".portfolio-btn") ||
      event.target.matches(".dot")
    ) {
      stopSlide();
    }
  });
  slider.addEventListener("mouseout", (event) => {
    if (
      event.target.matches(".portfolio-btn") ||
      event.target.matches(".dot")
    ) {
      startSlide();
    }
  });

  startSlide(1500);
};
slider();
