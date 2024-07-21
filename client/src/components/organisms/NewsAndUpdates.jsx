import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import Button from '../atoms/Button';
import NewsCard from '../molecules/NewsCard';

const NewsAndUpdates = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/news')
      .then(response => {
        setNews(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des actualités!", error);
        setError("Erreur lors de la récupération des données.");
        setLoading(false);
      });
  }, []);

  return (
    <section className="container mx-auto py-8" aria-labelledby="news-updates-heading">
      <h2 id="news-updates-heading" className="text-4xl font-bold mb-8 text-center text-primary-blue font-headline">Actualités</h2>
      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(0, 3).map((newsItem, index) => (
              <NewsCard
                key={index}
                title={newsItem.title}
                description={newsItem.description}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button href="/news" label="Voir toutes les actualités" />
          </div>
        </>
      )}
    </section>
  );
};

export default NewsAndUpdates;
