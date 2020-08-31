function countTimer(deadline) {
  let hi = document.querySelector(".hi"),
    today = document.querySelector(".today"),
    times = document.querySelector(".time"),
    newYear = document.querySelector(".newYear");
    week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    days = '';

  function getTime() {
    let getStop = new Date(deadline).getTime(),
      dateNow = new Date().getTime(),
      nowHours = new Date().getHours(),
      nowDay = new Date().getDay(),
      timeRemaining = getStop - dateNow,
      day = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);
    return { day, nowHours, nowDay };

  }
  function result() {
    let time = getTime();
    if (
      (time.day > 9 && time.day < 21) ||
      (+time.day.toString().slice(-1) > 4 &&
        +time.day.toString().slice(-1) <= 9) ||
      +time.day.toString().slice(-1) === 0
    ) {
      days = "дней";
    } else if (+time.day.toString().slice(-1) === 1) {
      days = "день";
    } else {days = "дня";
    }
    if (time.nowHours > 6 && time.nowHours < 12) {
      hi.textContent = "Доброе утро";
    } else if (time.nowHours >= 12 && time.nowHours < 18) {
      hi.textContent = "Добрый день ";
    } else if (time.nowHours >= 18 && time.nowHours < 24) {
      hi.textContent = "Добрый вечер ";
    } else {
      hi.textContent = "Доброй ночи ";
    }

    today.textContent = `Сегодня: ${week[time.nowDay - 1]}`;

    times.textContent = `Текущее время ${new Date().toLocaleTimeString("en")}`;

    newYear.textContent = `До нового года осталось ${time.day} ${days}`;
  }

  result()
}


countTimer('31 december 2020');

console.log( new Date().toLocaleTimeString('en'))