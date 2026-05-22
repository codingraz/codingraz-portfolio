export function initRazCursor() {
  const cursorDot = document.getElementById("cursorDot");
  const cursorOutline = document.getElementById("cursorOutline");
  if (!cursorDot || !cursorOutline) return;

  let targetX = 0;
  let targetY = 0;
  let dotX = 0;
  let dotY = 0;
  let outlineX = 0;
  let outlineY = 0;
  let hasMoved = false;
  const dotEasing = 0.25;
  const outlineEasing = 0.08;

  document.addEventListener(
    "mousemove",
    (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!hasMoved) {
        dotX = targetX;
        dotY = targetY;
        outlineX = targetX;
        outlineY = targetY;
        cursorDot.style.opacity = "1";
        cursorOutline.style.opacity = "1";
        hasMoved = true;
      }
    },
    { passive: true }
  );

  document.addEventListener("mouseleave", () => {
    cursorDot.style.opacity = "0";
    cursorOutline.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    if (!hasMoved) return;
    cursorDot.style.opacity = "1";
    cursorOutline.style.opacity = "1";
  });

  const renderCursorFrame = () => {
    dotX += (targetX - dotX) * dotEasing;
    dotY += (targetY - dotY) * dotEasing;
    outlineX += (targetX - outlineX) * outlineEasing;
    outlineY += (targetY - outlineY) * outlineEasing;
    cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
    cursorOutline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursorFrame);
  };
  requestAnimationFrame(renderCursorFrame);

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest("a") || e.target.closest("button") || e.target.closest(".hover-target")) {
      document.body.classList.add("cursor-hover-active");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest("a") || e.target.closest("button") || e.target.closest(".hover-target")) {
      document.body.classList.remove("cursor-hover-active");
    }
  });
}
