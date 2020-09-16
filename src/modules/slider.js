const slider = () => {
  const slide = document.querySelectorAll(".portfolio-item"),
    btn = document.querySelector(".portfolio-btn"),
    dots = document.querySelector(".portfolio-dots"),
    slider = document.querySelector(".portfolio-content");

  let currentSlide = 0,
    interval,
    numDot = slide.length;

  const createDot = (el) => {
    let dote = document.createElement("li");
    dote.classList.add("dot");
    if (el === numDot) {
      dote.classList.add("dot-active");
    }
    dots.append(dote);
    el--;
    if (el !== 0) createDot(el);
  };
  createDot(numDot);
  const dot = document.querySelectorAll(".dot");

  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };

  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };

  const autoPlaySlide = () => {
    prevSlide(slide, currentSlide, "portfolio-item-active");
    prevSlide(dot, currentSlide, "dot-active");

    currentSlide++;
    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    nextSlide(slide, currentSlide, "portfolio-item-active");
    nextSlide(dot, currentSlide, "dot-active");
  };

  const startSlide = (time = 3000) => {
    interval = setInterval(autoPlaySlide, time);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  slider.addEventListener("click", (event) => {
    event.preventDefault();
    let target = event.target;
    if (!target.matches(".portfolio-btn, .dot")) {
      return;
    }
    prevSlide(slide, currentSlide, "portfolio-item-active");
    prevSlide(dot, currentSlide, "dot-active");
    if (target.matches("#arrow-right")) {
      currentSlide++;
    } else if (target.matches("#arrow-left")) {
      currentSlide--;
    } else if (target.matches(".dot")) {
      dot.forEach((item, index) => {
        if (item === target) {
          currentSlide = index;
        }
      });
    }

    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    if (currentSlide < 0) {
      currentSlide = slide.length - 1;
    }
    nextSlide(slide, currentSlide, "portfolio-item-active");
    nextSlide(dot, currentSlide, "dot-active");
  });


  slider.addEventListener("mouseover", (event) => {
    if (
      event.target.matches(".portfolio-btn") ||
      event.target.matches(".dot")
    ) {
      stopSlide();
    }
  });
  slider.addEventListener("mouseout", (event) => {
    if (
      event.target.matches(".portfolio-btn") ||
      event.target.matches(".dot")
    ) {
      startSlide();
    }
  });

   const commandImg = () => {
     const imgCommand = document.querySelectorAll(".command__photo");
     console.log(imgCommand);
     imgCommand.forEach((item) => {
       const images = item.attributes.src.nodeValue;
       item.addEventListener("mouseenter", (e) => {
         e.target.src = e.target.dataset.img;
       });
       item.addEventListener("mouseleave", (e) => {
         e.target.src = images;
       });
     });
   };
   commandImg();

  startSlide(1500);
};

export default slider;