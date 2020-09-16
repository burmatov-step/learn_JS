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
        if (timerPassed >= 500 || document.documentElement.clientWidth < 768) {
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

export default togglePopup;