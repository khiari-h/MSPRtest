import React, { useEffect, useState } from 'react';
import Text from '../atoms/text';
import newsData from '../../data/newsData.json';
import infoData from '../../data/infoData.json';

const NewsAndUpdates = () => {
  const [news, setNews] = useState([]);
  const [importantInfo, setImportantInfo] = useState([]);

  useEffect(() => {
    // Tri et mise à jour de l'état pour les actualités
    const sortedNews = newsData.news.sort((a, b) => a.importance - b.importance);
    setNews(sortedNews);

    // Tri et mise à jour de l'état pour les informations importantes
    const sortedImportantInfo = infoData.importantInfo.sort((a, b) => a.importance - b.importance);
    setImportantInfo(sortedImportantInfo);
  }, []); // Le tableau vide [] signifie que useEffect s'exécute une seule fois après le premier rendu

  return (
    <section className="container mx-auto py-8" aria-labelledby="news-updates-heading">
      <Text content="Informations et Actualités" type="h2" className="text-4xl font-bold mb-8 text-center text-gray-800" id="news-updates-heading" />

      {/* Section Actualités */}
      <div className="mb-12">
        <Text content="Actualités" type="h3" className="text-3xl font-bold mb-4 text-center text-gray-800" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.slice(0, 3).map((newsItem, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
              <img src={newsItem.image} alt={`Image de ${newsItem.title}`} className="w-full h-48 object-cover rounded-t-lg" />
              <h3 className="text-2xl font-bold mb-2 mt-4">{newsItem.title}</h3>
              <p className="text-gray-700 mb-4">{newsItem.description}</p>
              <a href={newsItem.link} className="text-blue-500 underline mt-2 inline-block">En savoir plus</a>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="/actualites" className="text-blue-500 underline font-bold">Voir toutes les actualités</a>
        </div>
      </div>

      {/* Section Informations Importantes */}
      <div>
        <Text content="Informations Importantes" type="h3" className="text-3xl font-bold mb-4 text-center text-gray-800" />
        <div className="space-y-4">
          {importantInfo.map((infoItem, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <img src={infoItem.icon} alt={`Icone de ${infoItem.title}`} className="w-12 h-12 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">{infoItem.title}</h3>
                  <p className="text-gray-700">{infoItem.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsAndUpdates;
