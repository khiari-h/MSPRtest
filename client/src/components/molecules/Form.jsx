// src/components/molecules/Form.js
import React from 'react';
import PropTypes from 'prop-types';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const Form = ({ fields, onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field, index) => (
        <div key={index} className="space-y-2">
          <Label htmlFor={field.name} text={field.label} />
          <Input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={field.value}
            onChange={field.onChange}
          />
        </div>
      ))}
      <Button label="Submit" />
    </form>
  );
};

Form.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      value: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
