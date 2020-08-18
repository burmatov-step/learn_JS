'use strict';

const started = document.getElementById("start");

const plusIncome = document.getElementsByTagName("button")[0];

const plusExpenses = document.getElementsByTagName("button")[1];

const depositCheck = document.querySelector("#deposit-check");

const additionalIncome = document.querySelectorAll(".additional_income-item");

const budgetMonth = document.getElementsByClassName("budget_month-value")[0];

const budgetDay = document.getElementsByClassName("budget_day-value")[0];

const expensesMonth = document.getElementsByClassName("expenses_month-value")[0];

const additionalValue = document.getElementsByClassName("additional_income-value")[0];

const additionalExpenses = document.getElementsByClassName("additional_expenses-value")[0];

const incomePeriod = document.getElementsByClassName("income_period-value")[0];

const targetMonth = document.getElementsByClassName("target_month-value")[0];

const summBudget = document.querySelector(".salary-amount");

const incomeTitle = document.querySelector(".income-title");

const incomeAmount = document.querySelector(".income-amount");

const expensesTitle = document.querySelector(".expenses-title");

const expensesAmount = document.querySelector(".expenses-amount");

const additionalExpensesItem = document.querySelector(".additional_expenses-item");

const targetAmount = document.querySelector(".target-amount");

const range = document.querySelector("[type='range']");

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let isSrting = function (n) {
  return !isNaN(parseFloat(n)) || n === null
    ? true
    : Boolean(n.trim().length === 0);
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
  percentDeposit: 0,
  moneyDeposit: 0,
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
    return (
      (appData.budgetMonth = +appData.budget - appData.getExpensesMonth()),
      (appData.budgetDay = Math.floor(appData.budgetMonth / 30))
    );
  },
  getTargetMonth: function () {
    return appData.mission / appData.budgetMonth;
  },

  getStatusIncome: function () {
    if (appData.budgetDay > 1200) {
      console.log("У вас высокий уровень дохода");
    } else if (appData.budgetDay > 600 && appData.budgetDay <= 1200) {
      console.log("У вас средний уровень дохода");
    } else if (appData.budgetDay <= 600 && appData.budgetDay > 0) {
      console.log("К сожалению у вас уровень дохода ниже среднего");
    } else if (appData.budgetDay <= 0) {
      console.log("Что то пошло не так");
    }
  },

  asking: function () {
    if (confirm("Есть ли у вас дополнительный заработок?")) {
      let itemIncome;
      do {
        itemIncome = prompt(
          "Какой у вас есть дополнительный заработок?",
          "Такси"
        );
      } while (isSrting(itemIncome));

      let cashIncome;
      do {
        cashIncome = prompt("Сколько в месяц зарабатываете на этом?", 10000);
      } while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }

    for (let i = 0; i < 2; i++) {
      let num = 0;
      let expenses = [];
      do {
        expenses[i] = prompt("ВВедите обязательную статью расходов?");
      } while (isSrting(expenses[i]));

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
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt("Какой годовой процент?", "10");
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt("Какая сумма заложена?", 10000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  },
};

appData.asking();
appData.getBudget();
appData.getTargetMonth();
console.log("Расходы за месяц: ", appData.getExpensesMonth());

if (appData.getTargetMonth() < 0) {
  console.log("Цель не будет достигнута");
} else {
  console.log(
    "Период достижения цели в месяцах: ",
    Math.ceil(appData.getTargetMonth())
  );
}

console.log("Уровень дохода: ", appData.budget);

console.log("Наша программа включает в себя данные:");
for (let key in appData) {
  console.log(key + " : " + appData[key]);
}

appData.getInfoDeposit();

console.log(
  appData.percentDeposit,
  appData.moneyDeposit,
  appData.calcSavedMoney()
);

for (let i = 0; i < appData.addExpenses.length; i++) {
  appData.addExpenses[i] =
    appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1);
}
console.log(appData.addExpenses.join(", "));
