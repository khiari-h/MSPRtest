import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Text from '../atoms/text';
import Header from '../organisms/header';
import Footer from '../organisms/footer';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get('/api/news')
      .then(response => {
        setNews(response.data.sort((a, b) => a.importance - b.importance));
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des actualités!", error);
      });
  }, []);

  const filteredNews = filter === 'all' ? news : news.filter(item => item.category === filter);

  return (
    <div>
      <Header />
      <section className="container mx-auto py-8" aria-labelledby="news-page-heading">
        <Text content="Toutes les Actualités" type="h1" className="text-4xl font-bold mb-8 text-center text-gray-800" id="news-page-heading" />
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`${
              filter === 'all' ? 'bg-blue-700' : 'bg-blue-500'
            } text-white py-2 px-4 rounded mx-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors duration-300`}
            aria-pressed={filter === 'all'}
            aria-label="Afficher toutes les actualités"
          >
            Tous
          </button>
          <button
            onClick={() => setFilter('concert')}
            className={`${
              filter === 'concert' ? 'bg-blue-700' : 'bg-blue-500'
            } text-white py-2 px-4 rounded mx-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors duration-300`}
            aria-pressed={filter === 'concert'}
            aria-label="Afficher les actualités de concerts"
          >
            Concerts
          </button>
          <button
            onClick={() => setFilter('info')}
            className={`${
              filter === 'info' ? 'bg-blue-700' : 'bg-blue-500'
            } text-white py-2 px-4 rounded mx-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors duration-300`}
            aria-pressed={filter === 'info'}
            aria-label="Afficher les informations"
          >
            Infos
          </button>
          <button
            onClick={() => setFilter('interview')}
            className={`${
              filter === 'interview' ? 'bg-blue-700' : 'bg-blue-500'
            } text-white py-2 px-4 rounded mx-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors duration-300`}
            aria-pressed={filter === 'interview'}
            aria-label="Afficher les interviews"
          >
            Interviews
          </button>
          <button
            onClick={() => setFilter('event')}
            className={`${
              filter === 'event' ? 'bg-blue-700' : 'bg-blue-500'
            } text-white py-2 px-4 rounded mx-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors duration-300`}
            aria-pressed={filter === 'event'}
            aria-label="Afficher les événements"
          >
            Événements
          </button>
          <button
            onClick={() => setFilter('organization')}
            className={`${
              filter === 'organization' ? 'bg-blue-700' : 'bg-blue-500'
            } text-white py-2 px-4 rounded mx-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors duration-300`}
            aria-pressed={filter === 'organization'}
            aria-label="Afficher les nouvelles de l'organisation"
          >
            Organisation
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((newsItem, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
              <img src={newsItem.image} alt={`Image de ${newsItem.title}`} className="w-full h-48 object-cover rounded-t-lg" />
              <h3 className="text-2xl font-bold mb-2 mt-4">{newsItem.title}</h3>
              <p className="text-gray-700 mb-4">{newsItem.description}</p>
              <a href={newsItem.link} className="text-blue-500 underline mt-2 inline-block focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50" aria-label={`En savoir plus sur ${newsItem.title}`}>En savoir plus</a>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NewsPage;
