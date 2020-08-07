let money = 100000;
let income = '100000';
let addExpenses = 'Интернет, Бензин, Коммуналка, Ипотека';
let deposit = true;
let mission = 10000000;
let period = 12;


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`, `Цель заработать ${mission} рублей`);
console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money/30;
console.log(budgetDay)