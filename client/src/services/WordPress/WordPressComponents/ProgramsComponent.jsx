// src/components/ProgramsComponent.js
import React, { useEffect, useState } from 'react';
import wordpressService from '../services/wordpressService';

const ProgramsComponent = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await wordpressService.getData('wordpress/programs');
        setPrograms(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des programmes:', error);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <div>
      <h1>Programmes</h1>
      <ul>
        {programs.map(program => (
          <li key={program.id}>
            <h2>{program.title}</h2>
            <p>{program.date}</p>
            <p>{program.stage}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgramsComponent;
