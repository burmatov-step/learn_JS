const toggleMenu = () => {
  const menu = document.querySelector("menu"),
    closeBtn = document.querySelector(".close-btn"),
    serviceBlock = document.querySelector("#service-block"),
    portfolio = document.querySelector("#portfolio"),
    calc = document.querySelector("#calc"),
    command = document.querySelector("#command"),
    connect = document.querySelector("#connect"),
    main = document.querySelector("main");

  const handlerMenu = () => {
    menu.classList.toggle("active-menu");
  };

  //  Функция скроллинга
  const  scrollTo = (elem)=> {
    window.scroll({
      left: 0,
      top: elem.offsetTop,
      behavior: "smooth",
    });
  }

  document.body.addEventListener("click", (e) => {
    let target = e.target;
    const closeMenu = target.closest("menu");

    // закрытие при клике мимо меню
    if (menu.classList.contains("active-menu") && !closeMenu) {
      handlerMenu();
    }
    if (target.closest(".menu")) handlerMenu();
    // скрол на второй блок
    if (target.closest('[href="#service-block"]')) {
      e.preventDefault();
      let num = serviceBlock;

      scrollTo(num);
    }

    // закрытие при нажатии на пункт меню
    if (target.closest("menu>ul")) {
      e.preventDefault();
      handlerMenu();
    }
    // закрытие при нажатии на крестик
    if (target === closeBtn) {
      handlerMenu();
    }
    // скролл при клике на пункты в меню
    if (target.hash === "#service-block") {

      let num = serviceBlock;
      scrollTo(num);
    }

    if (target.hash === "#portfolio") {
      console.log(target.hash);
      let num = portfolio;
      scrollTo(num);
    }
    if (target.hash === "#calc") {
      let num = calc;
      scrollTo(num);
    }
    if (target.hash === "#command") {
      let num = command;
      scrollTo(num);
    }

    if (target.hash === "#connect") {
      let num = connect;
      scrollTo(num);
    }
  });
};

export default toggleMenu;