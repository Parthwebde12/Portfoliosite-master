// ================= MOBILE MENU =================
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// ================= NAVBAR SCROLL EFFECT =================
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("bg-gray-900/80", "backdrop-blur-md", "shadow-lg");
  } else {
    navbar.classList.remove("bg-gray-900/80", "backdrop-blur-md", "shadow-lg");
  }
});

// ================= SCROLL REVEAL =================
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("opacity-0", "translate-y-10");
      entry.target.classList.add("opacity-100", "translate-y-0");

      // Animate skill bars
      const bars = entry.target.querySelectorAll(".skill-bar");
      bars.forEach(bar => {
        bar.style.width = bar.getAttribute("data-width");
        bar.style.transition = "width 1.5s ease";
      });
    }
  });
}, { threshold: 0.2 });

reveals.forEach(section => observer.observe(section));

// ================= TYPING EFFECT =================
const typingElement = document.getElementById("typing");

const texts = [
  "Full Stack Developer",
  "MERN Stack Specialist",
  "Backend API Builder",
  "UI/UX Focused Developer"
];

let textIndex = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

function typeEffect() {
  currentText = texts[textIndex];

  if (!isDeleting) {
    typingElement.textContent = currentText.slice(0, charIndex++);
    if (charIndex > currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }
  } else {
    typingElement.textContent = currentText.slice(0, charIndex--);
    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();