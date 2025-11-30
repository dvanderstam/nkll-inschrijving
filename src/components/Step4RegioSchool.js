// Step4RegioSchool.js
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import BaseballInput from '../utils/BaseballInput';
import { useRegistration } from '../utils/RegistrationContext';
import PrevNextButtons from './PrevNextButtons';
import { usePostalCodeValidation } from '../hooks/usePostalCodeValidation';
import { useLoadingDots } from '../hooks/useLoadingDots';

const Step4RegioSchool = ({ title }) => {
  const { registrationData, updateRegistrationData } = useRegistration();
  const { isValid, isLoading, errorMessage, validatePostalCode } = usePostalCodeValidation();
  const [isRegionLoading, setIsRegionLoading] = useState(false);
  const regionDots = useLoadingDots(isRegionLoading && !registrationData.regionInfo?.Schoolregio);

  useEffect(() => {
    document.title = "Regio School - Inschrijving NK Little league";
  }, []);

  const handleFieldChange = async (fieldName, value) => {
    const updatedValue = fieldName === 'postcode' ? value.toUpperCase() : value;
    await updateRegistrationData('schoolInfo', { [fieldName]: updatedValue });

    if ((fieldName === 'postcode' || fieldName === 'huisnummer') && !updatedValue) {
      await updateRegistrationData('schoolInfo', { 
        straat: '', 
        plaats: '', 
        huisnummer: '', 
        postcode: '' 
      });
    }
  };

  const fetchPostalCode = async () => {
    const { postcode, huisnummer } = registrationData.schoolInfo || {};
    
    if (!postcode || !huisnummer) return;

    setIsRegionLoading(true);
    const result = await validatePostalCode(postcode, huisnummer, true);
    setIsRegionLoading(false);

    if (result.success) {
      const { straat, plaats, region } = result.data;
      await handleFieldChange('straat', straat);
      await handleFieldChange('plaats', plaats);
      
      if (region) {
        await updateRegistrationData('regionInfo', { Schoolregio: region });
      }
    }
  };

  const isNextEnabled = isValid && !!registrationData.regionInfo?.Schoolregio;

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Form style={{ width: '100%', maxWidth: '1000px' }}>
        <h2 className="text-center mb-4">{title}</h2>

        <h5 className="text-center mt-4">Adresgegevens</h5>
        <Row className="mb-3" xs={1} md={3}>
          <BaseballInput
            label="Op welke school zit je?"
            value={registrationData.schoolInfo?.naam || ''}
            onChange={(e) => handleFieldChange('naam', e.target.value)}
            required
          />
          <Col>
            <BaseballInput
              label="Wat is de postcode van je school"
              type="postalcode"
              value={registrationData.schoolInfo?.postcode || ''}
              onChange={(e) => handleFieldChange('postcode', e.target.value)}
              isInvalid={!isValid}
              required  
              maxLength={6} 
            />
          </Col>
          <Col>
            <BaseballInput
              label="Wat is het huisnummer van je school"
              value={registrationData.schoolInfo?.huisnummer || ''}
              onChange={(e) => handleFieldChange('huisnummer', e.target.value)}
              onBlur={fetchPostalCode}
              required
              maxLength={4} 
            />
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Row className="mb-3" xs={1} md={2}>
            <Col>
              <BaseballInput
                label="Straat"
                value={registrationData.schoolInfo?.straat || ''}
                onChange={(e) => handleFieldChange('straat', e.target.value)}
                readOnly
              />
            </Col>
            <Col>
              <BaseballInput
                label="Plaats"
                value={registrationData.schoolInfo?.plaats || ''}
                onChange={(e) => handleFieldChange('plaats', e.target.value)}
                readOnly
              />
            </Col>
          </Row>
        </Form.Group>

        {isRegionLoading && !registrationData.regionInfo?.Schoolregio && isValid && (
          <h5 className="text-center mt-4">Regio wordt opgehaald{regionDots}</h5>
        )}
        
        {isValid ? (
          registrationData.regionInfo?.Schoolregio && (
            <h5 className="text-center mt-4">
              Schoolregio: {registrationData.regionInfo.Schoolregio}
            </h5>
          )
        ) : (
          <span style={{ color: 'red' }}>{errorMessage}</span>
        )}

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
