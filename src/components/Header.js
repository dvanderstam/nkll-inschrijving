// Header.js
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import StepNavigation from './StepNavigation';
import logo from '../assets/logo.png';
import '../style/header.css';
import { handleOpenClose } from '../utils/OpenClose';

const Header = ({ steps, currentDate, openDate, closeDate }) => {
  const location = useLocation();

  useEffect(() => {
    handleOpenClose(currentDate, openDate, closeDate);
  }, [currentDate, openDate, closeDate]);

  // Bepaal de actieve stap op basis van de huidige locatie
  const activeStep = steps.findIndex((_, index) => location.pathname === `/step-${index + 1}`);
  
  return (
    <header className="site-header">
      <Container className="header-inner">
        <img src={logo} alt="Little League Logo" className="header-logo" />
        <div>
          <h1 className="header-title">Inschrijving <br/>NK Little League</h1>
          <h2 className="header-subtitle">23, 24 en 25 mei 2026</h2>
        </div>
        <StepNavigation activeStep={activeStep} steps={steps} currentDate={currentDate} openDate={openDate} closeDate={closeDate} />
      </Container>
    </header>
  );
};

export default Header;
