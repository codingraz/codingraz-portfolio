export function initRazMain() {
  const themeSwitchDesktop = document.getElementById("mode-switch");
  const themeSwitchMobile = document.getElementById("mode-switch-mob");
  const hamburgerBtn = document.getElementById("menu-toggle-hamburger");
  const mobileDropdown = document.getElementById("mobile-menu-dropdown");
  const navLinks = mobileDropdown?.querySelectorAll("a") || [];

  const initializeThemeSystem = () => {
    const storedTheme = localStorage.getItem("portfolio-theme-preference");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.classList.remove("dark");
    } else if (storedTheme === "dark" || (!storedTheme && systemPrefersDark)) {
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  const syncThemeToggleUI = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (themeSwitchDesktop) themeSwitchDesktop.checked = isDark;
    if (themeSwitchMobile) themeSwitchMobile.checked = isDark;
  };

  const setThemeState = (isDark) => {
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("portfolio-theme-preference", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("portfolio-theme-preference", "light");
    }
    syncThemeToggleUI();
  };

  themeSwitchDesktop?.addEventListener("change", (e) => setThemeState(e.target.checked));
  themeSwitchMobile?.addEventListener("change", (e) => setThemeState(e.target.checked));
  initializeThemeSystem();
  syncThemeToggleUI();

  hamburgerBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileDropdown?.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!mobileDropdown || mobileDropdown.classList.contains("hidden")) return;
    if (!mobileDropdown.contains(e.target) && e.target !== hamburgerBtn) {
      mobileDropdown.classList.add("hidden");
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileDropdown.classList.add("hidden");
    });
  });
}
