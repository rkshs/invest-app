import { AuthIdentifier } from '../model/AuthFlowContext';
import { formatIdentifierForBadge } from './otp';
import {
  buildFullPhone,
  formatPhoneForDisplay,
  isValidEmail,
  normalizeCountryCode,
  normalizePhoneDigits,
} from './validateIdentifier';

export function parseLoginIdentifierInput(raw: string): AuthIdentifier | null {
  const trimmed = raw.trim();

  if (!trimmed) {
    return null;
  }

  if (isValidEmail(trimmed)) {
    return {
      type: 'email',
      value: trimmed,
    };
  }

  const compact = trimmed.replace(/\s/g, '');
  const internationalMatch = compact.match(/^(\+\d{1,4})(\d{8,15})$/);

  if (internationalMatch) {
    const countryCode = normalizeCountryCode(internationalMatch[1]);
    const phoneNumber = formatPhoneForDisplay(internationalMatch[2]);

    return {
      type: 'phone',
      value: buildFullPhone(countryCode, phoneNumber),
      countryCode,
      phoneNumber,
    };
  }

  const digits = normalizePhoneDigits(trimmed);

  if (digits.length >= 8 && digits.length <= 15) {
    return {
      type: 'phone',
      value: `+${digits}`,
      phoneNumber: formatPhoneForDisplay(digits),
    };
  }

  return null;
}

export function formatLoginIdentifierInput(identifier: AuthIdentifier | null): string {
  if (!identifier) {
    return '';
  }

  return formatIdentifierForBadge(
    identifier.type,
    identifier.value,
    identifier.phoneNumber,
    identifier.countryCode,
  );
}
