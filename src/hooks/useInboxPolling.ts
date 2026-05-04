import { useEffect, useRef } from 'react';

export function useInboxPolling(currentAddress: string, refreshInbox: () => Promise<void>) {
  const runningRef = useRef(false);

  useEffect(() => {
    if (!currentAddress) return;

    const tick = async () => {
      if (runningRef.current) return;
      runningRef.current = true;
      try {
        await refreshInbox();
      } finally {
        runningRef.current = false;
      }
    };

    const interval = setInterval(() => {
      if (!document.hidden) {
        void tick();
      }
    }, 5000);

    const onVisible = () => {
      if (!document.hidden) {
        void tick();
      }
    };

    document.addEventListener('visibilitychange', onVisible);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [currentAddress, refreshInbox]);
}
