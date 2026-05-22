import "./css/raz-base.css";
import "./css/raz-components.css";
import "./css/raz-utilities.css";
import "./css/raz-animations.css";

import { initRazMain } from "./js/raz-main.js";
import { initRazCursor } from "./js/raz-cursor.js";
import { initRazScroll } from "./js/raz-scroll.js";
import { initRazAnimations } from "./js/raz-animations.js";
import { initRazContact } from "./js/raz-contact.js";
import { initRazTelegram } from "./js/raz-telegram.js";

document.addEventListener("DOMContentLoaded", () => {
  initRazMain();
  initRazCursor();
  initRazScroll();
  initRazAnimations();
  initRazContact();
  initRazTelegram();
});
