/**
 * Strips Markdown-sensitive characters to prevent Telegram Markdown injection.
 * Escapes: _ * [ ] ( ) ~ ` > # + - = | { } . !
 */
export function sanitizeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&");
}

/**
 * Basic HTML/XSS sanitiser – strips tags and trims.
 */
export function sanitizeInput(text: string): string {
  return text
    .replace(/<[^>]*>/g, "")   // strip HTML tags
    .replace(/[<>'"]/g, "")    // strip remaining dangerous chars
    .trim()
    .slice(0, 1000);           // hard length cap
}

/**
 * Validate an Indian mobile number (10 digits, starts with 6-9).
 */
export function isValidPhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone);
}
