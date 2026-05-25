/* =========================================
   MAZEN MOSTAFA — PORTFOLIO JS
   ========================================= */
// ─── CURSOR ────────────────────────────────
const cursor = document.getElementById("cursor");
const cursorFollower = document.getElementById("cursorFollower");
let mouseX = 0,
  mouseY = 0;
let followerX = 0,
  followerY = 0;

if (cursor && cursorFollower && window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });
  const animateFollower = () => {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.left = followerX + "px";
    cursorFollower.style.top = followerY + "px";
    requestAnimationFrame(animateFollower);
  };
  animateFollower();
}

// ─── NAVBAR ────────────────────────────────
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");
  document.body.style.overflow = navLinks.classList.contains("open")
    ? "hidden"
    : "";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
    document.body.style.overflow = "";
  });
});

// ─── THEME TOGGLE ──────────────────────────
// const themeToggle = document.getElementById('themeToggle');
// const themeIcon = themeToggle.querySelector('.theme-icon');
// let isDark = true;

// const savedTheme = localStorage.getItem('theme');
// if (savedTheme === 'light') {
//   isDark = false;
//   document.body.classList.replace('dark', 'light');
//   themeIcon.textContent = '◑';
// }

// themeToggle.addEventListener('click', () => {
//   isDark = !isDark;
//   if (isDark) {
//     document.body.classList.replace('light', 'dark');
//     themeIcon.textContent = '◐';
//     localStorage.setItem('theme', 'dark');
//   } else {
//     document.body.classList.replace('dark', 'light');
//     themeIcon.textContent = '◑';
//     localStorage.setItem('theme', 'light');
//   }
// });

// ─── TYPED TEXT ────────────────────────────
const phrases = [
  "Frontend Developer",
  "React.js Specialist",
  "Next.js Engineer",
  "UI/UX Enthusiast",
  "Performance Optimizer",
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById("typedText");

function type() {
  if (!typedEl) return;
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
  let speed = isDeleting ? 40 : 80;
  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 300;
  }
  setTimeout(type, speed);
}
type();

// ─── MATRIX CANVAS ─────────────────────────
const canvas = document.getElementById("matrixCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  const resize = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  const cols = Math.floor(canvas.width / 18);
  const drops = Array(cols).fill(1);
  const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ";

  function draw() {
    ctx.fillStyle = "rgba(10, 10, 12, 0.04)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00e5a0";
    ctx.font = "12px Space Mono, monospace";
    drops.forEach((y, i) => {
      const c = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(c, i * 18, y * 18);
      if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }
  setInterval(draw, 60);
}

// ─── SCROLL REVEAL ─────────────────────────
const revealEls = document.querySelectorAll(".reveal");
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const siblings = [
          ...entry.target.parentElement.querySelectorAll(".reveal"),
        ];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, idx * 80);
        revealObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

revealEls.forEach((el) => revealObs.observe(el));

// ─── SKILL BARS ────────────────────────────
const barFills = document.querySelectorAll(".bar-fill");
const barObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute("data-width");
        setTimeout(() => {
          fill.style.width = width + "%";
        }, 300);
        barObs.unobserve(fill);
      }
    });
  },
  { threshold: 0.5 }
);
barFills.forEach((b) => barObs.observe(b));

// ─── SMOOTH SCROLL FOR ANCHORS ─────────────
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = document.getElementById("navbar").offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// ─── EMAILJS INIT ──────────────────────────
// ⚠️  Replace with your actual EmailJS Public Key
(function () {
  emailjs.init("KP5mi6DBn6TsWj0jp");
})();

// ─── TOAST SYSTEM ──────────────────────────
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${type === "success" ? "✓" : "✕"}</span>
    <span class="toast-msg">${message}</span>
  `;

  container.appendChild(toast);

  // Trigger entrance animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add("show"));
  });

  // Auto-remove after 5s
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}

// ─── CONTACT FORM WITH EMAILJS ─────────────
const form = document.getElementById("contactForm");

function showError(fieldId, errorId, msg) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  if (field) field.classList.add("error");
  if (error) error.textContent = msg;
}
function clearError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  if (field) field.classList.remove("error");
  if (error) error.textContent = "";
}

["name", "email", "message"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("input", () => clearError(id, id + "Error"));
  }
});

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    clearError("name", "nameError");
    clearError("email", "emailError");
    clearError("message", "messageError");

    if (!name || name.length < 2) {
      showError(
        "name",
        "nameError",
        "Please enter your name (at least 2 characters)."
      );
      valid = false;
    }
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailReg.test(email)) {
      showError("email", "emailError", "Please enter a valid email address.");
      valid = false;
    }
    if (!message || message.length < 10) {
      showError(
        "message",
        "messageError",
        "Please enter a message (at least 10 characters)."
      );
      valid = false;
    }

    if (!valid) return;

    // ─── Disable button & show spinner ─────
    const btn = document.getElementById("submitBtn");
    const btnText = btn.querySelector(".btn-text");
    const btnArrow = btn.querySelector(".btn-arrow");
    const btnSpinner = btn.querySelector(".btn-spinner");

    btn.disabled = true;
    btnText.hidden = true;
    btnArrow.hidden = true;
    // btnSpinner.hidden = true;
    btnSpinner.classList.remove("hidden");

    const resetBtn = () => {
      btn.disabled = false;
      btnText.hidden = false;
      btnArrow.hidden = false;
      // btnSpinner.hidden = true;
      btnSpinner.classList.add("hidden");
    };

    try {
      // ⚙️ Replace "YOUR_SERVICE_ID" and "YOUR_TEMPLATE_ID" with your EmailJS values
      await emailjs.sendForm(
        "service_exs1rr8",
        "template_l0hziec",
        form,
        "KP5mi6DBn6TsWj0jp"
      );

      showToast("Message sent! I'll get back to you soon. 🚀", "success");
      form.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      showToast(
        "Failed to send message. Please try again or email me directly.",
        "error"
      );
    } finally {
      resetBtn();
    }
  });
}

// ─── ACTIVE NAV HIGHLIGHT ──────────────────
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");
const navObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) => a.classList.remove("active"));
        const match = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );
        if (match) match.classList.add("active");
      }
    });
  },
  { rootMargin: "-50% 0px -50% 0px" }
);
sections.forEach((s) => navObs.observe(s));
