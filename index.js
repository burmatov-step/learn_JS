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
    depositBank = document.querySelector(".deposit-bank"),
    depositAmount = document.querySelector(".deposit-amount"),
    depositPercent = document.querySelector(".deposit-percent"),
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
      this.getInfoDeposit();
      this.getIncExp();
      this.getAddExpInc();
      this.getBudget();
      this.showResult();
      this.localcooc();
      this.getCancel();
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
      const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
      return (
        (this.budgetMonth =
          +this.budget +
          this.incomeMonth -
          this.getExpensesMonth() +
          monthDeposit),
        (this.budgetDay = Math.floor(this.budgetMonth / 30))
      );
    }

    getTargetMonth() {
      let getTarget = targetAmount.value / this.budgetMonth;
      if (getTarget) {
        return getTarget;
      } else {
        getTarget = 0;
        return getTarget;
      }
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

    calcSavedMoney() {
      return this.budgetMonth * periodSelect.value;
    }

    getInfoDeposit() {
      if (this.deposit) {
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
      }
    }

    changePercent() {
      const valueSelect = this.value;

      if (valueSelect === "other") {
        depositPercent.value = "";
        depositPercent.style.display = "inline-block";

        depositPercent.addEventListener("blur", function () {
          if (!isNumber(this.value) || this.value < 0 || this.value > 100) {
            alert("Введите процент от 0 до 100");
            started.disabled = true;
          } else {
            started.disabled = false;
          }
        });
      } else {
        started.disabled = false;
        depositPercent.value = valueSelect;
        depositPercent.style.display = "none";
      }
    }

    depositHandler() {
      if (depositCheck.checked) {
        depositBank.style.display = "inline-block";
        depositAmount.style.display = "inline-block";
        this.deposit = true;
        depositBank.addEventListener("change", this.changePercent);
      } else {
        depositPercent.style.display = "none";
        depositBank.style.display = "none";
        depositAmount.style.display = "none";
        depositBank.value = "";
        depositAmount.value = "";
        this.deposit = false;
        depositBank.removeEventListener("change", this.changePercent);
      }
    }

    calcSaveMon() {
      return budgetMonth.value * periodSelect.value;
    }

    lll() {
      if (localStorage.myText) {
        budgetMonth.value = JSON.parse(localStorage.myText).budgetMonth;
        budgetDay.value = JSON.parse(localStorage.myText).budgetDay;
        expensesMonthValue.value = JSON.parse(
          localStorage.myText
        ).expensesMonthValue;
        additionalExpenses.value = JSON.parse(
          localStorage.myText
        ).additionalExpenses;
        additionalValue.value = JSON.parse(localStorage.myText).additionalValue;
        targetMonth.value = JSON.parse(localStorage.myText).targetVal;
        incomePeriod.value = JSON.parse(localStorage.myText).incomePeriod;
        periodSelect.addEventListener("change", () => {
          incomePeriod.value = this.calcSaveMon();
          let localPrs = JSON.parse(localStorage.myText);
          localPrs.incomePeriod = +incomePeriod.value;
          localStorage.myText = JSON.stringify(localPrs);
          document.cookie = `incomePeriod=${incomePeriod.value}`;
        });
        let inputText = document.querySelectorAll("[type='text']");
        inputText.forEach((item) => {
          item.disabled = true;
        });
        started.style.display = "none";
        cancel.style.display = "block";
      } else {
        this.showResult();
      }
    }

    ravn() {
      let cooc = document.cookie.split("; ");
      let coocObj = {};
      cooc.forEach((item, index, arr) => {
        if (item.split("=")[1] === "") {
          coocObj[item.split("=")[0]] = [];
        } else if (
          item.split("=")[0] === "additionalExpenses" ||
          item.split("=")[0] === "additionalValue"
        ) {
          coocObj[item.split("=")[0]] = item.split("=")[1].split(",");
        } else if (item.split("=")[0] === "isLoad") {
          coocObj[item.split("=")[0]] = item.split("=")[1];
        } else {
          coocObj[item.split("=")[0]] = +item.split("=")[1];
        }
      });

      let arr1 = new Set();
      for (let key in coocObj) {
        arr1.add(JSON.stringify(key) + JSON.stringify(coocObj[key]));
      }

      let sss = JSON.parse(localStorage.myText);

      let arr = new Set();

      for (let key in sss) {
        arr.add(JSON.stringify(key) + JSON.stringify(sss[key]));
      }
      let lll = new Set([...arr1, ...arr]);


      if (lll.size !== (arr.size +1) || lll.size !== arr1.size || coocObj.isLoad !== 'true') {

        this.deleteAllCookies();
        localStorage.clear()
        const inputText = document.querySelectorAll("[type='text']");
        inputText.forEach((item) => {
          item.value = "";
          item.disabled = false;
        });
        started.style.display = "block";
        cancel.style.display = "none";
      }
    }

    deleteAllCookies() {
      var cookies = document.cookie.split(";");

      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    }

    localcooc() {

      let ddd = {
        budgetMonth: this.budgetMonth,
        budgetDay: this.budgetDay,
        expensesMonthValue: this.expensesMonth,
        additionalValue: this.addincome,
        additionalExpenses: this.addexpenses,
        incomePeriod: this.calcSavedMoney(),
        targetVal: +targetMonth.value,
      };
      localStorage.myText = JSON.stringify(ddd);

      for (let key in ddd) {
        document.cookie = `${key}=${ddd[key]}`;
      }
      document.cookie = "isLoad=true";

    }

    eventListener() {
      this.getInfoDeposit();
      this.getNumVal();
      this.getRusSym();

      started.addEventListener("click", () => {
        this.start();
      });
      cancel.addEventListener("click", () => {
        const inputText = document.querySelectorAll("[type='text']");
        inputText.forEach((item) => {
          item.value = "";
          item.disabled = false;
        });
        started.style.display = "block";
        cancel.style.display = "none";
        delete localStorage.myText;
        this.deleteAllCookies();
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

      depositCheck.addEventListener("change", this.depositHandler.bind(this));
    }

    getCancel() {
      cancel.style.display = "block";
      started.style.display = "none";
      const inputText = document.querySelectorAll("[type='text']");
      inputText.forEach((item) => {
        item.disabled = true;
      });
      let localPrs = JSON.parse(localStorage.myText);
      localStorage.myText = JSON.stringify(localPrs);

    }
  }

  const appData = new AppData();

  appData.eventListener();
  appData.lll();
  if(localStorage.myText){
appData.ravn();
  }


});
