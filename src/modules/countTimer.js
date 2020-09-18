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
    firstNum(timer.hours, timerHours);
    firstNum(timer.minutes, timerMinutes);
    firstNum(timer.seconds, timerSeconds);
  }

  const firstNum = (timer, val) =>{
    timer < 10
      ? (val.textContent = "0" + timer)
      : (val.textContent = timer);
  }



  let idInterval;

  if (getTimeRemaining().timeRemaining > 0) {
    idInterval = setInterval(updateClock, 1000);
  } else {
    clearInterval(idInterval);
  }
}

export default countTimer;
