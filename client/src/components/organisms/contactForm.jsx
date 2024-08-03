import React, { useState } from 'react';
import axios from 'axios';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Label from '../atoms/Label';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'Amateur de musique'
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Le nom est requis';
    if (!formData.email) newErrors.email = 'L\'email est requis';
    if (!formData.subject) newErrors.subject = 'Le sujet est requis';
    if (!formData.message) newErrors.message = 'Le message est requis';
    if (!formData.type) newErrors.type = 'Le type de contact est requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      axios.post('/api/contact', formData)
        .then(response => {
          setStatus('Message envoyé avec succès!');
          setFormData({ name: '', email: '', subject: '', message: '', type: 'Amateur de musique' });
        })
        .catch(error => {
          setStatus('Erreur lors de l\'envoi du message.');
        });
    }
  };

  return (
    <section className="container mx-auto py-8">
      <Text content="Restons en Contact!" type="h2" className="h2-class text-center" />
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <div className="flex flex-col md:col-span-2">
          <Label htmlFor="type" text="Type de Contact" />
          <select
            id="type"
            name="type"
            className="border border-border-gray p-2 rounded-md"
            value={formData.type}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={errors.type ? "true" : "false"}
            aria-describedby={errors.type ? "type-error" : null}
          >
            <option value="Amateur de musique">Amateur de musique</option>
            <option value="Partenaire potentiel">Partenaire potentiel</option>
          </select>
          {errors.type && <span id="type-error" className="text-error-red text-sm">{errors.type}</span>}
        </div>
        <Input
          id="name"
          type="text"
          name="name"
          label="Nom"
          placeholder="Entrez votre nom"
          value={formData.name}
          onChange={handleChange}
          required
          error={errors.name}
        />
        <Input
          id="email"
          type="email"
          name="email"
          label="Email"
          placeholder="Entrez votre email"
          value={formData.email}
          onChange={handleChange}
          required
          error={errors.email}
        />
        <Input
          id="subject"
          type="text"
          name="subject"
          label="Sujet"
          placeholder="Sujet de votre message"
          value={formData.subject}
          onChange={handleChange}
          required
          error={errors.subject}
        />
        <div className="flex flex-col md:col-span-2">
          <Label htmlFor="message" text="Message" />
          <textarea
            id="message"
            name="message"
            className="border border-border-gray p-2 rounded-md h-32"
            placeholder="Votre message"
            value={formData.message}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : null}
          ></textarea>
          {errors.message && <span id="message-error" className="text-error-red text-sm">{errors.message}</span>}
        </div>
        <div className="flex justify-center md:col-span-2">
          <Button label="Envoyer" type="submit" className="bg-custom-blue-500 hover:bg-custom-blue-700 text-white font-bold py-2 px-4 rounded-full" />
        </div>
        {status && <p className="text-center text-green-500 mt-4">{status}</p>}
      </form>
    </section>
  );
};

export default ContactForm;
