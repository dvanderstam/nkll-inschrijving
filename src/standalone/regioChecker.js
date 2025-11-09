import React, { useState } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';

const RegioChecker = () => {
  const [formData, setFormData] = useState({
    postcode: '',
    huisnummer: '',
    straat: '',
    plaats: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'postcode' ? value.toUpperCase() : value
    }));
  };

  const lookupAddress = async () => {
    if (!formData.postcode || !formData.huisnummer) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?fq=postcode:${formData.postcode}&q=huis_nlt:${formData.huisnummer}`
      );

      if (!response.ok) throw new Error('Postcode lookup failed');

      const data = await response.json();

      if (data.response.docs.length > 0) {
        setFormData(prev => ({
          ...prev,
          straat: data.response.docs[0].straatnaam,
          plaats: data.response.docs[0].gemeentenaam
        }));
      } else {
        setError('Geen adres gevonden');
      }
    } catch (err) {
      setError('Er is iets misgegaan bij het ophalen van het adres');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Postcode</Form.Label>
              <Form.Control
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                maxLength={6}
                placeholder="1234AB"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Huisnummer</Form.Label>
              <Form.Control
                type="text"
                name="huisnummer"
                value={formData.huisnummer}
                onChange={handleChange}
                onBlur={lookupAddress}
                placeholder="123"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Straat</Form.Label>
              <Form.Control
                type="text"
                name="straat"
                value={formData.straat}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Plaats</Form.Label>
              <Form.Control
                type="text"
                name="plaats"
                value={formData.plaats}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>

        {error && <div className="text-danger">{error}</div>}
        {isLoading && <div>Laden...</div>}
      </Form>
    </Container>
  );
};

export default RegioChecker;
