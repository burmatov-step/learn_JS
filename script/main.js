'use strict';


let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


let money;
let income = '100000';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
// let expenses1 = prompt('ВВедите обязательную статью расходов?');
// let amount1 = +prompt('Во сколько это обойдется?');
// let expenses2 = prompt('ВВедите обязательную статью расходов?');
// let amount2 = +prompt('Во сколько это обойдется?');
let expenses = [];
let start = function () {

  do{
    money = prompt("Ваш месячный доход?");
  }
  while (!isNumber(money));
};
start();
let expensesAmount = getExpensesMonth();
let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);
let mission = 100000;
let period = Math.ceil(mission / accumulatedMonth);

let budgetDay = Math.floor(accumulatedMonth / 30);



let showTypeOf = function (data) {
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

function getExpensesMonth() {
    let sum = 0;

    for(let i = 0; i < 2; i++){
        let num = 0;

        expenses[i] = prompt("ВВедите обязательную статью расходов?");

        do {
          num = prompt("Во сколько это обойдется?");
        } while (!isNumber(num));

        sum += +num;
    }

    return sum;
}

// let expensesAmount = getExpensesMonth();

function getAccumulatedMonth(money, expensesAmount) {
  return money - expensesAmount;
}

function getTargetMonth(mission, accumulatedMonth) {
    return mission / accumulatedMonth;
}

console.log(addExpenses.toLowerCase().split(", "));
if (getTargetMonth(mission, accumulatedMonth) < 0) {
    console.log("Цель не будет достигнута");
} else{
    console.log("Период достижения цели в месяцах: ", Math.ceil(getTargetMonth(mission, accumulatedMonth)));
}

console.log(budgetDay);

let getStatusIncome = function(){
    if (budgetDay > 1200){
    console.log('У вас высокий уровень дохода');
} else if (budgetDay > 600 && budgetDay <= 1200){
    console.log('У вас средний уровень дохода');
} else if (budgetDay <= 600 && budgetDay > 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay <= 0) {
    console.log('Что то пошло не так');
}
};

getStatusIncome();




