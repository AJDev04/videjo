// ========================================
// VIDEJO Website JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", function () {

  // ========================================
  // Cookie Bar
  // ========================================
  const cookieBar = document.getElementById("cookie-bar");
  if (cookieBar) {
    if (localStorage.getItem("videjo_cookie_ok")) {
      cookieBar.style.display = "none";
    }
  }

  window.sluitCookiebar = function () {
    const bar = document.getElementById("cookie-bar");
    if (!bar) return;
    bar.style.transform = "translateY(100%)";
    localStorage.setItem("videjo_cookie_ok", "1");
    setTimeout(() => { bar.style.display = "none"; }, 400);
  };

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    });
  });

  // ========================================
  // Scroll Animations (Intersection Observer)
  // ========================================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: "0px 0px -60px 0px",
    threshold: 0.08,
  });

  document.querySelectorAll(".fade-up, .fade-in").forEach((el) => observer.observe(el));

  document.querySelectorAll(".portfolio-grid, .services-grid").forEach((grid) => {
    grid.classList.add("stagger-children");
    observer.observe(grid);
  });

  // ========================================
  // Contact Form Handling
  // ========================================
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      if (!data.name || !data.email || !data.message) {
        showNotification("Vul alle verplichte velden in.", "error");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        showNotification("Vul een geldig e-mailadres in.", "error");
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Verzenden...";
      submitBtn.disabled = true;

      emailjs
        .send("service_a5tynms", "template_rfqih28", {
          name: data.name,
          company: data.company || "Niet opgegeven",
          email: data.email,
          message: data.message,
        })
        .then(() => {
          showNotification("Bedankt voor je bericht! Ik neem zo snel mogelijk contact met je op.", "success");
          contactForm.reset();
        })
        .catch((error) => {
          console.error("EmailJS fout:", error);
          showNotification("Er is iets misgegaan. Probeer het later opnieuw.", "error");
        })
        .finally(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });
  }

  // ========================================
  // Notification System
  // ========================================
  function showNotification(message, type = "info") {
    const existing = document.querySelector(".notification");
    if (existing) existing.remove();

    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;

    const bgColor = type === "success"
      ? "rgba(62, 145, 77, 0.95)"
      : type === "error"
        ? "var(--color-motion)"
        : "var(--color-primary)";

    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      max-width: 400px;
      padding: 1rem 1.5rem;
      background-color: ${bgColor};
      color: var(--color-cream);
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      gap: 1rem;
      z-index: 9999;
      animation: slideIn 0.3s ease;
      font-family: var(--font-main);
      font-size: 0.9rem;
    `;

    notification.innerHTML = `
      <span>${message}</span>
      <button style="background:none;border:none;color:inherit;font-size:1.5rem;cursor:pointer;opacity:0.7;line-height:1;padding:0;margin-left:auto;">&times;</button>
    `;

    document.body.appendChild(notification);

    const closeNotification = () => {
      notification.style.animation = "slideOut 0.3s ease forwards";
      setTimeout(() => notification.remove(), 300);
    };

    notification.querySelector("button").addEventListener("click", closeNotification);
    setTimeout(closeNotification, 5000);
  }

  // ========================================
  // Parallax Effect for Hero
  // ========================================
  const heroContent = document.querySelector(".hero-content");

  if (heroContent) {
    window.addEventListener("scroll", function () {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - scrolled / window.innerHeight;
      }
    }, { passive: true });
  }

  // ========================================
  // Video Modal (ready for portfolio use)
  // ========================================
  window.openVideoModal = function (videoUrl) {
    const modal = document.createElement("div");
    modal.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    modal.innerHTML = `
      <div style="position:absolute;inset:0;background:rgba(0,0,0,0.9);"></div>
      <div style="position:relative;width:90%;max-width:1000px;aspect-ratio:16/9;">
        <button style="position:absolute;top:-40px;right:0;background:none;border:none;color:white;font-size:2rem;cursor:pointer;">&times;</button>
        <iframe src="${videoUrl}" frameborder="0" allowfullscreen style="width:100%;height:100%;"></iframe>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = "hidden";

    const closeModal = () => {
      modal.remove();
      document.body.style.overflow = "";
    };

    modal.querySelector("div").addEventListener("click", closeModal);
    modal.querySelector("button").addEventListener("click", closeModal);
    document.addEventListener("keydown", function handler(e) {
      if (e.key === "Escape") { closeModal(); document.removeEventListener("keydown", handler); }
    });
  };

});

// ========================================
// Custom Cursor
// ========================================
const cursor = document.querySelector(".custom-cursor");
const dot = document.querySelector(".cursor-dot");

if (cursor && dot) {
  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });

  function animateCursor() {
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;
    cursor.style.left = currentX + "px";
    cursor.style.top = currentY + "px";
    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("cursor-hover"));
  });
}

// ========================================
// Menu Toggle
// ========================================
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelectorAll(".nav-links a");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
    document.body.classList.toggle("nav-open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("open");
      document.body.classList.remove("nav-open");
    });
  });
}