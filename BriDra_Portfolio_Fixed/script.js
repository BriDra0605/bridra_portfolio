const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".global-nav");
if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
  });
}

if (menuButton && nav) {
  const navLinks = nav.querySelectorAll("a");

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "メニューを開く" : "メニューを閉じる");
    nav.classList.toggle("is-open");
    document.body.classList.toggle("menu-open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "メニューを開く");
      nav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

/* Custom cursor */
const cursor = document.querySelector(".custom-cursor");
const follower = document.querySelector(".custom-cursor-follower");
const cursorLabel = document.querySelector(".custom-cursor-label");
const supportsCustomCursor = window.matchMedia("(pointer: fine)").matches;

if (cursor && follower && cursorLabel && supportsCustomCursor) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  const setCursorMode = (target) => {
    const interactive = target.closest(
      ".work-card a, .gallery-item a, .button, .header-contact, .contact-link, .next-project a, .work-back, .global-nav a, .logo, a, button"
    );

    document.body.classList.remove("cursor-active", "cursor-view", "cursor-mail");
    cursorLabel.textContent = "";

    if (!interactive) return;

    document.body.classList.add("cursor-active");

    if (
      interactive.matches(".work-card a") ||
      interactive.closest(".work-card") ||
      interactive.matches(".gallery-item a")
    ) {
      document.body.classList.add("cursor-view");
      cursorLabel.textContent = "VIEW";
      return;
    }

    if (
      interactive.matches('a[href^="mailto:"]') ||
      interactive.matches(".contact-link")
    ) {
      document.body.classList.add("cursor-mail");
      cursorLabel.textContent = "MAIL";
      return;
    }

    cursorLabel.textContent = "OPEN";
  };

  const animateFollower = () => {
    followerX += (mouseX - followerX) * 0.16;
    followerY += (mouseY - followerY) * 0.16;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(animateFollower);
  };

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

    document.body.classList.add("cursor-ready");
    document.body.classList.remove("cursor-hidden");
    setCursorMode(event.target);
  });

  document.addEventListener("mouseleave", () => {
    document.body.classList.add("cursor-hidden");
  });

  document.addEventListener("mouseenter", () => {
    document.body.classList.remove("cursor-hidden");
  });

  window.addEventListener("mousedown", () => {
    document.body.classList.add("cursor-click");
  });

  window.addEventListener("mouseup", () => {
    document.body.classList.remove("cursor-click");
  });

  animateFollower();
}

/* Restore the page correctly when returning with the browser Back button. */
window.addEventListener("pageshow", () => {
  document.body.classList.remove(
    "page-leaving",
    "cursor-click",
    "cursor-hidden",
    "menu-open"
  );

  document.querySelectorAll(".reveal").forEach((item) => {
    item.classList.add("is-visible");
  });

  if (nav) {
    nav.classList.remove("is-open");
  }

  if (menuButton) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "メニューを開く");
  }
});
