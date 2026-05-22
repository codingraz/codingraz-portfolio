const FORM_ENDPOINT_URL =
  import.meta.env.VITE_FORM_ENDPOINT_URL ||
  "https://script.google.com/macros/s/AKfycbwwe_GanHIgpX45qwyWxrqG2u_nRXocdY-wrG-7u4uxiektf8FGRXfR2ae1e-GJubOEGw/exec";

export function initRazContact() {
  const contactFormElement = document.getElementById("portfolio-contact-form");
  const feedbackMessageNode = document.getElementById("form-response-status-feedback");
  if (!contactFormElement || !feedbackMessageNode) return;

  const setFormFeedback = (message, colorClass) => {
    feedbackMessageNode.classList.remove("hidden", "text-emerald-500", "text-red-500", "text-portfolio-primary");
    feedbackMessageNode.classList.add("block", colorClass);
    feedbackMessageNode.textContent = message;
  };

  const sanitize = (value) => value.replace(/[<>]/g, "").trim();

  contactFormElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!FORM_ENDPOINT_URL || FORM_ENDPOINT_URL.indexOf("PASTE_") === 0) {
      setFormFeedback("Integration is not configured yet. Add endpoint placeholder first.", "text-red-500");
      return;
    }

    const name = sanitize(document.getElementById("form-input-name").value);
    const email = sanitize(document.getElementById("form-input-email").value);
    const message = sanitize(document.getElementById("form-input-msg").value);

    if (!name || !email || !message) {
      setFormFeedback("Please complete all required fields.", "text-red-500");
      return;
    }

    setFormFeedback("Processing request transmission...", "text-portfolio-primary");

    const payload = {
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
      source: window.location.href,
    };

    try {
      const isAppsScriptEndpoint =
        FORM_ENDPOINT_URL.includes("script.google.com") || FORM_ENDPOINT_URL.includes("script.googleusercontent.com");
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      let response;
      if (isAppsScriptEndpoint) {
        response = await fetch(FORM_ENDPOINT_URL, {
          method: "POST",
          mode: "no-cors",
          body: new URLSearchParams(payload),
          signal: controller.signal,
        });
      } else {
        response = await fetch(FORM_ENDPOINT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
      }

      clearTimeout(timeoutId);
      if (!isAppsScriptEndpoint && !response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setFormFeedback("Success! Message dispatched securely. I will connect with you shortly.", "text-emerald-500");
      contactFormElement.reset();
    } catch (_error) {
      setFormFeedback("Submission failed. Check endpoint/API config and try again.", "text-red-500");
    }
  });
}
