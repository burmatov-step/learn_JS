'use strict';


let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
let money,
    start = function () {
        do {
            money = prompt("Ваш месячный доход?");
        } while (!isNumber(money));
        };
start();

let appData = {
  budget: money,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  budgetDay: 0,
  deposit: false,
  mission: 50000,
  period: 3,
  getExpensesMonth: function () {
    let sum = 0;
    for (let key in appData.expenses) {
      sum += appData.expenses[key];
    }

    return sum;
  },

  getBudget: function () {
    return  appData.budgetMonth = +appData.budget - appData.getExpensesMonth(),
            appData.budgetDay = Math.floor(appData.budgetMonth / 30);

  },
  getTargetMonth: function () {
    return appData.mission / appData.budgetMonth;
  },

  getStatusIncome: function(){
        if (appData.budgetDay > 1200){
        console.log('У вас высокий уровень дохода');
    } else if (appData.budgetDay > 600 && appData.budgetDay <= 1200){
        console.log('У вас средний уровень дохода');
    } else if (appData.budgetDay <= 600 && appData.budgetDay > 0) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay <= 0) {
        console.log('Что то пошло не так');
    }
  },

  asking: function () {
    for (let i = 0; i < 2; i++) {
      let num = 0;
      let expenses = [];
      expenses[i] = prompt("ВВедите обязательную статью расходов?");

      do {
        num = prompt("Во сколько это обойдется?");
        appData.expenses[expenses[i]] = +num;
      } while (!isNumber(num));
    }

    let addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую"
    );
    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    appData.deposit = confirm("Есть ли у вас депозит в банке?");

  },
};

appData.asking();
appData.getBudget();
appData.getTargetMonth();
console.log("Расходы за месяц: ", appData.getExpensesMonth());

if (appData.getTargetMonth() < 0) {
  console.log("Цель не будет достигнута");
} else {
  console.log("Период достижения цели в месяцах: ", Math.ceil(appData.getTargetMonth()));
}

console.log("Уровень дохода: ", appData.budget);

console.log("Наша программа включает в себя данные:");
for(let key in appData){
  console.log(key + " : " + appData[key]);
}