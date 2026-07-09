import { formatPhoneForDisplay, normalizeCountryCode } from './validateIdentifier';

export function formatIdentifierForBadge(
  type: 'phone' | 'email',
  value: string,
  phoneNumber?: string,
  countryCode?: string,
): string {
  if (type === 'email') {
    return value;
  }

  if (countryCode && phoneNumber) {
    return `${normalizeCountryCode(countryCode)} ${formatPhoneForDisplay(phoneNumber)}`;
  }

  const match = value.match(/^(\+\d{1,4})(\d+)$/);

  if (!match) {
    return value;
  }

  return `${match[1]} ${formatPhoneForDisplay(match[2])}`;
}

export function formatOtpTimer(secondsLeft: number): string {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export const OTP_LENGTH = 6;

export function isOtpComplete(code: string): boolean {
  return code.length === OTP_LENGTH && /^\d+$/.test(code);
}
