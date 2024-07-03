import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';
import newsData from '../../data/newsData.json';
import Button from '../atoms/Button'; // Assurez-vous d'utiliser la bonne casse pour le nom du fichier

const NewsAndUpdates = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const sortedNews = newsData.news.sort((a, b) => a.importance - b.importance);
    setNews(sortedNews);
  }, []);

  return (
    <section className="container mx-auto py-8" aria-labelledby="news-updates-heading">
      <h2 id="news-updates-heading" className="text-4xl font-bold mb-8 text-center text-blue-600">Informations et Actualités</h2>

      <div className="mb-12">
        <h3 className="text-3xl font-bold mb-4 text-center text-gray-800">Actualités</h3>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {news.slice(0, 3).map((newsItem, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-transform transform hover:-translate-y-1">
                <h3 className="text-2xl font-bold mb-2 mt-4 text-center text-blue-600">{newsItem.title}</h3>
                <p className="text-gray-700 mb-4 text-center">{newsItem.description}</p>
                <div className="text-center">
                  <a href={newsItem.link} className="inline-block font-bold text-blue-600 underline">En savoir plus</a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="text-center mt-8">
          <Button href="/actualites" label="Voir toutes les actualités" />
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-bold mb-4 text-center text-gray-800">Informations Importantes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.slice(3, 6).map((infoItem, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-2 text-blue-600">{infoItem.title}</h3>
              <p className="text-gray-700">{infoItem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsAndUpdates;
