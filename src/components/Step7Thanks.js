

// Step7Thanks.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '../utils/RegistrationContext';
import { Button } from 'react-bootstrap';

const Step7Thanks = ({ title }) => {
  const { resetRegistrationData } = useRegistration();
  const navigate = useNavigate();
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
      <p>Bedankt voor je inschrijving!</p>
      <p className="mt-3">
        De inschrijving loopt tot 1 maart 2025. Je zult tot die tijd even niks van ons horen.
        <br />
        De regiocoördinator van je league neemt contact met je op over het programma in jouw regio.
      </p>
      <p>
        Op de website kun je de regiocoördinatoren vinden:<br />
        Wil je meer weten over het NK Little League kijk dan op de <a href='https://nklittleleague.nl' target='blank'>website</a> of volg ons op 
        <a href='https://www.facebook.com/nklittleleague/' target='blank'>Facebook</a> of <a href='https://www.instagram.com/nklittleleague' target='blank'>Instagram</a>.
      </p>

      <p>Binnen een paar minuten krijg je een bevestiging per mail. Let op deze kan in je spamfolder terecht komen!</p>
      <p>Klopt er iets niet in je inschrijving, neem dan contact met ons op via <a href='mailto:organisatie@nklittleague.nl'>organisatie@nklittleague.nl</a>.</p>

      <p>Veel plezier en succes!</p>
      <p>Organisatie Little League Nederland</p>
      <Button variant="primary" onClick={handleNewRegistration}>
        Opnieuw Registreren
      </Button>
      <Button variant="danger" onClick={CloseRegbutton}>
        Afsluiten
      </Button>
    </div>
  );
};

export default Step7Thanks;
