import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import Text from '../atoms/text';
import newsData from '../../data/newsData.json';
import infoData from '../../data/infoData.json';

const NewsAndUpdates = () => {
  const [news, setNews] = useState([]);
  const [importantInfo, setImportantInfo] = useState([]);

  useEffect(() => {
    const sortedNews = newsData.news.sort((a, b) => a.importance - b.importance);
    setNews(sortedNews);
    const sortedImportantInfo = infoData.importantInfo.sort((a, b) => a.importance - b.importance);
    setImportantInfo(sortedImportantInfo);
  }, []);

  return (
    <section className="container mx-auto py-8" aria-labelledby="news-updates-heading">
      <Text content="Informations et Actualités" type="h2" className="text-4xl font-bold mb-8 text-center text-gray-800" id="news-updates-heading" />

      {/* Section Actualités */}
      <div className="mb-12">
        <Text content="Actualités" type="h3" className="text-3xl font-bold mb-4 text-center text-gray-800" />
        <Swiper spaceBetween={20} slidesPerView={1} breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}>
          {news.map((newsItem, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold mb-2 mt-4">{newsItem.title}</h3>
                <p className="text-gray-700 mb-4">{newsItem.description}</p>
                <a href={newsItem.link} className="text-blue-500 underline mt-2 inline-block">En savoir plus</a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
