"use strict";

(function () {
  const page = document.querySelector("#page");
  const modeSwitch = document.querySelector("#mode-switch");
  const scrollToTopBtn = document.querySelector(".scroll-to-top");
  const body = document.querySelector("body");
  const pageContainer = document.querySelector(".page-container");
  const footer = document.querySelector("footer");
  const yearEl = document.getElementById("year");
  const printBtn = document.querySelector(".print-btn");
  const printGenerated = document.querySelector(".print-generated");

  // Dark mode
  if (modeSwitch) {
    // Restore saved preference or detect system preference
    const saved = localStorage.getItem("dark-mode");
    if (saved === "true" || (saved === null && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      page.classList.add("dark-mode");
      modeSwitch.checked = true;
    }

    modeSwitch.addEventListener("change", () => {
      page.classList.toggle("dark-mode");
      localStorage.setItem("dark-mode", page.classList.contains("dark-mode"));
    });

    // Listen for OS theme changes when no manual preference is saved
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (localStorage.getItem("dark-mode") !== null) return;
      page.classList.toggle("dark-mode", e.matches);
      modeSwitch.checked = e.matches;
    });
  }

  // Scroll to top
  if (scrollToTopBtn && body && pageContainer) {
    scrollToTopBtn.addEventListener("click", () => {
      body.scrollTo({ top: 0, behavior: "smooth" });
    });

    let ticking = false;
    body.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (body.scrollTop > 150) {
          scrollToTopBtn.classList.remove("disabled");
        } else {
          scrollToTopBtn.classList.add("disabled");
        }

        if (footer && body.scrollTop + window.innerHeight + 50 > pageContainer.offsetHeight) {
          const rects = footer.getClientRects();
          if (rects.length > 0) {
            scrollToTopBtn.style.bottom = `${Math.floor(rects[0].height + 15)}px`;
          }
        } else {
          scrollToTopBtn.style.bottom = "15px";
        }
        ticking = false;
      });
    });
  }

  // Footer year
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Print / Download button
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      if (printGenerated) {
        const now = new Date();
        printGenerated.textContent = `Generated on ${now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} at ${now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`;
      }
      window.print();
    });
  }
})();
