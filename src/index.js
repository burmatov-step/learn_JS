'use strict';
import "nodelist-foreach-polyfill";
import "@babel/polyfill";
import "formdata-polyfill";
import "fetch-polyfill";
import smoothscroll from "smoothscroll-polyfill";
smoothscroll.polyfill();
import "es6-promise";
import elementClosest from "element-closest";
elementClosest(window);
import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import togglePopup from "./modules/togglePopup";
import SliderCarusel from "./modules/sliderBrand";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import calc from "./modules/calc";
import sentForm from "./modules/sentForm";
// !window.addEventListener &&
//   (function (
//     WindowPrototype,
//     DocumentPrototype,
//     ElementPrototype,
//     addEventListener,
//     removeEventListener,
//     dispatchEvent,
//     registry
//   ) {
//     WindowPrototype[addEventListener] = DocumentPrototype[
//       addEventListener
//     ] = ElementPrototype[addEventListener] = function (type, listener) {
//       var target = this;

//       registry.unshift([
//         target,
//         type,
//         listener,
//         function (event) {
//           event.currentTarget = target;
//           event.preventDefault = function () {
//             event.returnValue = false;
//           };
//           event.stopPropagation = function () {
//             event.cancelBubble = true;
//           };
//           event.target = event.srcElement || target;

//           listener.call(target, event);
//         },
//       ]);

//       this.attachEvent("on" + type, registry[0][3]);
//     };

//     WindowPrototype[removeEventListener] = DocumentPrototype[
//       removeEventListener
//     ] = ElementPrototype[removeEventListener] = function (type, listener) {
//       for (var index = 0, register; (register = registry[index]); ++index) {
//         if (
//           register[0] == this &&
//           register[1] == type &&
//           register[2] == listener
//         ) {
//           return this.detachEvent("on" + type, registry.splice(index, 1)[0][3]);
//         }
//       }
//     };

//     WindowPrototype[dispatchEvent] = DocumentPrototype[
//       dispatchEvent
//     ] = ElementPrototype[dispatchEvent] = function (eventObject) {
//       return this.fireEvent("on" + eventObject.type, eventObject);
//     };
//   })(
//     Window.prototype,
//     HTMLDocument.prototype,
//     Element.prototype,
//     "addEventListener",
//     "removeEventListener",
//     "dispatchEvent",
//     []
//   );


// timer
  countTimer("09 october 2020");

// меню
  toggleMenu();

// попап
  togglePopup();

  // табы
  tabs();

  // слайдер
  slider();

  // калькулятор
  calc(100);

  // send-ajax-form
  sentForm();

const option = {
  main: ".companies-wrapper",
  wrap: ".companies-hor",
  slidesToShow: 4,
  infinity: true,
  responsive: [
    {
      breakpoint: 1024,
      slideToShow: 3,
    },
    {
      breakpoint: 768,
      slideToShow: 2,
    },
    {
      breakpoint: 576,
      slideToShow: 1,
    },
  ]
};

const carousel = new SliderCarusel(option);

carousel.init();