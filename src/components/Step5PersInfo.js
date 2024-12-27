import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import BaseballInput from '../utils/BaseballInput';
import { useRegistration } from '../utils/RegistrationContext';
import PrevNextButtons from './PrevNextButtons';

const Step5PersInfo = () => {
  const { registrationData, updateRegistrationData } = useRegistration();
  const [geslacht, setGeslacht] = useState(registrationData.nawInfo?.geslacht || '');

  useEffect(() => {
    document.title = "Persoonlijke info";

    // Pre-fill naam from step1 if available
    if (!registrationData.nawInfo?.naam && registrationData.step1?.naam) {
      updateRegistrationData('nawInfo', {
        ...registrationData.nawInfo,
        naam: registrationData.step1.naam,
      });
    }
  }, [registrationData, updateRegistrationData]);

  const handleFieldChange = async (fieldName, value) => {
    await updateRegistrationData('nawInfo', { [fieldName]: value });
  };

  const isNextEnabled =
    registrationData.nawInfo?.naam &&
    registrationData.nawInfo?.achternaam &&
    geslacht &&
    registrationData.nawInfo?.emailOuders &&
    registrationData.nawInfo?.telefoonOuders &&
    registrationData.nawInfo?.telefoonKind &&
    registrationData.nawInfo?.club &&
    registrationData.nawInfo?.team;

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Form style={{ width: '100%', maxWidth: '1000px' }}>
        <h2 className="text-center mb-4">Persoonlijke Informatie</h2>

        {/* Personal Information Section */}
        <Row className="mb-3" xs={1} md={3}>
          <Col>
            <BaseballInput
              label="Naam"
              // placeholder="Vul je voornaam in"
              value={registrationData.nawInfo?.naam || ''}
              onChange={(e) => handleFieldChange('naam', e.target.value)}
              required
            />
          </Col>
          <Col>
            <BaseballInput
              label="Tussenvoegsel"
              // placeholder="Vul je  tussenvoegsel in"
              value={registrationData.nawInfo?.tussenvoegsel || ''}
              onChange={(e) => handleFieldChange('tussenvoegsel', e.target.value)}
            />
          </Col>
          <Col>
            <BaseballInput
              label="Achternaam"
              // placeholder="Vul je achternaam in"
              value={registrationData.nawInfo?.achternaam || ''}
              onChange={(e) => handleFieldChange('achternaam', e.target.value)}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md="4">
            <Form.Group controlId="gender">
              <Form.Label>Geslacht</Form.Label>
              <Form.Control
                as="select"
                value={geslacht}
                onChange={(e) => {
                  setGeslacht(e.target.value);
                  handleFieldChange('geslacht', e.target.value);
                }}
              >
                <option value="">Selecteer</option>
                <option value="man">Man</option>
                <option value="vrouw">Vrouw</option>
                <option value="neutraal">Neutraal</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3" xs={1} md={3}>
          <Col>
            <BaseballInput
              label="Bij welke club speel je"
              value={registrationData.nawInfo?.club || ''}
              onChange={(e) => handleFieldChange('club', e.target.value)}
              required
            />
          </Col>
          <Col>
            <BaseballInput
              label="In welk team speel je"
              value={registrationData.nawInfo?.team || ''}
              onChange={(e) => handleFieldChange('team', e.target.value)}
              required
            />
          </Col>
        </Row>

        {/* Contact Information Section */}
        <h5 className="text-center mt-4">Contactgegevens</h5>
        <Row className="mb-3" xs={1} md={3}>
          <Col>
            <BaseballInput
              label="Email Ouders"
              // placeholder="Ouders' e-mailadres"
              type="email"
              value={registrationData.nawInfo?.emailOuders || ''}
              onChange={(e) => handleFieldChange('emailOuders', e.target.value)}
              required
            />
          </Col>
          <Col>
            <BaseballInput
              label="Telefoonnummer Ouders"
              type="tel"
              value={registrationData.nawInfo?.telefoonOuders || ''}
              onChange={(e) => handleFieldChange('telefoonOuders', e.target.value)}
              required
              maxLength={11}
            />
          </Col>
          <Col>
            <BaseballInput
              label="Telefoonnummer kind"
              type="tel"
              value={registrationData.nawInfo?.telefoonKind || ''}
              onChange={(e) => handleFieldChange('telefoonKind', e.target.value)}
              required
              maxLength={11}
            />
          </Col>
        </Row>

        {/* Navigation Buttons */}
        <div className="text-center mt-4">
          <PrevNextButtons
            hasPrev={true}
            hasNext={true}
            prevPath="/step-4"
            nextPath="/step-6"
            isNextEnabled={isNextEnabled}
          />
        </div>
      </Form>
    </Container>
  );
};

export default Step5PersInfo;
