const navbar = document.getElementById('navbar');
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Show/hide back to top button
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

// Force CV download instead of opening in browser
document.querySelector('.about-text a.btn-primary').addEventListener('click', function (e) {
  e.preventDefault();
  const fileUrl = './images/vijaykiran_software_engineer45.pdf';

  fetch(fileUrl)
    .then(res => res.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'VijayKiran_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    })
    .catch(err => console.error('Download failed:', err));
});
// Back to top button click
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===========================
// Mobile Hamburger Menu Toggle
// ===========================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ===========================
// Dynamic Typing Effect (Hero)
// ===========================
const typedTextEl = document.getElementById('typed-text');
const roles = [
  'Frontend Developer',
  'DSA Problem Solver',
  'JAVA Developer',
  'SPRING BOOT Enthusiast'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typedTextEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedTextEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let typingSpeed = isDeleting ? 60 : 110;

  // When word is fully typed
  if (!isDeleting && charIndex === currentRole.length) {
    typingSpeed = 1800; // pause before deleting
    isDeleting = true;
  }
  // When word is fully deleted, move to next word
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 400; // pause before typing next word
  }

  setTimeout(typeEffect, typingSpeed);
}

// Start typing effect on load
document.addEventListener('DOMContentLoaded', typeEffect);

// ===========================
// Animated Skill Progress Bars (on scroll into view)
// ===========================
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = () => {
  skillBars.forEach(bar => {
    const barTop = bar.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (barTop < windowHeight - 100 && !bar.classList.contains('animated')) {
      const targetWidth = bar.getAttribute('data-width');
      bar.style.width = targetWidth + '%';
      bar.classList.add('animated');
    }
  });
};

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// ===========================
// Contact Form Validation
// ===========================
const contactForm = document.getElementById('contact-form');

const validators = {
  name: (value) => value.trim().length >= 2,
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
  subject: (value) => value.trim().length >= 3,
  message: (value) => value.trim().length >= 10
};

// Validate a single field and toggle classes
function validateField(field) {
  const value = field.value;
  const isValid = validators[field.name] ? validators[field.name](value) : value.trim() !== '';

  if (isValid) {
    field.classList.remove('invalid');
    field.classList.add('valid');
  } else {
    field.classList.remove('valid');
    field.classList.add('invalid');
  }

  return isValid;
}

// Live validation on blur/input
['name', 'email', 'subject', 'message'].forEach(id => {
  const field = document.getElementById(id);
  field.addEventListener('blur', () => validateField(field));
  field.addEventListener('input', () => {
    if (field.classList.contains('invalid') || field.classList.contains('valid')) {
      validateField(field);
    }
  });
});

// Handle form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let isFormValid = true;

  ['name', 'email', 'subject', 'message'].forEach(id => {
    const field = document.getElementById(id);
    const valid = validateField(field);
    if (!valid) isFormValid = false;
  });

  if (isFormValid) {
    alert('✅ Thank you! Your message has been sent successfully.');
    contactForm.reset();

    // Remove validation classes after reset
    contactForm.querySelectorAll('input, textarea').forEach(field => {
      field.classList.remove('valid', 'invalid');
    });
  } else {
    alert('⚠️ Please fix the highlighted fields before submitting.');
  }
});

// ===========================
// Update Footer Year Automatically
// ===========================
document.getElementById('year').textContent = new Date().getFullYear();

