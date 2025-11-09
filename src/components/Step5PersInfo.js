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
  const [emailValid, setEmailValid] = useState(() => {
    const e = registrationData.nawInfo?.emailOuders || '';
    return e ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) : false;
  });

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const validatePhone = (phone) => {
    return phone && phone.length >= 10;
  };

  const emailValue = registrationData.nawInfo?.emailOuders || '';
  const emailShowError = emailValue !== '' && !emailValid;
  const telefoonOudersValue = registrationData.nawInfo?.telefoonOuders || '';
  const telefoonKindValue = registrationData.nawInfo?.telefoonKind || '';
  const telefoonOudersShowError = telefoonOudersValue !== '' && !validatePhone(telefoonOudersValue);
  const telefoonKindShowError = telefoonKindValue !== '' && !validatePhone(telefoonKindValue);

  useEffect(() => {
    document.title = "N.a.w. info";

    // Pre-fill naam from step1 if available
    if (!registrationData.nawInfo?.naam && registrationData.step1?.naam) {
      updateRegistrationData('nawInfo', {
        ...registrationData.nawInfo,
        naam: registrationData.step1.naam,
      });
    }
  }, [registrationData, updateRegistrationData]);

  const handleFieldChange = async (fieldName, value) => {
    // Sanitize phone fields: keep digits only and limit to 11 characters
    let newValue = value;
    if (fieldName === 'telefoonOuders' || fieldName === 'telefoonKind') {
      newValue = (value || '').toString().replace(/\D/g, '').slice(0, 11);
    }
    // Sanitize email: trim, lowercase, remove invalid chars, allow only one '@'
    if (fieldName === 'emailOuders') {
      let v = (value || '').toString().trim().toLowerCase();
      v = v.replace(/\s+/g, ''); // remove internal spaces
      v = v.replace(/[^a-z0-9@._%+\-]/g, ''); // keep common email chars
      const firstAt = v.indexOf('@');
      if (firstAt !== -1) {
        // remove any additional '@' after the first
        v = v.slice(0, firstAt + 1) + v.slice(firstAt + 1).replace(/@/g, '');
      }
      newValue = v;
      setEmailValid(validateEmail(newValue));
    }
    await updateRegistrationData('nawInfo', { [fieldName]: newValue });
  };

  const isNextEnabled =
    registrationData.nawInfo?.naam &&
    registrationData.nawInfo?.achternaam &&
    geslacht &&
    emailValid &&
    validatePhone(telefoonOudersValue) &&
    registrationData.nawInfo?.club &&
    registrationData.nawInfo?.team &&
    (!telefoonKindValue || validatePhone(telefoonKindValue)); // Als er een kindnummer is ingevuld, moet het geldig zijn

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
              <Form.Label>Ik ben:</Form.Label>
              <Form.Control
                as="select"
                value={geslacht}
                onChange={(e) => {
                  setGeslacht(e.target.value);
                  handleFieldChange('geslacht', e.target.value);
                }}
              >
                <option value="">Selecteer</option>
                <option value="meisje">meisje</option>
                <option value="jongen">jongen</option>
                <option value="nvt">Voorkeur om niet te zeggen</option>
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
              inputMode="email"
              autoComplete="email"
              isInvalid={emailShowError}
              aria-invalid={emailShowError}
              required
            />
            {emailShowError && (
              <Form.Text className="text-danger">Vul een geldig e-mailadres in.</Form.Text>
            )}
          </Col>
          <Col>
            <BaseballInput
              label="Telefoonnummer Ouders"
              type="tel"
              value={registrationData.nawInfo?.telefoonOuders || ''}
              onChange={(e) => handleFieldChange('telefoonOuders', e.target.value)}
              inputMode="numeric"
              isInvalid={telefoonOudersShowError}
              aria-invalid={telefoonOudersShowError}
              required
              maxLength={11}
            />
            {telefoonOudersShowError && (
              <Form.Text className="text-danger">Telefoonnummer moet minimaal 10 cijfers bevatten</Form.Text>
            )}
          </Col>
          <Col>
            <BaseballInput
              label="Telefoonnummer kind"
              type="tel"
              value={registrationData.nawInfo?.telefoonKind || ''}
              onChange={(e) => handleFieldChange('telefoonKind', e.target.value)}
              inputMode="numeric"
              isInvalid={telefoonKindShowError}
              aria-invalid={telefoonKindShowError}
              maxLength={11}
            />
            {telefoonKindShowError && (
              <Form.Text className="text-danger">Telefoonnummer moet minimaal 10 cijfers bevatten</Form.Text>
            )}
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
