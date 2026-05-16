// VitaCare — site-wide interactions
// =====================================================================
// BOOKING_URL: when the government-issued booking link is available,
// replace the placeholder string below. Every element with
// [data-booking] across all pages will update automatically.
// =====================================================================
const BOOKING_URL = "book.html";

(function () {
  // 1) Wire all booking CTAs
  document.querySelectorAll("[data-booking]").forEach((el) => {
    if (el.tagName === "A") {
      el.setAttribute("href", BOOKING_URL);
      if (BOOKING_URL.startsWith("http")) {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
      }
    } else {
      el.addEventListener("click", () => {
        if (BOOKING_URL.startsWith("http")) window.open(BOOKING_URL, "_blank", "noopener");
        else window.location.href = BOOKING_URL;
      });
    }
  });

  // 2) Sticky nav background on scroll
  const nav = document.querySelector(".nav-shell");
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 8) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // 3) Mobile nav toggle
  const burger = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  if (burger && menu) {
    burger.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => menu.classList.remove("open"))
    );
  }

  // 4) Reveal on scroll (IntersectionObserver)
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  // 5) Current year in footer
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  // 6) Prefetch internal pages on hover/touch so navigation feels instant
  const prefetched = new Set();
  const prefetchPage = (href) => {
    if (!href || prefetched.has(href)) return;
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return;
    let url;
    try { url = new URL(href, window.location.href); } catch { return; }
    if (url.origin !== window.location.origin) return;
    if (url.pathname === window.location.pathname) return;
    prefetched.add(href);
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = url.pathname + url.search;
    link.as = "document";
    document.head.appendChild(link);
  };
  document.querySelectorAll("a[href]").forEach((a) => {
    a.addEventListener("mouseenter", () => prefetchPage(a.getAttribute("href")), { passive: true });
    a.addEventListener("touchstart", () => prefetchPage(a.getAttribute("href")), { passive: true });
  });
})();
