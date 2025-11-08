import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import PrevNextButtons from './PrevNextButtons';
import { useNavigate } from 'react-router-dom';
import { useRegistration } from '../utils/RegistrationContext';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const Step6Confirmation = () => {
  const { registrationData, updateRegistrationData } = useRegistration();
  const [gdprChecked, setGdprChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null); // Add state for captcha token

  const navigate = useNavigate();
const submissionUrl='https://default213c2616dad04501a3443152a06f10.e9.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/6f4c414c6f2d492faa85d8b2ad590415/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=EJFtePxo-pmop2Wxhr4YLvDSyaxTFaKxuBu5Xyqzijc';
  const submissionUrlReal =
    'https://prod-72.westeurope.logic.azure.com:443/workflows/3c9e385855934455a9f964fabcf34660/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ANW-EUvEDkkmdI4o2ndbQzi1DLLFD3u_7ziE6Px73UU';
  useEffect(() => {
    document.title = 'Bevestiging Inschrijving';
  }, []);

  const handleGdprChange = (e) => {
    const consentGiven = e.target.checked;
    setGdprChecked(consentGiven);
    updateRegistrationData('gdprConsent', consentGiven);
  };
  const handleCaptchaVerification = (token) => {
    setCaptchaToken(token);
  };

  const calculateAge = (birthDateString) => {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const prepareSubmissionData = () => {
    const { nawInfo, schoolInfo, regionInfo, leagueInfo } = registrationData;

    return {
      // Personal Information
      firstName: nawInfo?.naam || '',
      middleName: nawInfo?.tussenvoegsel || '',
      lastName: nawInfo?.achternaam || '',
      birthDate: nawInfo?.geboortedatum || '',
      leeftijdReal: nawInfo?.leeftijd || '',
      gender: nawInfo?.geslacht || '',
      playerPhone: nawInfo?.telefoonKind || '',

      // Parent Contact
      parentEmail: nawInfo?.emailOuders || '',
      parentPhone: nawInfo?.telefoonOuders || '',

      // Home Address
      homeStreet: nawInfo?.straat || '',
      homeNumber: nawInfo?.huisnummer || '',
      homePostal: nawInfo?.postcode || '',
      homeCity: nawInfo?.plaats || '',
      homeRegion: regionInfo?.Thuisregio || '',

      // School Information
      schoolName: schoolInfo?.naam || '',
      schoolStreet: schoolInfo?.straat || '',
      schoolNumber: schoolInfo?.huisnummer || '',
      schoolPostal: schoolInfo?.postcode || '',
      schoolCity: schoolInfo?.plaats || '',
      schoolRegion: regionInfo?.Schoolregio || '',

      // Sports Information
      club: nawInfo?.club || '',
      team: nawInfo?.team || '',
      age: leagueInfo?.leagueAge || '',
      sport: leagueInfo?.sportName || '',
      league: leagueInfo?.leaguePlay || '',
      year: leagueInfo?.year || '',
      month: leagueInfo?.month || '',

      // Consent
      gdprConsent: gdprChecked,
    };
  };

  const handleNext = async (e) => {
    if (e) e.preventDefault();
    if (!captchaToken) {
      alert('Please complete the captcha');
      return;
    }

    if (!gdprChecked) {
      alert('U moet akkoord gaan met de voorwaarden om door te gaan.');
      return;
    }

    setIsSubmitting(true);

    const payload = prepareSubmissionData();

    console.log('Submitting simplified payload:', payload);

    try {
      const response = await fetch(submissionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload, captchaToken),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      console.log('Registration successfully submitted!');
      // alert('Registratie succesvol verzonden!');
      navigate('/step-7');
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('Er is een fout opgetreden bij het verzenden van uw registratie. Probeer het later opnieuw.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="step-container">
      <h2>Bevestiging Inschrijving</h2>
      <p>Controleer uw gegevens voordat u verder gaat:</p>

      <div className="confirmation-details">
        <Row xs={1} md={2}>
          <Col>
            <h5>Persoonlijke Gegevens</h5>
            <ul className="list-group">
              <li className="list-group-item"><b>Voornaam:</b> {registrationData.nawInfo?.naam}</li>
              <li className="list-group-item"><b>Tussenvoegsel:</b> {registrationData.nawInfo?.tussenvoegsel || '-'}</li>
              <li className="list-group-item"><b>Achternaam:</b> {registrationData.nawInfo?.achternaam}</li>
              <li className="list-group-item"><b>Leeftijd:</b> {registrationData.nawInfo?.leeftijd}</li>
              <li className="list-group-item"><b>Geboortedatum:</b> {registrationData.nawInfo?.geboortedatum}</li>
              <li className="list-group-item"><b>Geslacht:</b> {registrationData.nawInfo?.geslacht}</li>
            </ul>
          </Col>
          <Col>
            <h5>Thuisadres</h5>
            <ul className="list-group">
              <li className="list-group-item"><b>Straat:</b> {registrationData.nawInfo?.straat}</li>
              <li className="list-group-item"><b>Huisnummer:</b> {registrationData.nawInfo?.huisnummer}</li>
              <li className="list-group-item"><b>Postcode:</b> {registrationData.nawInfo?.postcode}</li>
              <li className="list-group-item"><b>Plaats:</b> {registrationData.nawInfo?.plaats}</li>
            </ul>
          </Col>
        </Row>

        <Row className="mt-4" xs={1} md={2}>
          <Col>
            <h5>Schoolgegevens</h5>
            <ul className="list-group">
              <li className="list-group-item"><b>School:</b> {registrationData.schoolInfo?.naam}</li>
              <li className="list-group-item"><b>Straat:</b> {registrationData.schoolInfo?.straat}</li>
              <li className="list-group-item"><b>Huisnummer:</b> {registrationData.schoolInfo?.huisnummer}</li>
              <li className="list-group-item"><b>Postcode:</b> {registrationData.schoolInfo?.postcode}</li>
              <li className="list-group-item"><b>Plaats:</b> {registrationData.schoolInfo?.plaats}</li>
            </ul>
          </Col>
          <Col>
            <h5>Contact</h5>
            <ul className="list-group">
              <li className="list-group-item"><b>Email Ouders:</b> {registrationData.nawInfo?.emailOuders}</li>
              <li className="list-group-item"><b>Telefoon Ouders:</b> {registrationData.nawInfo?.telefoonOuders}</li>
              <li className="list-group-item"><b>Telefoon Kind:</b> {registrationData.nawInfo?.telefoonKind}</li>
            </ul>
          </Col>
        </Row>
        <Row className='mt-4' xs={1} md={2}>
          <Col>
          <h5>Club</h5>
          <ul className="list-group">
          <li className="list-group-item"><b>Club:</b> {registrationData.nawInfo?.club}</li>
          <li className="list-group-item"><b>Team:</b> {registrationData.nawInfo?.team}</li>
          </ul>
          </Col>
        <Col>
            <h5>NK Little League:</h5>
            <ul className="list-group">
            <li className="list-group-item"><b>Regio:</b> {registrationData.regionInfo?.Thuisregio}</li>
            <li className="list-group-item"><b>School regio:</b> {registrationData.regionInfo?.Schoolregio}</li>
            <li className="list-group-item"><b>LL Leeftijd:</b> {registrationData.leagueInfo?.leagueAge}</li>
              <li className="list-group-item"><b>League:</b> {registrationData.leagueInfo?.leaguePlay} {registrationData.leagueInfo?.sportName}</li>
            </ul>
          </Col>
        </Row>

      </div>

      <div className="text-start gdpr-text mt-4">
        <Form.Group controlId="gdprConsent">
          <Form.Check
            type="checkbox"
            label={
              <div>
                <b>Hierbij geef ik toestemming dat:</b>
                <ul>
                  <li>De door mij ingevulde gegevens gebruikt kunnen worden voor communicatie doeleinden voor deelname aan het NK Little League programma.</li>
                  <li>Foto en filmmateriaal gemaakt tijdens evenementen gebruikt kan worden voor communicatie doeleinden.</li>
                </ul>
              </div>
            }
            checked={gdprChecked}
            onChange={handleGdprChange}
          />
        </Form.Group>
      </div>

      <HCaptcha className="text-center mt-4"
        sitekey="7aa06fd6-476e-44f2-bad2-791805cc6266" // Replace with your hCaptcha site key
        onVerify={handleCaptchaVerification}
      />

      <div className="text-center mt-4">
        <PrevNextButtons
          hasPrev={true}
          hasNext={true}
          prevPath="/step-5"
          isNextEnabled={gdprChecked && !isSubmitting}
          onNext={handleNext}
          isLoading={isSubmitting}
        />
        {isSubmitting && (
          <div className="mt-2 text-primary">
            Bezig met verzenden...
          </div>
        )}
      </div>
    </Container>
  );
};

export default Step6Confirmation;