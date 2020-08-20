'use strict';

let started = document.getElementById("start"),
  plusIncome = document.getElementsByTagName("button")[0],
  plusExpenses = document.getElementsByTagName("button")[1],
  depositCheck = document.querySelector("#deposit-check"),
  additionalIncome = document.querySelectorAll(".additional_income-item"),
  budgetMonth = document.getElementsByClassName("budget_month-value")[0],
  budgetDay = document.getElementsByClassName("budget_day-value")[0],
  periodAmount = document.querySelector(".period-amount"),
   expensesMonthValue = document.getElementsByClassName(
    "expenses_month-value"
  )[0],
  additionalValue = document.getElementsByClassName(
    "additional_income-value"
  )[0],
  additionalExpenses = document.getElementsByClassName(
    "additional_expenses-value"
  )[0],
  incomePeriod = document.getElementsByClassName("income_period-value")[0],
  targetMonth = document.getElementsByClassName("target_month-value")[0],
  summBudget = document.querySelector(".salary-amount"),
  incomeTitle = document.querySelector(".income-title"),
  // incomeAmount = document.querySelector(".income-amount"),
  expensesTitle = document.querySelector(".expenses-title"),
  expensesItems = document.querySelectorAll(".expenses-items"),
  additionalExpensesItem = document.querySelector(".additional_expenses-item"),
  periodSelect = document.querySelector(".period-select"),
  targetAmount = document.querySelector(".target-amount"),
  incomeItem = document.querySelectorAll(".income-items"),

  range = document.querySelector("[type='range']");

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let isSrting = function (n) {
  return !isNaN(parseFloat(n)) || n === null
    ? true
    : Boolean(n.trim().length === 0);
};



let appData = {
  budget: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  incomeMonth: 0,
  addExpenses: [],
  budgetDay: 0,
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start : function () {
    if (summBudget.value === ''){
      started.disabled = true;
      return
    }
    appData.budget = +summBudget.value;
    console.log(summBudget.value);
    appData.getExpenses()
    // appData.asking();
    appData.getIncome();
    appData.getIncomeMonth();
    appData.getTargetMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },
  getExpensesMonth: function () {
    let sum = 0;
    for (let key in appData.expenses) {
      sum += appData.expenses[key];
      appData.expensesMonth += appData.expenses[key];
    }

    return sum;
  },

  getBudget: function () {
    return (
      (appData.budgetMonth = +appData.budget + appData.incomeMonth - appData.getExpensesMonth()),
      (appData.budgetDay = Math.floor(appData.budgetMonth / 30))
    );
  },
  getTargetMonth: function () {
    return targetAmount.value / appData.budgetMonth;
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
  showResult: function () {
    budgetMonth.value = appData.budgetMonth;
    budgetDay.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpenses.value = appData.addExpenses.join(', ');
    additionalValue.value = appData.addIncome.join(', ');
    targetMonth.value = Math.ceil(appData.getTargetMonth());
    incomePeriod.value = appData.calcSavedMoney();
    periodSelect.addEventListener("change", function () {
      incomePeriod.value = appData.calcSavedMoney();
    });

  },
  addExpensesBlock: function () {


    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
    expensesItems = document.querySelectorAll(".expenses-items");
    if(expensesItems.length === 3){
      plusExpenses.style.display = 'none';
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItems = incomeItem[0].cloneNode(true);
    incomeItem[0].parentNode.insertBefore(cloneIncomeItems, plusIncome);
    incomeItem = document.querySelectorAll(".income-items");
    if(incomeItem.length === 3){
      plusIncome.style.display = 'none';
    }

  },
  getExpenses : function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector(".expenses-amount").value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });

  },
  getIncome : function name() {
    incomeItem.forEach(function (item) {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;
      if(itemIncome !== '' && cashIncome !== ''){
        appData.income[itemIncome] = +cashIncome;
      }
    });

  },
  getIncomeMonth : function () {
    for(let key in appData.income){
      appData.incomeMonth += +appData.income[key]
    }

  },

  getAddExpenses : function () {
    let addExpenses = additionalExpensesItem.value.split(',');

    addExpenses.forEach(function (item) {
      item = item.trim();
      if(item !== ''){
        appData.addExpenses.push(item);
      }

    });
  },
  getAddIncome : function () {
    additionalIncome.forEach(function (item) {
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        appData.addIncome.push(itemValue);
      }
    });
  },

  asking: function () {


    // for (let i = 0; i < 2; i++) {
    //   let num = 0;
    //   let expenses = [];
    //   do {
    //     expenses[i] = prompt("ВВедите обязательную статью расходов?");
    //   } while (isSrting(expenses[i]));

    //   do {
    //     num = prompt("Во сколько это обойдется?");
    //     appData.expenses[expenses[i]] = +num;
    //   } while (!isNumber(num));
    // }

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
    return appData.budgetMonth * periodSelect.value;
  },
};

started.addEventListener('click', appData.start);

plusExpenses.addEventListener('click', appData.addExpensesBlock);
 plusIncome.addEventListener('click', appData.addIncomeBlock );
 periodSelect.addEventListener("change", function () {
   periodAmount.textContent = periodSelect.value;
 });

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




