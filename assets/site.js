/* Piccoli effetti del sito: ombra sulla barra quando si scorre, comparsa morbida delle sezioni.
   Se questo file non si carica, la pagina resta comunque tutta visibile. */
(function () {
  var bar = document.querySelector(".topbar");
  if (bar) {
    var onScroll = function () { bar.classList.toggle("scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  var items = document.querySelectorAll("[data-reveal]");
  var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!items.length || calm || !("IntersectionObserver" in window)) return;

  document.documentElement.classList.add("reveal-ready");
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  items.forEach(function (el, i) {
    // gli elementi affiancati compaiono uno dopo l'altro
    var d = el.getAttribute("data-reveal");
    if (d) el.style.transitionDelay = (parseInt(d, 10) * 90) + "ms";
    io.observe(el);
  });
})();
