export function verifyLoginPassword(
  inputPassword: string,
  savedPassword: string | null,
): boolean {
  if (!savedPassword) {
    return inputPassword.length >= 8;
  }

  return inputPassword === savedPassword;
}

export function verifyLoginPin(inputPin: string, savedPin: string | null): boolean {
  if (!savedPin) {
    return false;
  }

  return inputPin === savedPin;
}
