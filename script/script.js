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
        hours = Math.floor((timeRemaining / 60 / 60));

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
      clearInterval(idInterval)
    }

  }

  countTimer("01 september 2019");

  // setInterval(countTimer, 1000, "01 september 2020");
});
