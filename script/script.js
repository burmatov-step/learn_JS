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
      let idInterval;

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

    if (getTimeRemaining().timeRemaining > 0) {
      idInterval = setInterval(updateClock, 1000);
    } else {
      clearInterval(idInterval);
    }
  }

  countTimer("09 september 2020");

  const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu"),
      menu = document.querySelector("menu"),
      closeBtn = document.querySelector(".close-btn"),
      menuItems = menu.querySelectorAll("ul>li"),
      serviceBlock = document.querySelector("#service-block"),
      portfolio = document.querySelector("#portfolio"),
      calc = document.querySelector("#calc"),
      command = document.querySelector("#command"),
      connect = document.querySelector("#connect"),
      linkMouse = document.querySelector('[href="#service-block"]');

    const handlerMenu = () => {
      menu.classList.toggle("active-menu");
    };
    btnMenu.addEventListener("click", () => {
      handlerMenu();
    });

    closeBtn.addEventListener("click", () => {
      handlerMenu();
    });

    menuItems.forEach((item) => {
      let link = item.querySelector("a");

      link.addEventListener("click", (e) => {
        e.preventDefault();
        if (link.hash === "#service-block") {
          let num = serviceBlock.offsetTop;
          console.log(num);
          requestAnimationFrame(() => {
            scroll(num);
          });
        }
        if (link.hash === "#portfolio") {
          requestAnimationFrame(() => {
            let num = portfolio.offsetTop;
            console.log(num);
            scroll(num);
          });
        }
        if (link.hash === "#calc") {
          requestAnimationFrame(() => {
            let num = calc.offsetTop;

            scroll(num);
          });
        }
        if (link.hash === "#command") {
          requestAnimationFrame(() => {
            let num = command.offsetTop;

            scroll(num);
          });
        }

        if (link.hash === "#connect") {
          requestAnimationFrame(() => {
            let num = connect.offsetTop;
            scroll(num);
          });
        }
      });
      item.addEventListener("click", () => {
        handlerMenu();
      });
    });

    //  Функция скроллинга
    function scroll(end) {
      let timmer = setTimeout(() => {
        let aaa = requestAnimationFrame(() => {
          scroll(end);
        });
        if (document.documentElement.scrollTop === end) {
          cancelAnimationFrame(aaa);
          clearTimeout(timmer);
        } else if (
          end - document.documentElement.scrollTop < 45 &&
          end - document.documentElement.scrollTop >= 0
        ) {
          document.documentElement.scrollTop += 1;
        } else if (
          document.documentElement.scrollTop - end < 45 &&
          document.documentElement.scrollTop - end >= 0
        ) {
          document.documentElement.scrollTop -= 1;
        } else if (document.documentElement.scrollTop > end) {
          document.documentElement.scrollTop -= 35;
        } else if (document.documentElement.scrollTop < end) {
          document.documentElement.scrollTop += 35;
        }
      }, 10);
    }

    // скрол мыши на первом экране
    linkMouse.addEventListener("click", (e) => {
      e.preventDefault();
      let num = serviceBlock.offsetTop;

      requestAnimationFrame(() => {
        scroll(num);
      });
    });
  };

  toggleMenu();

  // popup

  const togglePopup = () => {
    const popup = document.querySelector(".popup"),
      popupBtn = document.querySelectorAll(".popup-btn"),
      popupClose = document.querySelector(".popup-close"),
      popupContent = document.querySelector(".popup-content");

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
    popupClose.addEventListener("click", () => {
      transEl();
      popup.style.display = "none";
    });
  };

  togglePopup();
});
