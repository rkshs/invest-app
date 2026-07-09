const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizePhoneDigits(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function normalizeCountryCode(countryCode: string): string {
  const trimmed = countryCode.trim();

  if (!trimmed) {
    return '';
  }

  return trimmed.startsWith('+') ? trimmed : `+${trimmed}`;
}

export function isValidCountryCode(countryCode: string): boolean {
  const normalized = normalizeCountryCode(countryCode);

  return /^\+\d{1,4}$/.test(normalized);
}

export function isValidPhoneNumber(phone: string): boolean {
  const digits = normalizePhoneDigits(phone);

  return digits.length >= 8 && digits.length <= 15;
}

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

export function formatPhoneForDisplay(phone: string): string {
  const digits = normalizePhoneDigits(phone).slice(0, 15);
  const groups = digits.match(/\d{1,3}/g) ?? [];

  return groups.join(' ');
}

export function buildFullPhone(countryCode: string, phone: string): string {
  const normalizedCode = normalizeCountryCode(countryCode);
  const digits = normalizePhoneDigits(phone);

  return `${normalizedCode}${digits}`;
}
