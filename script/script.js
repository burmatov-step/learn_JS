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

    if (getTimeRemaining().timeRemaining > 0) {
      let idInterval = setInterval(updateClock, 1000);
    } else {
      clearInterval(idInterval);
    }
  }

  countTimer("09 september 2020");

  const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu"),
      menu = document.querySelector("menu"),
      closeBtn = document.querySelector(".close-btn"),
      menuItems = menu.querySelectorAll("ul>li");

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
      item.addEventListener("click", () => {
        handlerMenu();
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

console.dir(document);
