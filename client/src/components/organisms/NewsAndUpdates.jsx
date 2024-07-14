// src/components/NewsAndUpdates.js
import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';  // Import de la configuration Axios
import Button from '../atoms/Button';
import Accordion from '../molecules/accordion';  // Import du composant Accordéon
import NewsCard from '../molecules/NewsCard';
import importantInfos from '../../data/importantInfos.json'; 

const NewsAndUpdates = () => {
  const [news, setNews] = useState([]);
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    axios.get('/api/news')
      .then(response => {
        setNews(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des actualités!", error);
      });

    setInfos(importantInfos);  // Charger les infos à partir du fichier JSON
  }, []);

  return (
    <section className="container mx-auto py-8" aria-labelledby="news-updates-heading">
      <h2 id="news-updates-heading" className="text-4xl font-bold mb-8 text-center text-primary-blue font-headline">Informations et Actualités</h2>

      <div className="mb-12">
        <h3 className="text-3xl font-bold mb-4 text-center text-gray-800 font-concert">Actualités</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.slice(0, 3).map((newsItem, index) => (
            <NewsCard
              key={index}
              title={newsItem.title}
              description={newsItem.description}
              image={newsItem.image || 'path/to/default-image.jpg'} // Default image if none provided
              link={newsItem.link}
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <Button href="/news" label="Voir toutes les actualités" />
        </div>
      </div>

      <div className="bg-soft-beige py-8">
        <h3 className="text-3xl font-bold mb-4 text-center text-gray-800 font-headline">Informations Importantes</h3>
        <div className="space-y-8">
          {infos.map((infoItem, index) => (
            <Accordion key={index} title={infoItem.title}>
              <div className="text-gray-700">
                {infoItem.content}
              </div>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsAndUpdates;
