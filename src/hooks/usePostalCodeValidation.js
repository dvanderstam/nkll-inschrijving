import { useState, useCallback } from 'react';
import { fetchPostalCodeData } from '../utils/fetchPostalCodeData';

export function usePostalCodeValidation() {
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validatePostalCode = useCallback(async (postcode, huisnummer, includeRegion = false) => {
    setIsLoading(true);
    setErrorMessage('');

    const result = await fetchPostalCodeData(postcode, huisnummer, includeRegion);

    setIsValid(result.success);
    if (!result.success) {
      setErrorMessage(result.error);
    }
    setIsLoading(false);

    return result;
  }, []);

  const reset = useCallback(() => {
    setIsValid(true);
    setErrorMessage('');
    setIsLoading(false);
  }, []);

  return {
    isValid,
    isLoading,
    errorMessage,
    validatePostalCode,
    reset
  };
}
