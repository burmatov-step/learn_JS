const collection = document.querySelectorAll(".book"),
      books = document.querySelector(".books"),
      heading = document.querySelectorAll("[target='_blank']"),
      promo = document.querySelector(".adv"),
      list2 = collection[0].querySelectorAll("li"),
      list5 = collection[5].querySelectorAll("li"),
      list6 =collection[2].querySelectorAll('li'),
      newElement = document.createElement('li');
books.prepend(collection[1]);
books.append(collection[2]);
collection[4].after(collection[3])
document.body.style.backgroundImage = "url(./image/you-dont-know-js.jpg)";
heading[4].textContent = "Книга 3. this и Прототипы Объектов";
promo.remove();
list2[3].after(list2[6]);
list2[4].before(list2[8]);
list2[9].after(list2[2]);
list5[1].after(list5[9]);
list5[4].after(list5[2]);
list5[7].after(list5[5]);
newElement.textContent = "Глава 8: За пределами ES6";
console.log(list6);
list6[9].before(newElement);