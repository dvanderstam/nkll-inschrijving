import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateRegistrationData } from '../utils/registrationUtils';

const calculateRealAge = (birthDateString) => {
  if (!birthDateString) return null;
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const Step2Naw = ({ onContinue }) => {
  const [nawInfo, setNawInfo] = useState({});
  const navigate = useNavigate();

  const handleFieldChange = (fieldName, value) => {
    if (fieldName === 'geboortedatum') {
      const realAge = calculateRealAge(value);
      setNawInfo({
        [fieldName]: value,
        leeftijd: realAge
      });
    } else {
      setNawInfo({
        [fieldName]: value
      });
    }
  };

  const handleSubmit = () => {
    onContinue(nawInfo);
  };

  return (
    <div>
      <h2>Stap 2: Nieuw Nieuw</h2>
      <form>
        <input type="date" name="geboortedatum" onChange={handleFieldChange} />
        <input type="text" name="naam" onChange={handleFieldChange} />
        <input type="text" name="adres" onChange={handleFieldChange} />
        <input type="text" name="telefoon" onChange={handleFieldChange} />
        <button type="submit" onClick={handleSubmit}>
          Volgende
        </button>
      </form>
    </div>
  );
};

export default Step2Naw;