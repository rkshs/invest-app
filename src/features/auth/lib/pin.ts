export const PIN_LENGTH = 6;

export function sanitizePinInput(value: string): string {
  return value.replace(/\D/g, '').slice(0, PIN_LENGTH);
}

export function isPinComplete(pin: string): boolean {
  return pin.length === PIN_LENGTH && /^\d+$/.test(pin);
}
