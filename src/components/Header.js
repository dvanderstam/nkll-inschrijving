// Header.js
import React from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import StepNavigation from './StepNavigation';
import logo from '../assets/logo.png';
import '../style/header.css';

const Header = ({ steps }) => {
  const location = useLocation();
  
  // Bepaal de actieve stap op basis van de huidige locatie
  const activeStep = steps.findIndex((_, index) => location.pathname === `/step-${index + 1}`);
  
  return (
    <header className="site-header">
      <Container className="header-inner">
        <img src={logo} alt="Little League Logo" className="header-logo" />
        <div>
          <h1 className="header-title">Inschrijving <br/>NK Little League</h1>
          <h2 className="header-subtitle">7, 8 en 9 juni 2025</h2>
        </div>
        <StepNavigation activeStep={activeStep} steps={steps} />
      </Container>
    </header>
  );
};

export default Header;
