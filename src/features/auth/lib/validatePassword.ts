export type PasswordStrength = 'empty' | 'weak' | 'fair' | 'good' | 'strong';

export type PasswordRequirement = {
  id: string;
  label: string;
  met: boolean;
};

export const MIN_PASSWORD_LENGTH = 8;

export function getPasswordRequirements(password: string): PasswordRequirement[] {
  return [
    {
      id: 'length',
      label: 'Минимум 8 символов',
      met: password.length >= MIN_PASSWORD_LENGTH,
    },
    {
      id: 'case',
      label: 'Буквы верхнего и нижнего регистра',
      met: /[a-z]/.test(password) && /[A-Z]/.test(password),
    },
    {
      id: 'digits',
      label: 'Цифры',
      met: /\d/.test(password),
    },
  ];
}

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return 'empty';
  }

  const requirements = getPasswordRequirements(password);
  const metCount = requirements.filter((requirement) => requirement.met).length;

  if (metCount === 0) {
    return 'weak';
  }

  if (metCount === 1) {
    return 'weak';
  }

  if (metCount === 2) {
    return 'fair';
  }

  return password.length >= 12 ? 'strong' : 'good';
}

export function getPasswordStrengthLabel(strength: PasswordStrength): string {
  switch (strength) {
    case 'empty':
      return '';
    case 'weak':
      return 'слабая';
    case 'fair':
      return 'средняя';
    case 'good':
      return 'хорошая';
    case 'strong':
      return 'отличная';
  }
}

export function getPasswordStrengthProgress(strength: PasswordStrength): number {
  switch (strength) {
    case 'empty':
      return 0;
    case 'weak':
      return 0.25;
    case 'fair':
      return 0.5;
    case 'good':
      return 0.65;
    case 'strong':
      return 1;
  }
}

export function isPasswordValid(password: string): boolean {
  return getPasswordRequirements(password).every((requirement) => requirement.met);
}

export function passwordsMatch(password: string, confirmPassword: string): boolean {
  return password.length > 0 && password === confirmPassword;
}
