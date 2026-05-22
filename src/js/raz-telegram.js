export function initRazTelegram() {
  // TODO: Move Telegram dispatch to serverless backend before production.
  // Keep bot token and chat ID out of frontend runtime.
  // Suggested env contract for backend endpoint:
  // - VITE_TELEGRAM_WEBHOOK_PROXY_URL (public endpoint only)
  // - Backend keeps TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID as secrets.
}
