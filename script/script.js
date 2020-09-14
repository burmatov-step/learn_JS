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

  // Замена фотографий
  const commandImg = () => {
    const imgCommand = document.querySelectorAll(".command__photo");
    console.log(imgCommand);
    imgCommand.forEach((item) => {
      const images = item.attributes.src.nodeValue;
      console.dir(item.attributes.src.nodeValue);
      item.addEventListener("mouseenter", (e) => {
        e.target.src = e.target.dataset.img;
      });
      item.addEventListener("mouseleave", (e) => {
        e.target.src = images;
      });
    });
  };
  commandImg();

  // проверка цифр в калькуляторе

  const renderNumber = () => {
    const inputNum = document.querySelectorAll(".calc-block> input");
    inputNum.forEach((item) => {
      item.addEventListener("input", () => {
        item.value = item.value.replace(/\D/g, "");
      });
    });
  };

  renderNumber();

  // калькулятор

  const calc = (price = 100) => {
    const calcBlock = document.querySelector(".calc-block"),
      calcType = document.querySelector(".calc-type"),
      calcSquare = document.querySelector(".calc-square"),
      calcDay = document.querySelector(".calc-day"),
      calcCount = document.querySelector(".calc-count"),
      totalValue = document.getElementById("total");

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;
      const typeValye = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }
      if (typeValye && squareValue) {
        total = price * typeValye * squareValue * countValue * dayValue;
      }
      let count = 0;
      let interval = setInterval(() => {
        if (count >= total) {
          clearInterval(interval);
          count = Math.floor(total);
        }
        totalValue.textContent = count;
        count += 20;
      }, 2);
    };

    calcBlock.addEventListener("change", (e) => {
      const target = e.target;
      if (
        target === calcType ||
        target === calcSquare ||
        target === calcDay ||
        target === calcCount
      ) {
        countSum();
      }
    });
  };

  calc(100);

  // send-ajax-form

  const sentForm = () => {
    const errorMessage = "Что то пошло не так",
      successMesage = "Спасибо! мы скоро с вами свяжемся";
    let loadMessage = document.createElement("div");
    loadMessage.id = "cube-loader";
    loadMessage.innerHTML = `
    <div class="caption">
      <div class="cube-loader">
        <div class="cube loader-1"></div>
        <div class="cube loader-2"></div>
        <div class="cube loader-4"></div>
        <div class="cube loader-3"></div>
      </div>
    </div>

    `;
    const form = document.getElementById("form1"),
      form2 = document.getElementById("form2");
    const input1 = form.querySelectorAll("input"),
      input2 = form2.querySelectorAll("input");
    const validate = (e) => {
      if (e.target.type === "tel") {
        e.target.value = e.target.value.match(/\+?[0-9]*/);
      } else if (e.target.type !== "email") {
        e.target.value = e.target.value.match(/[а-яА-Я ]*/);
      }
    };

    form.addEventListener("input", (e) => {
      validate(e);
    });

    form2.addEventListener("input", (e) => {
      validate(e);
    });

    const statusMessage = document.createElement("div");

    form2.addEventListener("submit", (e) => {
      statusMessage.textContent = "";
      console.log(e);
      e.preventDefault();
      form2.appendChild(statusMessage);

      statusMessage.appendChild(loadMessage);
      const formData = new FormData(form2);
      let body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });

      const succs = () => {
        statusMessage.textContent = successMesage;
      };
      const err = () => {
        statusMessage.textContent = errorMessage;
      };

      postData(body).then(succs).catch(err);
      input2.forEach((e) => {
        e.value = "";
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      statusMessage.textContent = "";
      form.appendChild(statusMessage);
      statusMessage.appendChild(loadMessage);
      const formData = new FormData(form);
      let body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });

      const succs = () => {
        statusMessage.textContent = successMesage;
      };
      const err = () => {
        statusMessage.textContent = errorMessage;
      };

      postData(body).then(succs).catch(err);

      input1.forEach((e) => {
        e.value = "";
      });
    });

    const postData = (body) => {
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.addEventListener("readystatechange", () => {
          if (request.readyState !== 4) {
            return;
          }
          if (request.status === 200) {
            resolve();
          } else {
            reject(request.status);
          }
        });
        request.open("POST", "server.php");
        request.setRequestHeader("Content-Type", "aplication/json");

        request.send(JSON.stringify(body));
      });
    };
  };

  sentForm();
});

let ddd = document.querySelector(".description");
console.log(ddd);
let loadMessage = document.createElement("div");
ddd.appendChild(loadMessage);
