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
    <form onSubmit={handleSubmit} className="space-y-4 bg-concert-bg-beige p-4 rounded-lg shadow-md">
      {fields.map((field, index) => (
        <div key={index} className="space-y-2">
          <Label htmlFor={field.name} text={field.label} />
          <Input
            id={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={field.value}
            onChange={field.onChange}
            required={field.required}
            error={field.error}
          />
        </div>
      ))}
      <Button label="Submit" className="bg-concert-accent text-white hover:bg-white hover:text-concert-accent" />
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
      required: PropTypes.bool,
      error: PropTypes.string,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
