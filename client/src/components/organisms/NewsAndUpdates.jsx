import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';  // Import de la configuration Axios
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';
import Button from '../atoms/Button';
import Accordion from '../molecules/accordion';  // Import du composant Accordéon
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
          <Button href="/news" label="Voir toutes les actualités" />
        </div>
      </div>

      <div className="bg-soft-beige py-8">
        <h3 className="text-3xl font-bold mb-4 text-center text-gray-800">Informations Importantes</h3>
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
