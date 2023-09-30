import { InputMask } from 'primereact/inputmask';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/*
 * PhoneInput component to handle phone input with different mask formats.
 *
 * @param {string} name - The name attribute for the input field.
 * @param {string} placeholder - The placeholder text to be displayed.
 * @param {Function} setFieldValue - Function to set the field value.
 * @param {string} value - The current value of the input field.
 * @param {Object} errors - Error object containing validation errors.
 * @param {Object} touched - Object containing touch status of form fields.
 */
const PhoneInput = (props) => {
  const { name, placeholder, setFieldValue, value, errors, touched } = props;

  const [currentMask, setCurrentMask] = useState('(99) 9999-9999');

  const handleFocus = () => {
    setCurrentMask('(99) 99999-9999');
  };

  const handleBlur = () => {
    const numberLength = (value && value.replace(/[^\d]/g, '').length) || 0;

    if (numberLength > 10) {
      setCurrentMask('(99) 99999-9999');
    } else {
      setCurrentMask('(99) 9999-9999');
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setFieldValue(name, newValue);
  };
  return (
    <>
      <label htmlFor={name}>{placeholder}:</label>
      <InputMask
        id={name}
        name={name}
        mask={currentMask}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="(XX) XXXXX-XXXX"
        autoClear={false}
      />
      {errors.telefone && touched.telefone && (
        <small className="p-error">{errors.telefone}</small>
      )}
    </>
  );
};

// Define PropTypes for the PhoneInput component
PhoneInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  setFieldValue: PropTypes.func.isRequired,
  value: PropTypes.string,
  errors: PropTypes.object,
  touched: PropTypes.object,
};

export default PhoneInput;
