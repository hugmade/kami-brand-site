(function () {
  "use strict";

  function onIntersect(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }

  var observer = new IntersectionObserver(onIntersect, {
    root: null,
    rootMargin: "0px 0px -8% 0px",
    threshold: 0
  });

  // Hero, Concept block, Story, Product, Philosophy, CTA
  var targets = document.querySelectorAll(
    ".hero, .block--concept, .section--story, .section--product, .section--philosophy, .section--cta"
  );
  targets.forEach(function (el) {
    observer.observe(el);
  });

  // Hero パララックス: スクロールで背景がわずかに遅れて動く
  var heroVisual = document.querySelector(".hero__visual");
  if (!heroVisual) return;

  var ticking = false;
  function updateParallax() {
    var y = window.scrollY || window.pageYOffset;
    var rate = 0.22;
    var value = y * rate;
    heroVisual.style.setProperty("--parallax", value + "px");
    heroVisual.style.transform = "translate3d(0, " + value + "px, 0)";
    ticking = false;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateParallax);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  updateParallax();
})();
