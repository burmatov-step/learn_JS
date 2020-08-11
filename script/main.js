'use strict';

let money = prompt('Ваш месячный доход?');
let income = '100000';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('ВВедите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('ВВедите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');
let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));
let mission = 100000;
let period = Math.ceil(mission / accumulatedMonth);
let budgetDay = Math.floor(accumulatedMonth / 30);

let showTypeOf = function (data) {
    console.log(data, typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

function getExpensesMonth(amount1, amount2) {
    return amount1 + amount2;
}

function getAccumulatedMonth(money, getExpensesMonth) {
  return money - getExpensesMonth;
}

function getTargetMonth(mission, accumulatedMonth) {
    return mission / accumulatedMonth;
}

console.log(addExpenses.toLowerCase().split(", "));
console.log("Период достижения цели в месяцах: ", Math.ceil(getTargetMonth(mission, accumulatedMonth)));
console.log(budgetDay);

let getStatusIncome = function(){
    if (budgetDay > 1200){
    console.log('У вас высокий уровень дохода')
} else if (budgetDay > 600 && budgetDay <= 1200){
    console.log('У вас средний уровень дохода')
} else if (budgetDay <= 600 && budgetDay > 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего')
} else if (budgetDay <= 0) {
    console.log('Что то пошло не так')
}
}

getStatusIncome();




