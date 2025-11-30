import { useEffect, useState } from 'react';

/**
 * Custom hook for animated loading dots
 * @param {boolean} isLoading - Whether loading is active
 * @param {number} maxDots - Maximum number of dots (default: 3)
 * @param {number} intervalMs - Interval between dot changes (default: 400)
 * @returns {string} - Current dots string
 */
export function useLoadingDots(isLoading, maxDots = 3, intervalMs = 400) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!isLoading) {
      setDots('');
      return;
    }

    const interval = setInterval(() => {
      setDots(d => (d.length >= maxDots ? '' : d + '.'));
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isLoading, maxDots, intervalMs]);

  return dots;
}
