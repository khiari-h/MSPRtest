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
    <section className="container mx-auto py-8" aria-labelledby="programs-heading">
      <h1 id="programs-heading" className="text-2xl font-bold mb-6 text-center">Programmes</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map(program => (
          <li key={program.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2">{program.title}</h2>
            <p className="text-gray-700 mb-4">Date: {program.date}</p>
            <p className="text-gray-700 mb-4">Stage: {program.stage}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProgramsComponent;
