// Step4RegioSchool.js
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import BaseballInput from '../utils/BaseballInput';
import { useRegistration } from '../utils/RegistrationContext';
import PrevNextButtons from './PrevNextButtons';
import { fetchLeagueRegion } from '../utils/fetchLeagueRegion';

const Step4RegioSchool= ({ title }) => {
  const { registrationData, updateRegistrationData } = useRegistration();
  const [isPostalCodeValid, setIsPostalCodeValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRegionLoading, setIsRegionLoading] = useState(false);
  const [regionDots, setRegionDots] = useState('');

  const handleFieldChange = async (fieldName, value) => {
    const updatedValue = fieldName === 'postcode' ? value.toUpperCase() : value;
    await updateRegistrationData('schoolInfo', { [fieldName]: updatedValue });

    if ((fieldName === 'postcode' || fieldName === 'huisnummer') && !updatedValue) {
      await updateRegistrationData('schoolInfo', { straat: '', plaats: '', huisnummer: '', postcode: '' });
    }
  };
  useEffect(() => {
    document.title = "Regio School - Inschrijving NK Little league";
  },[]);
  useEffect(() => {
    let interval;
    if (isRegionLoading && !registrationData.regionInfo?.Schoolregio) {
      interval = setInterval(() => {
        setRegionDots(d => (d.length >= 3 ? '' : d + '.'));
      }, 400);
    } else {
      setRegionDots('');
    }
    return () => interval && clearInterval(interval);
  }, [isRegionLoading, registrationData.regionInfo?.Schoolregio]);

  const fetchPostalCode = async () => {
    const { postcode, huisnummer } = registrationData.schoolInfo || {};
    if (postcode && huisnummer) {
      const url = `https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?fq=postcode:${postcode}&q=huis_nlt:${huisnummer}`;
      try {
        setIsLoading(true);
        const response = await fetch(url);

        if (!response.ok) {
          setIsPostalCodeValid(false);
          setErrorMessage('Verkeerde postcode of huisnummer');
          return;
        }

        const data = await response.json();

        if (data.response.docs.length > 0) {
          const fetchedStreet = data.response.docs[0].straatnaam;
          const fetchedCity = data.response.docs[0].gemeentenaam;

          await handleFieldChange('straat', fetchedStreet);
          await handleFieldChange('plaats', fetchedCity);

          setIsRegionLoading(true);
          const regionData = await fetchLeagueRegion(postcode);
          if (regionData && regionData.region) {
            await updateRegistrationData('regionInfo', { Schoolregio: regionData.region });
          }
          setIsRegionLoading(false);

          setIsPostalCodeValid(true);
          setErrorMessage('');
        } else {
          setIsPostalCodeValid(false);
          setErrorMessage('Verkeerde postcode of huisnummer');
        }
      } catch (error) {
        console.error('Error fetching address data:', error);
        setErrorMessage('Er is iets misgegaan bij het ophalen van de adresgegevens');
        setIsRegionLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const schoolregioVisible = isPostalCodeValid && !!registrationData.regionInfo?.Schoolregio;
  const isNextEnabled = schoolregioVisible;

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Form style={{ width: '100%', maxWidth: '1000px' }}>
        <h2 className="text-center mb-4">{title}</h2>

        {/* Address Section */}
        <h5 className="text-center mt-4">Adresgegevens</h5>
        <Row className="mb-3" xs={1} md={3}>
          <BaseballInput
            label="Op welke school zit je?"
            value={registrationData.schoolInfo.naam || ''}
            onChange={(e) => handleFieldChange('naam', e.target.value)}
            required
          />
          <Col>
            <BaseballInput
              label="Wat is de postcode van je school"
              type="postalcode"
              value={registrationData.schoolInfo.postcode || ''}
              onChange={(e) => handleFieldChange('postcode', e.target.value)}
              isInvalid={!isPostalCodeValid}
              required  
              maxLength={6} 
            />
          </Col>
          <Col>
            <BaseballInput
              label="Wat is het huisnummer van je school"
              value={registrationData.schoolInfo.huisnummer || ''}
              onChange={(e) => handleFieldChange('huisnummer', e.target.value)}
              onBlur={fetchPostalCode}
              required
              maxLength={4} 
            />
          </Col>
        </Row>

        <Form.Group className="mb-3"  xs={1} md={2}>
          <Row className="mb-3" xs={1} md={2}>
            <Col>
              <BaseballInput
                label="Straat"
                value={registrationData.schoolInfo.straat || ''}
                onChange={(e) => handleFieldChange('straat', e.target.value)}
                readOnly
              />
            </Col>
            <Col>
              <BaseballInput
                label="Plaats"
                value={registrationData.schoolInfo.plaats || ''}
                onChange={(e) => handleFieldChange('plaats', e.target.value)}
                readOnly
              />
            </Col>
          </Row>
        </Form.Group>

        {/* Region display */}
        {isRegionLoading && !registrationData.regionInfo?.Schoolregio && isPostalCodeValid && (
          <h5 className="text-center mt-4">Schoolregio wordt opgehaald{regionDots}</h5>
        )}
        {isPostalCodeValid ? (
          registrationData.regionInfo.Schoolregio && (
            <h5 className="text-center mt-4">
              Schoolregio: {registrationData.regionInfo.Schoolregio}
            </h5>
          )
        ) : (
          <span style={{ color: 'red' }}>{errorMessage}</span>
        )}

        {/* Navigation Buttons */}
        <div className="text-center mt-4">
          <PrevNextButtons
            hasPrev={true}
            hasNext={true}
            prevPath="/step-3"
            nextPath="/step-5"
            isNextEnabled={isNextEnabled}
          />
        </div>
      </Form>
    </Container>
  );
};

export default Step4RegioSchool;
