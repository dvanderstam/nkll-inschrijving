import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaseball, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';

const BaseballInput = ({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  width = '100%',
  margin = '0',
  type = 'text',
  readOnly = false,
  required = false,
  disabled = false,
  maxLength
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {

    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValid(emailRegex.test(value));
    } else {
      setIsValid(true);
    }
    onChange(e);
    console.log(e);
    
  };

  const clearInput = () => {
    onChange({ target: { value: '' } });
    inputRef.current.focus();
    setIsValid(true);
  };

  return (
    <Form.Group style={{ width, margin }}>
      <Form.Label>{label}</Form.Label>
      <div style={{ position: 'relative' }}>
        <Form.Control
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onBlur={onBlur}
          ref={inputRef}
          isInvalid={!isValid}
          onFocus={() => setIsFocused(true)}
          style={{
            paddingLeft: '35px',
            paddingRight: '25px',
            borderColor: !isValid ? 'red' : undefined // Set border color to red if not valid
          }}
          readOnly={readOnly}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
        />

        {isFocused && (
          <FontAwesomeIcon
            icon={faBaseball}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#193C79',
            }}
          />
        )}
        {value && (
          <button
            onClick={clearInput}
            tabIndex={-1}
            style={{
              position: 'absolute',
              right: '5px',
              top: '50%',
              transform: 'translateY(-50%)',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: '#999',
            }}
            aria-label="Clear input"
          >
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        )}

      </div>
    </Form.Group>
  );
};

export default BaseballInput;