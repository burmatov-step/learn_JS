"use strict";

const started = document.getElementById("start"),
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
  additionalExpensesItem = document.querySelector(".additional_expenses-item"),
  periodSelect = document.querySelector(".period-select"),
  targetAmount = document.querySelector(".target-amount"),
  range = document.querySelector("[type='range']"),
  cancel = document.getElementById("cancel");

let incomeItem = document.querySelectorAll(".income-items"),
  expensesItems = document.querySelectorAll(".expenses-items");

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isSrting = function (n) {
  return !isNaN(parseFloat(n)) || n === null
    ? true
    : Boolean(n.trim().length === 0);
};

class AppData {
  constructor() {
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
  }

  start() {
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
  }

  getRusSym() {
    const placsHolder = document.querySelectorAll(
      'input[placeholder="Наименование"]'
    );
    placsHolder.forEach((item) => {
      item.addEventListener("input", () => {
        item.value = item.value.replace(/[^А-Яа-яЁё., ]/, "");
      });
    });
  }

  getNumVal() {
    const placeSumm = document.querySelectorAll('input[placeholder="Сумма"]');
    placeSumm.forEach((item) => {
      item.addEventListener("input", () => {
        item.value = item.value.replace(/[^0-9]/, "");
      });
    });
  }

  getExpensesMonth() {
    let sum = 0;
    for (let key in this.expenses) {
      sum += this.expenses[key];
      this.expensesMonth += this.expenses[key];
    }

    return sum;
  }

  getBudget() {
    return (
      (this.budgetMonth =
        +this.budget + this.incomeMonth - this.getExpensesMonth()),
      (this.budgetDay = Math.floor(this.budgetMonth / 30))
    );
  }

  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }

  getStatusIncome() {
    if (this.budgetDay > 1200) {
      console.log("У вас высокий уровень дохода");
    } else if (this.budgetDay > 600 && this.budgetDay <= 1200) {
      console.log("У вас средний уровень дохода");
    } else if (this.budgetDay <= 600 && this.budgetDay > 0) {
      console.log("К сожалению у вас уровень дохода ниже среднего");
    } else if (this.budgetDay <= 0) {
      console.log("Что то пошло не так");
    }
  }

  showResult() {
    budgetMonth.value = this.budgetMonth;
    budgetDay.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpenses.value = this.addExpenses.join(", ");
    additionalValue.value = this.addIncome.join(", ");
    targetMonth.value = Math.ceil(this.getTargetMonth());
    incomePeriod.value = this.calcSavedMoney();
    periodSelect.addEventListener("change", () => {
      incomePeriod.value = this.calcSavedMoney();
    });
  }

  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    const cloneExpensesInput = cloneExpensesItem.querySelectorAll("input");

    cloneExpensesInput.forEach((item) => {
      item.value = "";
    });
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      plusExpenses.style.display = "none";
    }
  }

  addIncomeBlock() {
    const cloneIncomeItems = incomeItem[0].cloneNode(true);
    const cloneIncomeInput = cloneIncomeItems.querySelectorAll("input");

    cloneIncomeInput.forEach((item) => {
      item.value = "";
    });
    incomeItem[0].parentNode.insertBefore(cloneIncomeItems, plusIncome);
    incomeItem = document.querySelectorAll(".income-items");

    if (incomeItem.length === 3) {
      plusIncome.style.display = "none";
    }
  }

  getExpenses() {
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector(".expenses-title").value;
      const cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }

  getIncome() {
    incomeItem.forEach((item) => {
      const itemIncome = item.querySelector(".income-title").value;
      const cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        this.income[itemIncome] = +cashIncome;
      }
    });
  }

  getIncomeMonth() {
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getAddExpenses() {
    const addExpenses = additionalExpensesItem.value.split(",");

    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== "") {
        this.addExpenses.push(item);
      }
    });
  }

  getAddIncome() {
    additionalIncome.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue !== "") {
        this.addIncome.push(itemValue);
      }
    });
  }

  getInfoDeposit() {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt("Какой годовой процент?", "10");
      } while (!isNumber(this.percentDeposit));
      do {
        this.moneyDeposit = prompt("Какая сумма заложена?", 10000);
      } while (!isNumber(this.moneyDeposit));
    }
  }

  calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
  }

  eventListener() {
    this.getInfoDeposit();
    this.getNumVal();
    this.getRusSym();

    started.addEventListener("click", () => {
      this.start();
    });
    cancel.addEventListener("click", () => {
      location.reload();
    });
    plusExpenses.addEventListener("click", () => {
      this.addExpensesBlock();
      this.getNumVal();
      this.getRusSym();
    });
    plusIncome.addEventListener("click", () => {
      this.addIncomeBlock();
      this.getNumVal();
      this.getRusSym();
    });
    periodSelect.addEventListener("change", () => {
      periodAmount.textContent = periodSelect.value;
    });
  }

  getCancel() {
    cancel.style.display = "block";
    started.style.display = "none";
    const inputText = document.querySelectorAll("[type='text']");
    inputText.forEach((item) => {
      item.disabled = true;
    });
  }
}

const appData = new AppData();

console.log(appData);

appData.eventListener();
