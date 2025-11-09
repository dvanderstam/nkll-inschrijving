// Step7Thanks.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '../utils/RegistrationContext';
import { Button } from 'react-bootstrap';

const Step7Thanks = ({ title, closeDate }) => {
  const { resetRegistrationData, registrationData } = useRegistration();
  const navigate = useNavigate();
 
  // bepaal effectieve closeDate: prop > registrationData > fallback
  const effectiveCloseDate = closeDate;

  const parseDate = (dateString) => {
    if (!dateString) return null;
    if (dateString instanceof Date) return isNaN(dateString) ? null : dateString;
    if (/^\d{4}-\d{2}-\d{2}/.test(dateString)) {
      const d = new Date(dateString);
      return isNaN(d) ? null : d;
    }
    const dmy = dateString.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (dmy) {
      const [, dd, mm, yyyy] = dmy;
      const iso = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
      const d = new Date(iso);
      return isNaN(d) ? null : d;
    }
    const fallback = new Date(dateString);
    return isNaN(fallback) ? null : fallback;
  };

  const formatDateLong = (dateString) => {
    const d = parseDate(dateString);
    if (!d) return '-';
    return d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const CloseRegbutton = () => {
    window.location.href = 'https://www.nklittleleague.nl'; // Navigate to the new URL
  };

  useEffect(() => {
    document.title = 'Bedankt voor je inschrijving!';
  }, [title]);

  const handleNewRegistration = () => {
    resetRegistrationData();
    navigate('/');
  };

  return (
    <div className="step-container">
      <h2>{title}</h2>
      <h2><b>Bedankt voor je inschrijving!</b></h2>
      <p className="mt-3">
        De inschrijving loopt tot {formatDateLong(effectiveCloseDate)}. Je zult tot die tijd even niks van ons horen.
        <br />
        De regiocoördinator van je league neemt contact met je op over het programma in jouw regio.
      Op de website kun je de <a href='https://nklittleleague.nl/regio/#regioInfo' target='blank'>regiocoördinatoren</a> vinden.</p>      
      <p>
        
        Wil je meer weten over het NK Little League kijk dan op de <a href='https://nklittleleague.nl' target='blank'>website</a> of volg ons op 
        <a href='https://www.facebook.com/nklittleleague/' target='blank'> Facebook</a> of <a href='https://www.instagram.com/nklittleleague' target='blank'>Instagram</a>.
      </p>

      <p>Binnen een paar minuten krijg je een bevestiging per mail. Let op deze kan in je spamfolder terecht komen!
      Klopt er iets niet in je inschrijving, neem dan contact met ons op via <a href='mailto:organisatie@nklittleague.nl'>organisatie@nklittleague.nl</a>.</p>

      <p>Veel plezier en succes!</p>
      <p>Organisatie Little League Nederland</p>
      <Button variant="primary" onClick={handleNewRegistration}>
        Nieuwe aanmelding
      </Button>
      <Button variant="danger" onClick={CloseRegbutton} className="ms-2">
        Afsluiten
      </Button>
    </div>
  );
};

export default Step7Thanks;
