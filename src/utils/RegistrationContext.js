import React, { createContext, useContext, useState, useCallback } from 'react';

const RegistrationContext = createContext();

export const useRegistration = () => useContext(RegistrationContext);

export const RegistrationProvider = ({ children }) => {
  const [registrationData, setRegistrationData] = useState({
    playerData: {},
    leagueInfo: {},
    nawInfo: {},
    schoolInfo: {},
    regionInfo: {},
    gdprConsent: false, // Added GDPR Consent
  });

  const updateRegistrationData = useCallback((section, data) => {
    setRegistrationData((prevData) => (typeof data === 'object'
      ? { ...prevData, [section]: { ...prevData[section], ...data } }
      : { ...prevData, [section]: data }));
  }, []);

  const resetRegistrationData = () => {
    setRegistrationData({
      playerData: {},
      leagueInfo: {},
      nawInfo: {},
      schoolInfo: {},
      regionInfo: {},
      gdprConsent: false,
    });
  };

  return (
    <RegistrationContext.Provider value={{ registrationData, updateRegistrationData, resetRegistrationData }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export default RegistrationContext;
