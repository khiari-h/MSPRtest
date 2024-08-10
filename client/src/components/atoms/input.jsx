import React from 'react';
import PropTypes from 'prop-types';
import Label from './Label';

const Input = ({ id, type, name, placeholder, value, onChange, required, label, error }) => {
  return (
    <div className="mb-4">
      {label && <Label htmlFor={id} text={label} />}
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : null}
        className={`border ${error ? 'border-error-red' : 'border-border-gray'} p-2 rounded w-full text-black`}
      />
      {error && <span id={`${id}-error`} className="text-error-red text-sm">{error}</span>}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string,
};

export default Input;
