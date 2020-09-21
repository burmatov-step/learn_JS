const data = require("./modules/db_cities");

const listDefault = document.querySelector(".dropdown-lists__list--default"),
  listsColDefault = listDefault.querySelector(".dropdown-lists__col"),
  selectCities = document.getElementById("select-cities"),
  listSelect = document.querySelector(".dropdown-lists__list--select"),
  listsColSelect = listSelect.querySelector(".dropdown-lists__col"),
  closeButton = document.querySelector(".close-button"),
  button = document.querySelector(".button"),
  listAutocomplete = document.querySelector(
    ".dropdown-lists__list--autocomplete"
  ),
  listsColAutocomplete = listAutocomplete.querySelector(".dropdown-lists__col"),
  inputCities = document.querySelector(".input-cities"),
  countryRu = data.data.RU;

console.log(data.data.RU);


// формирование listDefault
const rendCountry = () => {
  const wrap = document.createElement("div");
  wrap.classList.add("dropdown-lists__countryBlock");
  countryRu.forEach((item) => {
    const country = document.createElement("div");
    country.classList.add("dropdown-lists__total-line");
    country.innerHTML = `
                  <div class="dropdown-lists__country">${item.country}</div>
                  <div class="dropdown-lists__count">${item.count}</div>
      `;
    wrap.append(country);
    renderCity(item.cities);
  });

  function renderCity(arr) {
    arr.sort((a, b) => {
      return b.count - a.count;
    });
  //
    for (let i = 0; i < 3; i++) {
      const city = document.createElement("div");
      city.classList.add("dropdown-lists__line");
      city.innerHTML = `
                  <div class="dropdown-lists__city">${arr[i].name}</div>
                  <div class="dropdown-lists__count">${arr[i].count}</div>
      `;
      wrap.append(city);
    }
  }
  listsColDefault.append(wrap);
};

//  формирование listSelect

const selectVal = (nameCountry) => {
  countryRu.forEach((item) => {
    if (item.country === nameCountry) {
      listDefault.style.display = "none";
      listSelect.style.display = "block";
      const wrap = document.createElement("div");
      wrap.classList.add("dropdown-lists__countryBlock");
      const country = document.createElement("div");
      country.classList.add("dropdown-lists__total-line");
      country.innerHTML = `
                  <div class="dropdown-lists__country">${item.country}</div>
                  <div class="dropdown-lists__count">${item.count}</div>
      `;
      wrap.append(country);
      for (let i = 0; i < item.cities.length; i++) {
        const city = document.createElement("div");
        city.classList.add("dropdown-lists__line");
        city.innerHTML = `
                  <div class="dropdown-lists__city">${item.cities[i].name}</div>
                  <div class="dropdown-lists__count">${item.cities[i].count}</div>
      `;
        wrap.append(city);
      }

      listsColSelect.append(wrap);
    }
  });
};

const renderAutoComplete = (val) => {
listsColAutocomplete.innerHTML = ''
  const length = val.length;
  const wrap = document.createElement("div");

  wrap.classList.add("dropdown-lists__countryBlock");

  console.dir(wrap);
  countryRu.forEach((item) => {



    if (val.toLowerCase() === item.country.substring(0, length).toLowerCase()) {

      const countryBlock = document.createElement("div");
      countryBlock.classList.add("dropdown-lists__line");
      countryBlock.innerHTML = `
      <div class="dropdown-lists__country">${item.country}</div>
      <div class="dropdown-lists__count">${item.count}</div>
      `;
      wrap.append(countryBlock);
      console.log(item.country);
    }
    item.cities.forEach((city) => {
      const cityBlock = document.createElement("div");
      cityBlock.classList.add("dropdown-lists__line");
      if (val.toLowerCase() === city.name.substring(0, length).toLowerCase()) {
        cityBlock.innerHTML = `
      <div class="dropdown-lists__city">${city.name}</div>
      <div class="dropdown-lists__count">${city.count}</div>
      `;
        wrap.append(cityBlock);
        console.log(city.name);
      }

      listsColAutocomplete.append(wrap)
    });
  });

  if(wrap.childElementCount === 0){
    wrap.textContent = 'Ничего не найдено'
  }
};

// переход на listSelect
listDefault.addEventListener("click", (e) => {
  let target = e.target;

  if (target.closest(".dropdown-lists__total-line")) {
    const wrap = target.closest(".dropdown-lists__total-line");
    const nameCountry = wrap.children[0].innerText;
    selectVal(nameCountry);
  }
});


// переход на listDefault

listSelect.addEventListener("click", (e) => {

  let target = e.target;
  if (target.closest(".dropdown-lists__total-line")) {
    listsColSelect.innerHTML = "";
    listDefault.style.display = "block";
    listSelect.style.display = "none";
  }
});

// вызов listDefault
selectCities.addEventListener("focus", ()=>{

    rendCountry();
    console.dir(listDefault.childElementCount);


});


// отслеживание автокомплита
selectCities.addEventListener("input", () => {
  button.href = "#";
  if (selectCities.value.length > 0) {
    renderAutoComplete(selectCities.value);
    listDefault.style.display = "none";
    listSelect.style.display = "none";
    listAutocomplete.style.display = "block";
  } else {
    listDefault.style.display = "block";
    listAutocomplete.style.display = "none";
  }
});



inputCities.addEventListener('click', (e)=>{
  const target = e.target;
  // появление крестика
  if (
    target.className === "dropdown-lists__country" ||
    target.className === "dropdown-lists__city"
  ) {
    selectCities.focus();
    selectCities.value = target.innerText;
    closeButton.style.display = "block";
    console.dir(e.target);
  }
  // появление ссылки
  if (target.className === "dropdown-lists__city") {
    countryRu.forEach((item) => {
      item.cities.forEach((city) => {
        if (target.innerText === city.name) {
          button.href = city.link;
        }
      });
    });
  }

  if (target === closeButton) {
    selectCities.value = "";
    listsColDefault.innerHTML = "";
    listDefault.style.display = "block";
    listSelect.style.display = "none";
    closeButton.style.display = "none";
    listAutocomplete.style.display = "none";
    button.href = '#';
  }
})

