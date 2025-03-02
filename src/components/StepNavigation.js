// StepNavigation.js
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import '../style/step-navigation.css';
import { handleOpenClose } from '../utils/OpenClose';

const StepNavigation = ({ activeStep, steps, currentDate, openDate, closeDate }) => {
  const location = useLocation();

  useEffect(() => {
    handleOpenClose(currentDate, openDate, closeDate);
  }, [currentDate, openDate, closeDate]);

  return (
    <div className="open ">
    <nav className=" steps-nav">
      {steps.map((title, index) => (
        <React.Fragment key={title}>
          <h3 
            className={`step-item ${
              (location.pathname === '/' && index === 0) || index === activeStep ? "active" : ""
            }`}
          >
            {title}
          </h3>
          {index < steps.length - 1 && (
            <FontAwesomeIcon icon={faAngleRight} className="step-separator" />
          )}
        </React.Fragment>
      ))}
    </nav>
    </div>
  );
};

export default StepNavigation;
