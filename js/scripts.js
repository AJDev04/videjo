// ========================================
// VIDEJO Website JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", function () {
	// ========================================
	// Mobile Navigation Toggle
	// ========================================
	const navToggle = document.getElementById("nav-toggle");
	const navMenu = document.getElementById("nav-menu");

	if (navToggle && navMenu) {
		navToggle.addEventListener("click", function () {
			navToggle.classList.toggle("active");
			navMenu.classList.toggle("active");
			document.body.style.overflow = navMenu.classList.contains("active")
				? "hidden"
				: "";
		});

		// Close menu when clicking on a link
		const navLinks = navMenu.querySelectorAll(".nav-link");
		navLinks.forEach((link) => {
			link.addEventListener("click", function () {
				navToggle.classList.remove("active");
				navMenu.classList.remove("active");
				document.body.style.overflow = "";
			});
		});
	}

	// ========================================
	// Smooth Scroll for Anchor Links
	// ========================================
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute("href"));

			if (target) {
				const headerOffset = 80;
				const elementPosition = target.getBoundingClientRect().top;
				const offsetPosition =
					elementPosition + window.pageYOffset - headerOffset;

				window.scrollTo({
					top: offsetPosition,
					behavior: "smooth",
				});
			}
		});
	});

	// Voeg dit toe aan je bestaande scripts.js, vervang het Scroll Animations blok:

	// ========================================
	// Scroll Animations (Intersection Observer)
	// ========================================
	const observerOptions = {
		root: null,
		rootMargin: "0px 0px -60px 0px",
		threshold: 0.08,
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	// fade-up elements
	document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

	// legacy fade-in
	const sections = document.querySelectorAll(
		".section-header, .portfolio-item, .service-card, .over-content, .over-visual, .contact-info, .contact-form-wrapper",
	);
	sections.forEach((el) => {
		el.classList.add("fade-in");
		observer.observe(el);
	});

	// stagger grids
	document
		.querySelectorAll(".portfolio-grid, .services-grid")
		.forEach((grid) => {
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
				.send("service_a5tynms", "u31q8oh", {
					name: data.name,
					company: data.company || "Niet opgegeven",
					email: data.email,
					message: data.message,
				})
				.then(() => {
					showNotification(
						"Bedankt voor je bericht! Ik neem zo snel mogelijk contact met je op.",
						"success",
					);
					contactForm.reset();
				})
				.catch((error) => {
					console.error("EmailJS fout:", error);
					showNotification(
						"Er is iets misgegaan. Probeer het later opnieuw.",
						"error",
					);
				})
				.finally(() => {
					submitBtn.textContent = originalText;
					submitBtn.disabled = false;
				});
		});
	}

	console.log("VIDEJO Website - contact Loaded");

	// ========================================
	// Notification System
	// ========================================
	function showNotification(message, type = "info") {
		// Remove existing notifications
		const existing = document.querySelector(".notification");
		if (existing) {
			existing.remove();
		}

		// Create notification element
		const notification = document.createElement("div");
		notification.className = `notification notification-${type}`;
		notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        `;

		// Add styles
		notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            max-width: 400px;
            padding: 1rem 1.5rem;
            background-color: ${type === "success" ? "var(--color-web)" : type === "error" ? "var(--color-motion)" : "var(--color-primary)"};
            color: var(--color-cream);
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 999;
            animation: slideIn 0.3s ease;
        `;

		// Add animation keyframes
		if (!document.querySelector("#notification-styles")) {
			const style = document.createElement("style");
			style.id = "notification-styles";
			style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
			document.head.appendChild(style);
		}

		// Style close button
		const closeBtn = notification.querySelector(".notification-close");
		closeBtn.style.cssText = `
            background: none;
            border: none;
            color: inherit;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.3s;
        `;

		// Add to DOM
		document.body.appendChild(notification);

		// Close functionality
		const closeNotification = () => {
			notification.style.animation = "slideOut 0.3s ease forwards";
			setTimeout(() => notification.remove(), 300);
		};

		closeBtn.addEventListener("click", closeNotification);

		// Auto-close after 5 seconds
		setTimeout(closeNotification, 5000);
	}

	// ========================================
	// Portfolio Item Hover Effects
	// ========================================
	const portfolioItems = document.querySelectorAll(".portfolio-item");

	portfolioItems.forEach((item) => {
		item.addEventListener("mouseenter", function () {
			this.style.zIndex = "10";
		});

		item.addEventListener("mouseleave", function () {
			this.style.zIndex = "";
		});
	});

	// ========================================
	// Parallax Effect for Hero (Optional)
	// ========================================
	const hero = document.querySelector(".hero");
	const heroContent = document.querySelector(".hero-content");

	if (hero && heroContent) {
		window.addEventListener("scroll", function () {
			const scrolled = window.pageYOffset;
			const rate = scrolled * 0.3;

			if (scrolled < window.innerHeight) {
				heroContent.style.transform = `translateY(${rate}px)`;
				heroContent.style.opacity = 1 - scrolled / window.innerHeight;
			}
		});
	}

	// ========================================
	// Active Navigation Link on Scroll
	// ========================================
	const navSections = document.querySelectorAll("section[id]");

	window.addEventListener("scroll", function () {
		const scrollPos = window.pageYOffset + 100;

		navSections.forEach((section) => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.offsetHeight;
			const sectionId = section.getAttribute("id");
			const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

			if (navLink) {
				if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
					document.querySelectorAll(".nav-link").forEach((link) => {
						link.classList.remove("active");
					});
					navLink.classList.add("active");
				}
			}
		});
	});

	// ========================================
	// Video Modal (for future portfolio videos)
	// ========================================
	function createVideoModal(videoUrl) {
		const modal = document.createElement("div");
		modal.className = "video-modal";
		modal.innerHTML = `
            <div class="video-modal-overlay"></div>
            <div class="video-modal-content">
                <button class="video-modal-close">&times;</button>
                <div class="video-wrapper">
                    <iframe src="${videoUrl}" frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
        `;

		modal.style.cssText = `
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

		const overlay = modal.querySelector(".video-modal-overlay");
		overlay.style.cssText = `
            position: absolute;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.9);
        `;

		const content = modal.querySelector(".video-modal-content");
		content.style.cssText = `
            position: relative;
            width: 90%;
            max-width: 1000px;
            aspect-ratio: 16/9;
        `;

		const closeBtn = modal.querySelector(".video-modal-close");
		closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
        `;

		const wrapper = modal.querySelector(".video-wrapper");
		wrapper.style.cssText = `
            width: 100%;
            height: 100%;
        `;

		const iframe = modal.querySelector("iframe");
		iframe.style.cssText = `
            width: 100%;
            height: 100%;
        `;

		document.body.appendChild(modal);
		document.body.style.overflow = "hidden";

		const closeModal = () => {
			modal.remove();
			document.body.style.overflow = "";
		};

		overlay.addEventListener("click", closeModal);
		closeBtn.addEventListener("click", closeModal);
		document.addEventListener("keydown", function (e) {
			if (e.key === "Escape") closeModal();
		});
	}

	// Expose modal function globally for future use
	window.openVideoModal = createVideoModal;
});

const cursor = document.querySelector(".custom-cursor");
const dot = document.querySelector(".cursor-dot");

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
	mouseX = e.clientX;
	mouseY = e.clientY;

	dot.style.left = mouseX + "px";
	dot.style.top = mouseY + "px";
});

// Smooth follow effect
let currentX = 0;
let currentY = 0;

function animate() {
	currentX += (mouseX - currentX) * 0.15;
	currentY += (mouseY - currentY) * 0.15;

	cursor.style.left = currentX + "px";
	cursor.style.top = currentY + "px";

	requestAnimationFrame(animate);
}

animate();

// Hover targets
const hoverElements = document.querySelectorAll("a, button");

hoverElements.forEach((el) => {
	el.addEventListener("mouseenter", () => {
		cursor.classList.add("cursor-hover");
	});
	el.addEventListener("mouseleave", () => {
		cursor.classList.remove("cursor-hover");
	});
});

// ========================================
// Menu Toggle
// ========================================
const menuBtn = document.querySelector(".menu-btn");
const navOverlay = document.querySelector(".nav-overlay");
const navLinks = document.querySelectorAll(".nav-links a");

if (menuBtn && navOverlay) {
	menuBtn.addEventListener("click", () => {
		menuBtn.classList.toggle("open");
		document.body.classList.toggle("nav-open");
	});

	// Close menu when clicking a link
	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
			menuBtn.classList.remove("open");
			document.body.classList.remove("nav-open");
		});
	});
}
