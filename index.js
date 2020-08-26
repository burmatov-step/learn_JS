"use strict";
document.addEventListener("DOMContentLoaded", () => {
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
    additionalExpensesItem = document.querySelectorAll(
      ".additional_expenses-item"
    ),
    periodSelect = document.querySelector(".period-select"),
    targetAmount = document.querySelector(".target-amount"),
    range = document.querySelector("[type='range']"),
    cancel = document.getElementById("cancel");

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
      this.addincome = [];
      this.expenses = {};
      this.incomeMonth = 0;
      this.addexpenses = [];
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
      this.getTargetMonth();
      this.getIncExp();
      this.getAddExpInc();
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
      additionalExpenses.value = this.addexpenses.join(", ");
      additionalValue.value = this.addincome.join(", ");
      targetMonth.value = Math.ceil(this.getTargetMonth());
      incomePeriod.value = this.calcSavedMoney();
      periodSelect.addEventListener("change", () => {
        incomePeriod.value = this.calcSavedMoney();
      });
    }

    addIncExpBlock(e) {
      const plusIncExp = e.target;
      const incExp = e.target.className.split(" ")[1].split("_")[0];
      let incExpItems = document.querySelectorAll(`.${incExp}-items`);
      const cloneItems = incExpItems[0].cloneNode(true);
      const cloneInput = cloneItems.querySelectorAll("input");
      cloneInput.forEach((item) => {
        item.value = "";
      });

      incExpItems[0].parentNode.insertBefore(cloneItems, plusIncExp);

      if (incExpItems.length === 2) {
        plusIncExp.style.display = "none";
      }

      console.log(cloneInput);
    }

    getIncExp() {
      let incomeItem = document.querySelectorAll(".income-items"),
        expensesItems = document.querySelectorAll(".expenses-items");
      const count = (item) => {
        const starStr = item.className.split("-")[0];
        const itemTitle = item.querySelector(`.${starStr}-title`).value;
        const itemAmount = item.querySelector(`.${starStr}-amount`).value;
        if (itemTitle !== "" && itemAmount !== "") {
          this[starStr][itemTitle] = +itemAmount;
        }
      };

      incomeItem.forEach(count);
      expensesItems.forEach(count);

      for (let key in this.income) {
        this.incomeMonth += +this.income[key];
      }
    }

    getAddExpInc() {
      const count = (item) => {
        const startstr = "add" + item.className.split("_")[1].split("-")[0];
        const add = item.value.split(",");
        add.forEach((i) => {
          i = i.trim();
          if (i !== "") {
            this[startstr].push(i);
          }
        });
      };

      additionalExpensesItem.forEach(count);
      additionalIncome.forEach(count);
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
      plusExpenses.addEventListener("click", (e) => {
        this.addIncExpBlock(e);
        // this.addExpensesBlock();
        this.getNumVal();
        this.getRusSym();
      });
      plusIncome.addEventListener("click", (e) => {
        this.addIncExpBlock(e);
        // this.addIncomeBlock();
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

  appData.eventListener();
});
