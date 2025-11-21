// Step2League.js
import React, { useState, useEffect } from 'react';
import PrevNextButtons from './PrevNextButtons';
import { Form, Row, Col, Stack } from 'react-bootstrap';
import { calculateLeagueAge } from '../utils/calculateLeagueAge';
import { useRegistration } from '../utils/RegistrationContext';
import { calculateAge } from '../utils/dateUtils';

const Step2League = ({ title }) => {
  const { registrationData, updateRegistrationData } = useRegistration();

  const [year, setYear] = useState(registrationData.leagueInfo.year || '99');
  const [month, setMonth] = useState(registrationData.leagueInfo.month || '99');
  const [leagueResult, setLeagueResult] = useState({
    leagueAge: registrationData.leagueInfo.leagueAge,
    leaguePlay: registrationData.leagueInfo.leaguePlay,
    message: registrationData.leagueInfo.message || null,
  });

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const birthDate = new Date(selectedDate);
    const birthMonth = birthDate.getMonth() + 1;
    const birthYear = birthDate.getFullYear();
    const calculatedAge = calculateAge(selectedDate);
    updateRegistrationData('nawInfo', { geboortedatum: selectedDate, leeftijd: calculatedAge });
    setMonth(birthMonth);
    setYear(birthYear);
  };

  useEffect(() => {
    const sportCode = registrationData.leagueInfo.sportCode;
    document.title = "League - Inschrijving NK Little league"; // Set the document title here
    if (sportCode !== '99' && year !== '99' && month !== '99') {
      const result = calculateLeagueAge(sportCode, year, month);
      setLeagueResult(result);

      if (result.leagueAge && result.leagueAge > 9) {
        const sportName = sportCode === '1' ? 'Baseball' : 'Softball';
        updateRegistrationData('leagueInfo', {
          sportCode,
          sportName,
          year,
          month,
          leagueAge: result.leagueAge,
          leaguePlay: result.leaguePlay,
          message: result.message,
        });
      }
    }
  }, [year, month, registrationData.leagueInfo.sportCode, updateRegistrationData]);

  const isNextEnabled = leagueResult.leagueAge && leagueResult.leagueAge > 9;

  return (
    <div className='container'>
      <Stack id="age-calc" className="text-center mx-auto">
        <blockquote className="blockquote text-center mt-3 lead">
          Om te bepalen in welke league je tijdens NK mag spelen, 
          willen we je geboortedatum weten.
        </blockquote>
        
        <Row className="justify-content-center">
          <Col md="4">
            <Form.Group controlId="formGeboortedatum">
              <Form.Label>Mijn geboortedatum is:</Form.Label>
              <Form.Control
                type="date"
                value={registrationData.nawInfo.geboortedatum || ''}
                onChange={handleDateChange}
                required
                max="2022-01-01" 
                min="2008-01-01"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="lead text-center justify-content-center ">
          {leagueResult.message && (
            <div data-role="league-age-result" dangerouslySetInnerHTML={{ __html: leagueResult.message }} />
          )}
        </Row>
      </Stack>

      <PrevNextButtons hasPrev={true} hasNext={true} prevPath="/" nextPath="/step-3" isNextEnabled={isNextEnabled} />
    </div>
  );
};

export default Step2League;
