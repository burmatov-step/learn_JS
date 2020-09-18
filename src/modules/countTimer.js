function countTimer(deadline) {
  let timerHours = document.querySelector("#timer-hours"),
    timerMinutes = document.querySelector("#timer-minutes"),
    timerSeconds = document.querySelector("#timer-seconds"),
    timeZero = document.querySelectorAll(".time-zero");

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
    let { timeRemaining, ...time } = getTimeRemaining();
    let count = 0;

    for (let key in time) {
      time[key] < 10
        ? (timeZero[count].textContent = "0" + time[key])
        : (timeZero[count].textContent = time[key]);
      count++;
    }
  }

  let idInterval;

  if (getTimeRemaining().timeRemaining > 0) {
    idInterval = setInterval(updateClock, 1000);
  } else {
    clearInterval(idInterval);
  }
}

export default countTimer;
