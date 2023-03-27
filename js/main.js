"use strict";

(function () {
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
      scrollToTop.style.bottom = `${Math.floor(footerHeight + 15)}px`
    } else {
      scrollToTop.style.bottom = '15px';
    }
  });

  document.querySelectorAll("#intro a").forEach(item =>
    item.addEventListener("click", (event) => {
      event.preventDefault();

      const offset = window.innerWidth < 1000 ? -30 : 70;
      const target = document.querySelector(`a${event.target.attributes.href.value}`);
      body.scrollTo({top: target.offsetTop + offset, behavior: 'smooth'});
    })
  )

  document.getElementById("year").innerHTML = new Date().getFullYear();
})();
