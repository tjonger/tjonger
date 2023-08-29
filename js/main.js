"use strict";

function darkMode() {
  document
    .querySelector("#mode-switch")
    .addEventListener("change", function () {
      document.querySelector("#page").classList.toggle("dark-mode");
    });
}

function scrollToTop() {
  const scrollToTop = document.querySelector(".scroll-to-top");
  scrollToTop.addEventListener("click", function () {
    body.scrollTo({ top: 0, behavior: "smooth" });
  });

  const body = document.querySelector("body");
  const pageContainer = document.querySelector(".page-container");
  body.addEventListener("scroll", function () {
    if (body.scrollTop > 150) {
      scrollToTop.classList.remove("disabled");
    } else {
      scrollToTop.classList.add("disabled");
    }

    if (body.scrollTop + window.innerHeight + 50 > pageContainer.offsetHeight) {
      const footerHeight = document
        .querySelector("footer")
        .getClientRects()[0].height;
      scrollToTop.style.bottom = `${Math.floor(footerHeight + 15)}px`;
    } else {
      scrollToTop.style.bottom = "15px";
    }
  });
}

function footerYear() {
  document.getElementById("year").innerHTML = new Date().getFullYear();
}

(function () {
  darkMode();
  scrollToTop();
  footerYear();
})();
