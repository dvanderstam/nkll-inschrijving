// Step3RegioThuis.js
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import BaseballInput from '../utils/BaseballInput';
import { useRegistration } from '../utils/RegistrationContext';
import PrevNextButtons from './PrevNextButtons';
import { fetchLeagueRegion } from '../utils/fetchLeagueRegion';

const Step3RegioThuis= ({ title }) => {
  const { registrationData, updateRegistrationData } = useRegistration();
  const [isPostalCodeValid, setIsPostalCodeValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {

    document.title = "Regio Thuis - Inschrijving NK Little league"; // Set the document title here
  },[]);


  const handleFieldChange = async (fieldName, value) => {
    const updatedValue = fieldName === 'postcode' ? value.toUpperCase() : value;
    await updateRegistrationData('nawInfo', { [fieldName]: updatedValue });

    if ((fieldName === 'postcode' || fieldName === 'huisnummer') && !updatedValue) {
      await updateRegistrationData('nawInfo', { straat: '', plaats: '', huisnummer: '', postcode: '' });
    }
  };

 

  const fetchPostalCode = async () => {
    const { postcode, huisnummer } = registrationData.nawInfo || {};

    if (postcode && huisnummer) {
      const url = `https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?fq=postcode:${postcode}&q=huis_nlt:${huisnummer}`;
      try {
        setIsLoading(true);
        const response = await fetch(url);

        if (!response.ok) {
          setIsPostalCodeValid(false);
          return;
        }

        const data = await response.json();

        if (data.response.docs.length > 0) {
          const fetchedStreet = data.response.docs[0].straatnaam;
          const fetchedCity = data.response.docs[0].gemeentenaam;

          await handleFieldChange('straat', fetchedStreet);
          await handleFieldChange('plaats', fetchedCity);

          // Fetch and set the home region
          const regionData = await fetchLeagueRegion(postcode);
          if (regionData && regionData.region) {
            updateRegistrationData('regionInfo', { Thuisregio: regionData.region });
            console.log("Fetched Thuisregio:", regionData.region);
          }else{
            console.log("Fetched Thuisregio:", regionData.region);
          }

          setIsPostalCodeValid(true);
        } else {
          setIsPostalCodeValid(false);
        }
      } catch (error) {
        console.error('Error fetching address data:', error);
        setIsPostalCodeValid(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isNextEnabled =
    registrationData.nawInfo.straat &&
    registrationData.nawInfo.huisnummer &&
    registrationData.nawInfo.postcode &&
    registrationData.nawInfo.plaats &&
    isPostalCodeValid;

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Form style={{ width: '100%', maxWidth: '1000px' }}>
        <h2 className="text-center mb-4">{title}</h2>

        {/* Address Section */}
        <h5 className="text-center mt-4">Adresgegevens</h5>
        <Row className="mb-3">
          <Col>
            <BaseballInput
              label="Postcode"
              type="postalcode"
              placeholder="Bijv. 1234AB"
              value={registrationData.nawInfo.postcode || ''}
              onChange={(e) => handleFieldChange('postcode', e.target.value)}
              isInvalid={!isPostalCodeValid}
              required
            />
          </Col>
          <Col>
            <BaseballInput
              label="Huisnummer"
              placeholder="Bijv. 123A"
              value={registrationData.nawInfo.huisnummer || ''}
              onChange={(e) => handleFieldChange('huisnummer', e.target.value)}
              onBlur={fetchPostalCode}
              required
            />
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Row>
            <Col>
              <BaseballInput
                label="Straat"
                placeholder="Vul je straatnaam in"
                value={registrationData.nawInfo.straat || ''}
                onChange={(e) => handleFieldChange('straat', e.target.value)}
                readOnly
              />
            </Col>
            <Col>
              <BaseballInput
                label="Plaats"
                placeholder="Bijv. Amsterdam"
                value={registrationData.nawInfo.plaats || ''}
                onChange={(e) => handleFieldChange('plaats', e.target.value)}
                readOnly
              />
            </Col>
          </Row>
        </Form.Group>

        {/* Region display */}
        {registrationData.regionInfo.Thuisregio && (
          <h5 className="text-center mt-4">Thuisregio: {registrationData.regionInfo.Thuisregio}</h5>
        )}

        {/* Navigation Buttons */}
        <div className="text-center mt-4">
          <PrevNextButtons
            hasPrev={true}
            hasNext={true}
            prevPath="/step-2"
            nextPath="/step-4"
            isNextEnabled={isNextEnabled}
          />
        </div>
      </Form>
    </Container>
  );
};

export default Step3RegioThuis;
