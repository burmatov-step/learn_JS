"use strict";

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
  expensesTitle = document.querySelector(".expenses-title"),
  expensesItems = document.querySelectorAll(".expenses-items"),
  additionalExpensesItem = document.querySelector(".additional_expenses-item"),
  periodSelect = document.querySelector(".period-select"),
  targetAmount = document.querySelector(".target-amount"),
  incomeItem = document.querySelectorAll(".income-items"),
  range = document.querySelector("[type='range']"),
  cancel = document.getElementById("cancel");

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let isSrting = function (n) {
  return !isNaN(parseFloat(n)) || n === null
    ? true
    : Boolean(n.trim().length === 0);
};

const AppData = function () {
  this.budget = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.incomeMonth = 0;
  this.addExpenses = [];
  this.budgetDay = 0;
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
};

AppData.prototype.getCancel = function () {
  cancel.style.display = "block";
  started.style.display = "none";
  let inputText = document.querySelectorAll("[type='text']");
  inputText.forEach(function (item) {
    item.disabled = true;
  });
};

AppData.prototype.start = function () {
  if (summBudget.value === "") {
    started.disabled = true;
    return;
  }
  this.budget = +summBudget.value;

  this.getExpenses();

  this.getIncome();
  this.getIncomeMonth();
  this.getTargetMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();
  this.getCancel();
  this.showResult();
};

AppData.prototype.getRusSym = function () {
  let placsHolder = document.querySelectorAll(
    'input[placeholder="Наименование"]'
  );
  placsHolder.forEach(function (item) {
    item.addEventListener("input", () => {
      item.value = item.value.replace(/[^А-Яа-яЁё., ]/, "");
    });
  });
};
AppData.prototype.getNumVal = function () {
  let placeSumm = document.querySelectorAll('input[placeholder="Сумма"]');
  placeSumm.forEach(function (item) {
    item.addEventListener("input", () => {
      item.value = item.value.replace(/[^0-9]/, "");
    });
  });
};
AppData.prototype.getExpensesMonth = function () {
  let sum = 0;
  for (let key in this.expenses) {
    sum += this.expenses[key];
    this.expensesMonth += this.expenses[key];
  }

  return sum;
};

AppData.prototype.getBudget = function () {
  return (
    (this.budgetMonth =
      +this.budget + this.incomeMonth - this.getExpensesMonth()),
    (this.budgetDay = Math.floor(this.budgetMonth / 30))
  );
};
AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function () {
  if (this.budgetDay > 1200) {
    console.log("У вас высокий уровень дохода");
  } else if (this.budgetDay > 600 && this.budgetDay <= 1200) {
    console.log("У вас средний уровень дохода");
  } else if (this.budgetDay <= 600 && this.budgetDay > 0) {
    console.log("К сожалению у вас уровень дохода ниже среднего");
  } else if (this.budgetDay <= 0) {
    console.log("Что то пошло не так");
  }
};

AppData.prototype.showResult = function () {
  budgetMonth.value = this.budgetMonth;
  budgetDay.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpenses.value = this.addExpenses.join(", ");
  additionalValue.value = this.addIncome.join(", ");
  targetMonth.value = Math.ceil(this.getTargetMonth());
  incomePeriod.value = this.calcSavedMoney();
  const _this = this;
  periodSelect.addEventListener("change", function () {
    incomePeriod.value = _this.calcSavedMoney();
  });
};
AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  let cloneExpensesInput = cloneExpensesItem.querySelectorAll("input");

  cloneExpensesInput.forEach((item) => {
    item.value = "";
  });
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
  expensesItems = document.querySelectorAll(".expenses-items");
  if (expensesItems.length === 3) {
    plusExpenses.style.display = "none";
  }
};
AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItems = incomeItem[0].cloneNode(true);
  let cloneIncomeInput = cloneIncomeItems.querySelectorAll("input");

  cloneIncomeInput.forEach((item) => {
    item.value = "";
  });
  incomeItem[0].parentNode.insertBefore(cloneIncomeItems, plusIncome);
  incomeItem = document.querySelectorAll(".income-items");

  if (incomeItem.length === 3) {
    plusIncome.style.display = "none";
  }
};
AppData.prototype.getExpenses = function () {
  const _this = this;
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector(".expenses-title").value;
    let cashExpenses = item.querySelector(".expenses-amount").value;
    if (itemExpenses !== "" && cashExpenses !== "") {
      _this.expenses[itemExpenses] = +cashExpenses;
    }
  });
};
AppData.prototype.getIncome = function name() {
  const _this = this;
  incomeItem.forEach(function (item) {
    let itemIncome = item.querySelector(".income-title").value;
    let cashIncome = item.querySelector(".income-amount").value;
    if (itemIncome !== "" && cashIncome !== "") {
      _this.income[itemIncome] = +cashIncome;
    }
  });
};
AppData.prototype.getIncomeMonth = function () {
  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};

AppData.prototype.getAddExpenses = function () {
  let addExpenses = additionalExpensesItem.value.split(",");
  const _this = this;

  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== "") {
      _this.addExpenses.push(item);
    }
  });
};
AppData.prototype.getAddIncome = function () {
  const _this = this;
  additionalIncome.forEach(function (item) {
    let itemValue = item.value.trim();
    if (itemValue !== "") {
      _this.addIncome.push(itemValue);
    }
  });
};

AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    do {
      this.percentDeposit = prompt("Какой годовой процент?", "10");
    } while (!isNumber(this.percentDeposit));
    do {
      this.moneyDeposit = prompt("Какая сумма заложена?", 10000);
    } while (!isNumber(this.moneyDeposit));
  }
};
AppData.prototype.calcSavedMoney = function () {
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.eventListener = function () {
  this.getInfoDeposit();
  this.getNumVal();
  this.getRusSym();
  const _this = this;
  started.addEventListener("click", function () {
    _this.start();
  });
  cancel.addEventListener("click", function () {
    location.reload();
  });
  plusExpenses.addEventListener("click", function () {
    _this.addExpensesBlock();
    _this.getNumVal();
    _this.getRusSym();
  });
  plusIncome.addEventListener("click", function () {
    _this.addIncomeBlock();
    _this.getNumVal();
    _this.getRusSym();
  });
  periodSelect.addEventListener("change", function () {
    periodAmount.textContent = periodSelect.value;
  });
};

const appData = new AppData();

console.log(appData);

appData.eventListener();
