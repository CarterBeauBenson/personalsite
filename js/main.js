function applySiteConfig() {
  const config = window.SITE_CONFIG;

  if (!config) {
    console.error("SITE_CONFIG is missing.");
    return;
  }


  document.querySelectorAll("[data-config-href]").forEach((link) => {
    const key = link.getAttribute("data-config-href");

    if (config[key]) {
      link.href = config[key];
    }
  });


  document.querySelectorAll("[data-cubrc-email]").forEach((link) => {
    if (!config.cubrcEmail) return;

    link.textContent = config.cubrcEmail;
    link.href = `mailto:${config.cubrcEmail}`;
  });


  document.querySelectorAll("[data-personal-email]").forEach((link) => {
    if (!config.personalEmail) return;

    link.textContent = config.personalEmail;
    link.href = `mailto:${config.personalEmail}`;
  });
}


function setCopyrightYear() {
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
}


function setupMobileNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen =
      toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

    document.body.classList.toggle(
      "menu-open",
      !isOpen
    );
  });


  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute(
        "aria-expanded",
        "false"
      );

      document.body.classList.remove(
        "menu-open"
      );
    });
  });
}


function setupHeaderScroll() {
  const header =
    document.querySelector(".site-header");

  if (!header) return;

  function updateHeader() {
    header.classList.toggle(
      "scrolled",
      window.scrollY > 20
    );
  }

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    {
      passive: true
    }
  );
}


function setupRevealAnimations() {
  const elements =
    document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => {
      element.classList.add("visible");
    });

    return;
  }

  const observer =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.12
      }
    );

  elements.forEach((element) => {
    observer.observe(element);
  });
}


function initializeSite() {
  applySiteConfig();
  setCopyrightYear();
  setupMobileNavigation();
  setupHeaderScroll();
  setupRevealAnimations();
}


document.addEventListener(
  "DOMContentLoaded",
  initializeSite
);
