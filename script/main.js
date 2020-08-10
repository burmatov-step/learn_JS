'use strict';

let money = prompt('Ваш месячный доход?');
let income = '100000';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('ВВедите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('ВВедите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');
let budgetMonth = money - (amount1 + amount2);
let mission = 100000;
let period = Math.ceil(mission / budgetMonth) ;
let budgetDay = Math.floor(budgetMonth / 30);


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log("Бюджет на месяц " + budgetMonth);
console.log(`Период равен ${period} месяцев`, `Цель заработать ${mission} рублей`);
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);

if (budgetDay > 1200){
    console.log('У вас высокий уровень дохода')
} else if (budgetDay > 600 && budgetDay <= 1200){
    console.log('У вас средний уровень дохода')
} else if (budgetDay <= 600 && budgetDay > 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего')
} else if (budgetDay <= 0) {
    console.log('Что то пошло не так')
}


