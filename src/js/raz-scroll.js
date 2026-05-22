export function initRazScroll() {
  const scrollProgressBar = document.getElementById("scroll-bar");
  const backToTopBtn = document.getElementById("back-to-top-scroller-btn");
  const elementsToReveal = document.querySelectorAll(".reveal-hidden");
  const counterItemNodes = document.querySelectorAll(".counter-metric-item");

  window.addEventListener(
    "scroll",
    () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progressPercent = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      if (scrollProgressBar) scrollProgressBar.style.width = `${progressPercent}%`;

      if (!backToTopBtn) return;
      if (window.scrollY > 500) {
        backToTopBtn.classList.remove("opacity-0", "translate-y-4", "pointer-events-none");
      } else {
        backToTopBtn.classList.add("opacity-0", "translate-y-4", "pointer-events-none");
      }
    },
    { passive: true }
  );

  backToTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const standardRevealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );
  elementsToReveal.forEach((el) => standardRevealObserver.observe(el));

  const counterTriggerObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const targetElement = entry.target;
        const absoluteTerminalValue = parseInt(targetElement.getAttribute("data-target"), 10);
        let currentTrackValue = 0;
        const updatePeriodDuration = Math.max(Math.floor(1500 / absoluteTerminalValue), 15);

        const executionTimerLoop = setInterval(() => {
          currentTrackValue += Math.ceil(absoluteTerminalValue / 60);
          if (currentTrackValue >= absoluteTerminalValue) {
            targetElement.textContent = absoluteTerminalValue + (absoluteTerminalValue === 98 ? "%" : "+");
            clearInterval(executionTimerLoop);
          } else {
            targetElement.textContent = currentTrackValue;
          }
        }, updatePeriodDuration);

        observer.unobserve(targetElement);
      });
    },
    { threshold: 0.5 }
  );
  counterItemNodes.forEach((counter) => counterTriggerObserver.observe(counter));
}
