// Step1Welcome.js
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BaseballInput from '../utils/BaseballInput';
import { useRegistration } from '../utils/RegistrationContext';
import PrevNextButtons from './PrevNextButtons';

const Step1Welcome = ({ title }) => {
  const { registrationData, updateRegistrationData } = useRegistration();

  const [name, setName] = useState(registrationData.nawInfo?.naam || '');
  const [sportCode, setSportCode] = useState(registrationData.leagueInfo?.sportCode || '99');

  useEffect(() => {
    updateRegistrationData('nawInfo', { naam: name });
    updateRegistrationData('leagueInfo', { sportCode });
    document.title = "Welkom - Inschrijving NK Little league"; // Set the document title here

}, [name, sportCode, updateRegistrationData]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const isNextEnabled = !!name && sportCode !== '99';

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Form style={{ width: '100%', maxWidth: '1000px' }}>
        <h2 className="text-center display-4">
          Welkom bij de inschrijving voor het NK Little League.
        </h2>

        <BaseballInput
          label="Hoe heet je?"
          // placeholder="Vul je voornaam in"
          value={name}
          onChange={handleNameChange}
          required
          type="text"
          width="100%"
          margin="10px 0"
        />

        {name && (
          <>
          <blockquote className="blockquote text-center mt-3 lead">
            Hoi {name}, <br />
            Leuk dat je je wil inschrijven! <br />
            We gaan nu eerst kijken in welke league je mag spelen.
          </blockquote>
       
     
        <h5 className="text-center mt-4">Welke sport doe je?</h5> 
        <div className="d-flex justify-content-center gap-4 mt-2">
          <Button
            variant="link"
            className={`text-center ${sportCode === '1' ? 'text-primary' : 'text-muted'}`}
            onClick={() => setSportCode('1')}
            style={{
              textDecoration: 'none',
              transform: sportCode === '1' ? 'scale(1.5)' : 'scale(1)',
              transition: 'transform 0.2s ease',
            }}
          >
            <span style={{ fontSize: sportCode === '1' ? '2.04rem' : '2rem' }}>&#9918;</span>
            <div className="small">Honkbal</div>
          </Button>
          <Button
            variant="link"
            className={`text-center ${sportCode === '2' ? 'text-primary' : 'text-muted'}`}
            onClick={() => setSportCode('2')}
            style={{
              textDecoration: 'none',
              transform: sportCode === '2' ? 'scale(1.5)' : 'scale(1)',
              transition: 'transform 0.2s ease',
            }}
          >
            <span style={{ fontSize: sportCode === '2' ? '2.04rem' : '2rem' }}>&#129358;</span>
            <div className="small">Softbal</div>
          </Button>
        </div>

        <div className="text-center mt-4">
          <PrevNextButtons
            hasPrev={false}
            hasNext={true}
            prevPath="/"
            nextPath="/step-2"
            isNextEnabled={isNextEnabled}
          />
        </div> 
        </>
          )}
      </Form>
      
    </Container>
  );
};

export default Step1Welcome;
