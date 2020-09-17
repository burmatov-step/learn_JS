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
    firstNum(timer);
  }

  const firstNum = (timer) => {
    timer.hours < 10
      ? (timerHours.textContent = "0" + timer.hours)
      : (timerHours.textContent = timer.hours);

    timer.minutes < 10
      ? (timerMinutes.textContent = "0" + timer.minutes)
      : (timerMinutes.textContent = timer.minutes);

    timer.seconds < 10
      ? (timerSeconds.textContent = "0" + timer.seconds)
      : (timerSeconds.textContent = timer.seconds);
  };

  let idInterval;

  if (getTimeRemaining().timeRemaining > 0) {
    idInterval = setInterval(updateClock, 1000);
  } else {
    clearInterval(idInterval);
  }
}

export default countTimer;
