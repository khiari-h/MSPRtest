import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';
import Button from '../atoms/Button';

const NewsAndUpdates = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('/api/news')
      .then(response => {
        setNews(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des actualités!", error);
      });
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
                <p className="text-gray-700 mb-4 text-center">{newsItem.content}</p>
                <div className="text-center">
                  <a href={newsItem.link} className="inline-block font-bold text-blue-600 underline">En savoir plus</a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="text-center mt-8">
          <Button href="/news" label="Voir toutes les actualités" />
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-bold mb-4 text-center text-gray-800">Informations Importantes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.slice(3, 6).map((infoItem, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-2 text-blue-600">{infoItem.title}</h3>
              <p className="text-gray-700">{infoItem.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsAndUpdates;
