// PrevNextButtons.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PrevNextButtons = ({ 
  hasPrev, 
  hasNext, 
  prevPath, 
  nextPath, 
  isNextEnabled = false,
  onNext,
  isLoading = false 
}) => {
  const navigate = useNavigate();

  const handleNext = async () => {
    if (onNext) {
      // If onNext is provided, use it instead of direct navigation
      const success = await onNext();
      // Only navigate if success is true or onNext isn't provided
      if (success !== false && nextPath) {
        navigate(nextPath);
      }
    } else if (nextPath) {
      // Default behavior if no onNext handler is provided
      navigate(nextPath);
    }
  };

  return (
    <div className="navigation-buttons">
      {hasPrev && (
        <Button 
          variant="secondary" 
          onClick={() => navigate(prevPath)} 
          className="me-2"
          disabled={isLoading}
        >
          Terug
        </Button>
      )}
      {hasNext && (
        <Button 
          variant="primary" 
          onClick={handleNext} 
          disabled={!isNextEnabled || isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Verzenden...
            </>
          ) : (
            'Volgende'
          )}
        </Button>
      )}
    </div>
  );
};

export default PrevNextButtons;