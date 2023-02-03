"use strict";

(function(){
  const body = document.querySelector("body");
  const pageContainer = document.querySelector(".page-container");

  const modeSwitch = document.querySelector("#mode-switch");
  modeSwitch.addEventListener('change', function () {
    document.querySelector("#page").classList.toggle("dark-mode")
  });

  const scrollToTop = document.querySelector(".scroll-to-top");
  scrollToTop.addEventListener("click", function () {
    body.scrollTo({top: 0, behavior: 'smooth'});
  });

  body.addEventListener('scroll', function () {
    if (body.scrollTop > 150) {
      scrollToTop.classList.remove("disabled")
    } else {
      scrollToTop.classList.add("disabled")
    }

    if ((body.scrollTop + window.innerHeight + 50) > pageContainer.offsetHeight) {
      const footerHeight = document.querySelector("footer").getClientRects()[0].height;
      scrollToTop.style.bottom = `${Math.floor(footerHeight + 10)}px`
    } else {
      scrollToTop.style.bottom = '10px';
    }
  });

  document.getElementById("year").innerHTML = new Date().getFullYear();

  new bootstrap.Carousel(document.querySelector(".carousel"), {
    interval: 4000,
    keyboard: false,
    touch: false,
    hover: false,
    ride: "carousel"
  });
})();
