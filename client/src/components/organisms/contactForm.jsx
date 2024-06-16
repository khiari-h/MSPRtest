import React, { useState } from 'react';
import Text from '../atoms/text';
import Button from '../atoms/button';
import './contactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Le nom est requis';
    if (!formData.email) newErrors.email = 'L\'email est requis';
    if (!formData.subject) newErrors.subject = 'Le sujet est requis';
    if (!formData.message) newErrors.message = 'Le message est requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Envoyer les données du formulaire
      console.log('Données envoyées:', formData);
    }
  };

  return (
    <section className="container mx-auto py-8">
      <Text content="On veut vous entendre !" type="h2" className="text-2xl font-bold mb-6 text-center" />
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nom</label>
          <input type="text" id="name" className="input-field" value={formData.name} onChange={handleChange} />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input type="email" id="email" className="input-field" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">Sujet</label>
          <input type="text" id="subject" className="input-field" value={formData.subject} onChange={handleChange} />
          {errors.subject && <span className="text-red-500 text-sm">{errors.subject}</span>}
        </div>
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
          <textarea id="message" className="input-field h-32" value={formData.message} onChange={handleChange}></textarea>
          {errors.message && <span className="text-red-500 text-sm">{errors.message}</span>}
        </div>
        <div className="flex justify-center md:col-span-2">
          <Button label="Envoyer" type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
