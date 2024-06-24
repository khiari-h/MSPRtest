// src/components/PartnersComponent.js
import React, { useEffect, useState } from 'react';
import wordpressService from '../services/wordpressService';

const PartnersComponent = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const data = await wordpressService.getData('wordpress/partners');
        setPartners(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des partenaires:', error);
      }
    };

    fetchPartners();
  }, []);

  return (
    <div>
      <h1>Partenaires</h1>
      <ul>
        {partners.map(partner => (
          <li key={partner.id}>
            <h2>{partner.name}</h2>
            <p>{partner.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PartnersComponent;
