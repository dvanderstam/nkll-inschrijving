// Step7Thanks.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '../utils/RegistrationContext';
import { Button } from 'react-bootstrap';
import { formatDateLong } from '../utils/dateUtils';

const Step7Thanks = ({ title, closeDate }) => {
  const { resetRegistrationData } = useRegistration();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Bedankt voor je inschrijving!';
  }, []);

  const handleNewRegistration = () => {
    resetRegistrationData();
    navigate('/');
  };

  const handleClose = () => {
    window.location.href = 'https://www.nklittleleague.nl';
  };

  return (
    <div className="step-container">
      <h2>{title}</h2>
      <h2><b>Bedankt voor je inschrijving!</b></h2>
      
      <p className="mt-3">
        De inschrijving loopt tot {formatDateLong(closeDate)}. Je zult tot die tijd even niks van ons horen.
        <br />
        De regiocoördinator van je league neemt contact met je op over het programma in jouw regio.
        Op de website kun je de{' '}
        <a href="https://nklittleleague.nl/regio/#regioInfo" target="_blank" rel="noopener noreferrer">
          regiocoördinatoren
        </a>{' '}
        vinden.
      </p>
      
      <p>
        Wil je meer weten over het NK Little League kijk dan op de{' '}
        <a href="https://nklittleleague.nl" target="_blank" rel="noopener noreferrer">
          website
        </a>{' '}
        of volg ons op{' '}
        <a href="https://www.facebook.com/nklittleleague/" target="_blank" rel="noopener noreferrer">
          Facebook
        </a>{' '}
        of{' '}
        <a href="https://www.instagram.com/nklittleleague" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        .
      </p>

      <p>
        Binnen een paar minuten krijg je een bevestiging per mail. Let op deze kan in je spamfolder terecht komen!
        Klopt er iets niet in je inschrijving, neem dan contact met ons op via{' '}
        <a href="mailto:organisatie@nklittleague.nl">organisatie@nklittleague.nl</a>.
      </p>

      <p>Veel plezier en succes!</p>
      <p>Organisatie Little League Nederland</p>
      
      <Button variant="primary" onClick={handleNewRegistration}>
        Nieuwe aanmelding
      </Button>
      <Button variant="danger" onClick={handleClose} className="ms-2">
        Afsluiten
      </Button>
    </div>
  );
};

export default Step7Thanks;
