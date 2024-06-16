// src/components/organisms/ConcertProgramContainer.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConcertProgram from './ConcertProgram';

const ConcertProgramContainer = () => {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    axios.get('https://votre-site-wordpress.com/wp-json/wp/v2/concerts')
      .then(response => {
        setConcerts(response.data.map(concert => ({
          title: concert.title.rendered,
          description: concert.content.rendered,
          image: concert.featured_media_url,
        })));
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des concerts:', error);
      });
  }, []);

  return <ConcertProgram concerts={concerts} />;
};

export default ConcertProgramContainer;
