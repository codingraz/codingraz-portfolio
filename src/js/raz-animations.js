export function initRazAnimations() {
  const typewriterTarget = document.getElementById("typewriter-text");
  const standardStringsArray = ["Speed Optimizer", "WordPress Developer", "Mobile App Developer", "WordPress Expert"];
  let targetStringIdx = 0;
  let currentCharacterIdx = 0;
  let textDeletionMode = false;

  const runTypewriterIterationStep = () => {
    const fullCurrentStringValue = standardStringsArray[targetStringIdx];
    if (!textDeletionMode) {
      typewriterTarget.textContent = fullCurrentStringValue.substring(0, currentCharacterIdx + 1);
      currentCharacterIdx += 1;
      if (currentCharacterIdx === fullCurrentStringValue.length) {
        textDeletionMode = true;
        setTimeout(runTypewriterIterationStep, 2000);
        return;
      }
    } else {
      typewriterTarget.textContent = fullCurrentStringValue.substring(0, currentCharacterIdx - 1);
      currentCharacterIdx -= 1;
      if (currentCharacterIdx === 0) {
        textDeletionMode = false;
        targetStringIdx = (targetStringIdx + 1) % standardStringsArray.length;
      }
    }
    setTimeout(runTypewriterIterationStep, textDeletionMode ? 40 : 100);
  };
  if (typewriterTarget) setTimeout(runTypewriterIterationStep, 500);

  const filterActionButtons = Array.from(document.querySelectorAll(".filter-btn"));
  const projectGridContainer = document.getElementById("project-grid-container");
  if (projectGridContainer) {
    const initialProjectCardOrder = Array.from(projectGridContainer.querySelectorAll(":scope > .project-card-item"));
    initialProjectCardOrder.reverse().forEach((card) => projectGridContainer.appendChild(card));
  }
  const projectCardNodes = Array.from(document.querySelectorAll(".project-card-item"));
  const FILTER_ANIMATION_MS = 360;

  const animateFilteredLayout = (matchingFilterCriteria) => {
    const visibleBefore = projectCardNodes.filter((card) => !card.classList.contains("is-filter-hidden"));
    const firstRects = new Map(visibleBefore.map((card) => [card, card.getBoundingClientRect()]));

    projectCardNodes.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");
      const shouldShow = matchingFilterCriteria === "all" || cardCategory === matchingFilterCriteria;
      const wasHidden = card.classList.contains("is-filter-hidden");

      if (shouldShow) {
        card.classList.remove("is-filter-hidden");
        if (wasHidden) card.classList.add("is-filter-enter");
      } else {
        card.classList.add("is-filter-hidden");
      }
    });

    const visibleAfter = projectCardNodes.filter((card) => !card.classList.contains("is-filter-hidden"));
    const lastRects = new Map(visibleAfter.map((card) => [card, card.getBoundingClientRect()]));

    visibleAfter.forEach((card) => {
      const firstRect = firstRects.get(card);
      const lastRect = lastRects.get(card);

      if (!firstRect || !lastRect) return;

      const deltaX = firstRect.left - lastRect.left;
      const deltaY = firstRect.top - lastRect.top;
      if (deltaX === 0 && deltaY === 0) return;

      card.style.transition = "none";
      card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      card.getBoundingClientRect();
      card.style.transition = `transform ${FILTER_ANIMATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`;
      card.style.transform = "";
    });

    requestAnimationFrame(() => {
      visibleAfter.forEach((card) => card.classList.remove("is-filter-enter"));
    });
  };

  filterActionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterActionButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const matchingFilterCriteria = btn.getAttribute("data-filter");
      animateFilteredLayout(matchingFilterCriteria);
    });
  });

  const testimonialTrack = document.getElementById("testimonial-track-wrapper");
  const prevControlArrow = document.getElementById("slider-arrow-prev");
  const nextControlArrow = document.getElementById("slider-arrow-next");
  if (!testimonialTrack || !prevControlArrow || !nextControlArrow) return;

  let baseSlideIndex = 0;
  const totalSlidesCount = testimonialTrack.children.length;

  const getVisibleSlideCount = () => {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };
  const getMaxSlideIndex = () => Math.max(totalSlidesCount - getVisibleSlideCount(), 0);
  const getSlideTranslatePercent = () => 100 / getVisibleSlideCount();

  const refreshSliderTranslationPosition = () => {
    baseSlideIndex = Math.min(baseSlideIndex, getMaxSlideIndex());
    testimonialTrack.style.transform = `translateX(-${baseSlideIndex * getSlideTranslatePercent()}%)`;
  };

  nextControlArrow.addEventListener("click", () => {
    baseSlideIndex = baseSlideIndex >= getMaxSlideIndex() ? 0 : baseSlideIndex + 1;
    refreshSliderTranslationPosition();
  });

  prevControlArrow.addEventListener("click", () => {
    baseSlideIndex = baseSlideIndex <= 0 ? getMaxSlideIndex() : baseSlideIndex - 1;
    refreshSliderTranslationPosition();
  });

  let touchStartXPosition = 0;
  testimonialTrack.addEventListener(
    "touchstart",
    (e) => {
      touchStartXPosition = e.touches[0].clientX;
    },
    { passive: true }
  );
  testimonialTrack.addEventListener(
    "touchend",
    (e) => {
      const distanceDelta = e.changedTouches[0].clientX - touchStartXPosition;
      if (distanceDelta > 60) {
        baseSlideIndex = baseSlideIndex <= 0 ? getMaxSlideIndex() : baseSlideIndex - 1;
      } else if (distanceDelta < -60) {
        baseSlideIndex = baseSlideIndex >= getMaxSlideIndex() ? 0 : baseSlideIndex + 1;
      }
      refreshSliderTranslationPosition();
    },
    { passive: true }
  );

  window.addEventListener("resize", refreshSliderTranslationPosition, { passive: true });
}
