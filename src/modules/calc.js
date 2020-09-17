const calc = (price = 100) => {
  const calcBlock = document.querySelector(".calc-block"),
    calcType = document.querySelector(".calc-type"),
    calcSquare = document.querySelector(".calc-square"),
    calcDay = document.querySelector(".calc-day"),
    calcCount = document.querySelector(".calc-count"),
    totalValue = document.getElementById("total");
  const renderNumber = () => {
    const inputNum = document.querySelectorAll(".calc-block> input");
    inputNum.forEach((item) => {
      item.addEventListener("input", () => {
        item.value = item.value.replace(/\D/g, "");
      });
    });
  };

  renderNumber();

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
      count += 300;
    }, 2);
  };

  calcBlock.addEventListener("input", (e) => {
    const target = e.target;

    console.log(target);
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

export default calc;
