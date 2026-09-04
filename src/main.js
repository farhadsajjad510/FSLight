import "./styles/main.css";

import { menu } from "./data/menu.js";
import { getCurrentTime } from "./utils/time.js";
import { getBatteryLevel } from "./utils/battery.js";

import { initFlashlight } from "./features/flashlight.js";
import { initScreenLight } from "./features/screenLight.js";
import { initSOS } from "./features/sos.js";
import { initStrobe } from "./features/strobe.js";
import { initTimer } from "./features/timer.js";


const menuHTML = menu.map(item => `
  <button class="menu-btn" data-title="${item.title}">
    <span class="menu-icon">${item.icon}</span>
    <span>${item.title}</span>
  </button>
`).join("");

document.querySelector("#app").innerHTML = `
  <div class="app">

    <aside class="sidebar" id="sidebar">
      <div class="logo">
        <h2>FS Light</h2>
        <p>FarhadAIStudio</p>
      </div>

      <nav>${menuHTML}</nav>
    </aside>

    <div class="sidebar-overlay" id="overlay"></div>

    <main class="content">

      <button class="menu-toggle" id="menuBtn">☰</button>

      <section class="settings-panel" id="settingsPanel">

        <div class="settings-top">
          <div class="settings-title">
            <div class="settings-title-icon">⚙️</div>
            <div>
              <h2>Settings</h2>
              <p>Make FS Light yours</p>
            </div>
          </div>

          <button class="settings-close" id="settingsClose">✕</button>
        </div>

        <div class="settings-section">
          <div class="section-label">PREFERENCES</div>

          <div class="setting-row">
            <div class="setting-main">
              <div class="setting-icon">🌙</div>
              <div>
                <h3>Dark Mode</h3>
                <p>Comfortable dark interface</p>
              </div>
            </div>

            <label class="switch">
              <input type="checkbox" id="darkModeToggle" checked>
              <span></span>
            </label>
          </div>

          <div class="setting-row">
            <div class="setting-main">
              <div class="setting-icon">🔔</div>
              <div>
                <h3>Sound</h3>
                <p>Button and app sounds</p>
              </div>
            </div>

            <label class="switch">
              <input type="checkbox" id="soundToggle" checked>
              <span></span>
            </label>
          </div>

          <div class="setting-row">
            <div class="setting-main">
              <div class="setting-icon">📳</div>
              <div>
                <h3>Vibration</h3>
                <p>Haptic feedback on controls</p>
              </div>
            </div>

            <label class="switch">
              <input type="checkbox" id="vibrationToggle" checked>
              <span></span>
            </label>
          </div>

          <div class="setting-row">
            <div class="setting-main">
              <div class="setting-icon">💡</div>
              <div>
                <h3>Remember State</h3>
                <p>Remember your last preference</p>
              </div>
            </div>

            <label class="switch">
              <input type="checkbox" id="rememberToggle">
              <span></span>
            </label>
          </div>
        </div>

        <div class="settings-section">
          <div class="section-label">APP</div>

          <button class="settings-action" id="aboutAction">
            <span class="setting-icon">ℹ️</span>
            <span>
              <strong>About FS Light</strong>
              <small>FarhadAIStudio • Version 1.0</small>
            </span>
            <b>›</b>
          </button>

          <button class="settings-action" id="rateAction">
            <span class="setting-icon">⭐</span>
            <span>
              <strong>Rate FS Light</strong>
              <small>Enjoying the app? Let us know</small>
            </span>
            <b>›</b>
          </button>
        </div>

        <div class="settings-section">
          <div class="section-label">SPECIAL</div>

          <div class="settings-card special-card">
            <div class="special-icon">👑</div>
            <div>
              <h3>Two Princes</h3>
              <p>Special FS Light section</p>
            </div>
          </div>

          <div class="settings-card special-card">
            <div class="special-icon ff-icon">F&F</div>
            <div>
              <h3>F&F</h3>
              <p>FarhadAIStudio family</p>
            </div>
          </div>
        </div>

        <button class="reset-settings" id="resetSettings">
          ↻ Reset All Settings
        </button>

        <div class="settings-footer">
          <span>FS Light</span>
          <span>Made with ❤️ by FarhadAIStudio</span>
        </div>

      </section>

      <div class="brand">
        <span>⚡</span>
        <h1>FS Light</h1>
      </div>

      <p class="subtitle">Smart Light • Simple • Powerful</p>

      <div class="flash-card">

        <div id="bulb" class="flash-icon">🔦</div>

        <button id="toggle">Turn ON</button>

        <h3 id="status">Flashlight OFF</h3>

        <div class="info-row">
          <span>🕒 <b id="clock">--:--</b></span>
          <span>🔋 <b id="battery">--%</b></span>
        </div>

      </div>

      <p class="footer">Powered by FarhadAIStudio</p>

    </main>

  </div>
`;

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const menuBtn = document.getElementById("menuBtn");

function closeSidebar() {
  sidebar.classList.remove("show");
  overlay.classList.remove("show");
}

menuBtn.onclick = () => {
  sidebar.classList.toggle("show");
  overlay.classList.toggle("show");
};

overlay.onclick = closeSidebar;

const toggle = document.getElementById("toggle");
const status = document.getElementById("status");
const bulb = document.getElementById("bulb");

initFlashlight(toggle, status, bulb);


/* =========================
   SHARE APP
========================= */

async function shareFSlight() {

  const shareData = {
    title: "FS Light",
    text: "Check out FS Light — Smart Light • Simple • Powerful ⚡",
    url: window.location.href
  };

  try {

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(
        window.location.href
      );

      status.textContent = "Link copied — share it with your friends!";
      return;
    }

    status.textContent = "Sharing is not supported on this device.";

  } catch (error) {

    if (error?.name === "AbortError") {
      return;
    }

    console.error("Share error:", error);
    status.textContent = "Unable to share right now.";
  }
}

const buttons = [...document.querySelectorAll(".menu-btn")];

const getButton = title =>
  buttons.find(button => button.dataset.title === title);

const screenBtn = getButton("Screen Light");
const sosBtn = getButton("SOS Mode");
const strobeBtn = getButton("Strobe");
const timerBtn = getButton("Timer");

if (screenBtn) initScreenLight(screenBtn, status);
if (sosBtn) initSOS(sosBtn, status);
if (strobeBtn) initStrobe(strobeBtn, status);
if (timerBtn) initTimer(timerBtn, status);



/* =========================
   RATE APP MODAL
========================= */

const rateModalHTML = `
  <div class="rate-modal" id="rateModal">

    <div class="rate-backdrop" id="rateBackdrop"></div>

    <div class="rate-card">

      <button class="rate-close" id="rateClose">✕</button>

      <div class="rate-icon">⭐</div>

      <h2>Enjoying FS Light?</h2>

      <p>
        Your support means a lot to us.
        Give FS Light a rating and help us improve.
      </p>

      <div class="stars" id="ratingStars">
        <button data-rating="1">★</button>
        <button data-rating="2">★</button>
        <button data-rating="3">★</button>
        <button data-rating="4">★</button>
        <button data-rating="5">★</button>
      </div>

      <div class="rating-text" id="ratingText">
        Tap a star to rate
      </div>

      <button class="rate-submit" id="rateSubmit" disabled>
        Submit Rating
      </button>

      <button class="rate-later" id="rateLater">
        Maybe Later
      </button>

      <div class="rate-brand">
        ⚡ FS Light • FarhadAIStudio
      </div>

    </div>
  </div>
`;

document.body.insertAdjacentHTML("beforeend", rateModalHTML);

const rateModal = document.getElementById("rateModal");
const rateClose = document.getElementById("rateClose");
const rateBackdrop = document.getElementById("rateBackdrop");
const rateLater = document.getElementById("rateLater");
const rateSubmit = document.getElementById("rateSubmit");
const ratingText = document.getElementById("ratingText");
const ratingStars = [...document.querySelectorAll("#ratingStars button")];

let selectedRating = 0;

function openRate() {
  rateModal.classList.add("show");
}

function closeRate() {
  rateModal.classList.remove("show");
}

const ratingMessages = [
  "",
  "We'll work harder to improve ❤️",
  "Thanks! We're listening 💙",
  "Glad you're enjoying FS Light 😊",
  "That's awesome! ⭐",
  "Thank you for supporting FS Light! ❤️"
];

ratingStars.forEach(star => {
  star.onclick = () => {
    selectedRating = Number(star.dataset.rating);

    ratingStars.forEach(item => {
      item.classList.toggle(
        "selected",
        Number(item.dataset.rating) <= selectedRating
      );
    });

    ratingText.textContent = ratingMessages[selectedRating];
    rateSubmit.disabled = false;
  };
});

rateSubmit.onclick = () => {
  localStorage.setItem("fslight_rating", String(selectedRating));

  rateSubmit.textContent = "Thank You ❤️";
  ratingText.textContent = "Your feedback has been saved.";

  setTimeout(() => {
    closeRate();
    rateSubmit.textContent = "Submit Rating";
  }, 900);
};

rateClose.onclick = closeRate;
rateBackdrop.onclick = closeRate;
rateLater.onclick = closeRate;

/* =========================
   ABOUT MODAL
========================= */

const aboutModalHTML = `
  <div class="about-modal" id="aboutModal">

    <div class="about-backdrop" id="aboutBackdrop"></div>

    <div class="about-card">

      <button class="about-close" id="aboutClose">✕</button>

      <div class="about-logo">
        <div class="about-logo-glow">⚡</div>
      </div>

      <h2>FS Light</h2>
      <p class="about-version">Version 1.0</p>

      <div class="about-divider"></div>

      <p class="about-description">
        A simple, smart and powerful flashlight experience
        crafted by <strong>FarhadAIStudio</strong>.
      </p>

      <div class="about-brand-card">
        <div class="about-brand-icon">⚡</div>
        <div>
          <strong>FarhadAIStudio</strong>
          <span>Innovation • Creativity • Technology</span>
        </div>
      </div>

      <div class="about-contact-title">
        CONNECT WITH US
      </div>

      <button class="whatsapp-card" id="whatsappChannel">

        <div class="whatsapp-icon">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path
              fill="currentColor"
              d="M16 3C8.82 3 3 8.82 3 16c0 2.29.6 4.44 1.73 6.31L3 29l6.86-1.68A12.94 12.94 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3Zm0 23.72c-2.08 0-4.12-.56-5.9-1.62l-.42-.25-4.07 1 1.09-3.96-.27-.43A10.7 10.7 0 1 1 16 26.72Zm5.86-7.98c-.32-.16-1.88-.93-2.17-1.04-.29-.11-.5-.16-.71.16-.21.32-.81 1.04-.99 1.25-.18.21-.36.24-.68.08-.32-.16-1.36-.5-2.59-1.6-.96-.86-1.61-1.92-1.8-2.24-.19-.32-.02-.49.14-.65.14-.14.32-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.72-.97-2.36-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.55.08-.84.39-.29.32-1.1 1.08-1.1 2.64s1.13 3.06 1.29 3.27c.16.21 2.23 3.4 5.4 4.77.75.32 1.34.51 1.8.65.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.15-1.51.26-.74.26-1.38.18-1.51-.08-.13-.29-.21-.61-.37Z"
            />
          </svg>
        </div>

        <div class="whatsapp-text">
          <strong>Official WhatsApp Channel</strong>
          <span>Follow the FarhadAIStudio Official channel on WhatsApp</span>
        </div>

        <div class="whatsapp-arrow">›</div>

      </button>

      <div class="about-footer">
        <span>Made with ❤️</span>
        <span>FarhadAIStudio</span>
      </div>

    </div>
  </div>
`;

document.body.insertAdjacentHTML("beforeend", aboutModalHTML);

const aboutModal = document.getElementById("aboutModal");
const aboutClose = document.getElementById("aboutClose");
const aboutBackdrop = document.getElementById("aboutBackdrop");
const whatsappChannel = document.getElementById("whatsappChannel");

function openAbout() {
  aboutModal.classList.add("show");
}

function closeAbout() {
  aboutModal.classList.remove("show");
}

aboutClose.onclick = closeAbout;
aboutBackdrop.onclick = closeAbout;

whatsappChannel.onclick = () => {
  const channel =
    ["https://whatsapp.com/channel/", "0029Vb8Zqnt6LwHu9naubY0c"].join("");

  window.open(channel, "_blank", "noopener,noreferrer");
};

const settingsPanel = document.getElementById("settingsPanel");
const settingsClose = document.getElementById("settingsClose");

const darkModeToggle = document.getElementById("darkModeToggle");
const soundToggle = document.getElementById("soundToggle");
const vibrationToggle = document.getElementById("vibrationToggle");
const rememberToggle = document.getElementById("rememberToggle");
const resetSettings = document.getElementById("resetSettings");

function saveSetting(key, value) {
  localStorage.setItem("fslight_" + key, value);
}

function loadSetting(key, fallback) {
  const value = localStorage.getItem("fslight_" + key);
  return value === null ? fallback : value === "true";
}

darkModeToggle.checked = loadSetting("darkMode", true);
soundToggle.checked = loadSetting("sound", true);
vibrationToggle.checked = loadSetting("vibration", true);
rememberToggle.checked = loadSetting("remember", false);

darkModeToggle.onchange = () => {
  saveSetting("darkMode", darkModeToggle.checked);
  document.body.classList.toggle("light-mode", !darkModeToggle.checked);
};

soundToggle.onchange = () => {
  saveSetting("sound", soundToggle.checked);
};

vibrationToggle.onchange = () => {
  saveSetting("vibration", vibrationToggle.checked);
};

rememberToggle.onchange = () => {
  saveSetting("remember", rememberToggle.checked);
};

resetSettings.onclick = () => {
  localStorage.removeItem("fslight_darkMode");
  localStorage.removeItem("fslight_sound");
  localStorage.removeItem("fslight_vibration");
  localStorage.removeItem("fslight_remember");

  darkModeToggle.checked = true;
  soundToggle.checked = true;
  vibrationToggle.checked = true;
  rememberToggle.checked = false;

  document.body.classList.remove("light-mode");
};

settingsClose.onclick = () => {
  settingsPanel.classList.remove("open");
};

buttons.forEach(button => {
  button.addEventListener("click", () => {

    const title = button.dataset.title;

    if (title === "Settings") {
      settingsPanel.classList.add("open");
      closeSidebar();
      return;
    }

    if (title === "About") {
      openAbout();
      closeSidebar();
      return;
    }

    if (title === "Rate App") {
      openRate();
      closeSidebar();
      return;
    }

    if (title === "Share") {
      shareFSlight();
      closeSidebar();
      return;
    }

    if (
      title !== "Screen Light" &&
      title !== "SOS Mode" &&
      title !== "Strobe" &&
      title !== "Timer"
    ) {
      status.textContent = title + " selected";
    }

    if (window.innerWidth <= 900) {
      closeSidebar();
    }
  });
});

function updateClock() {
  document.getElementById("clock").textContent = getCurrentTime();
}

updateClock();
setInterval(updateClock, 1000);

getBatteryLevel().then(level => {
  document.getElementById("battery").textContent =
    level === "--" ? "--" : level + "%";
});
