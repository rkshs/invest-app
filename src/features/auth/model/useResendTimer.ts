import { useCallback, useEffect, useState } from 'react';

type UseResendTimerResult = {
  secondsLeft: number;
  canResend: boolean;
  restart: () => void;
};

export function useResendTimer(initialSeconds = 60): UseResendTimerResult {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const timerId = setInterval(() => {
      setSecondsLeft((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [secondsLeft]);

  const restart = useCallback(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  return {
    secondsLeft,
    canResend: secondsLeft === 0,
    restart,
  };
}
