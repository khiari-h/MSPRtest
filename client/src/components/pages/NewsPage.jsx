// src/components/pages/NewsPage.js
import React, { useEffect, useState } from 'react';
import Text from '../atoms/text';
import newsData from '../../data/newsData.json';
import Header from '../organisms/header';
import Footer from '../organisms/footer';

const NewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    setNews(newsData.news.sort((a, b) => a.importance - b.importance));
  }, []);

  return (
    <div>
      <Header />
      <section className="container mx-auto py-8" aria-labelledby="news-page-heading">
        <Text content="Toutes les Actualités" type="h1" className="text-4xl font-bold mb-8 text-center text-gray-800" id="news-page-heading" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((newsItem, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300">
              <img src={newsItem.image} alt={`Image de ${newsItem.title}`} className="w-full h-48 object-cover rounded-t-lg" />
              <h3 className="text-2xl font-bold mb-2 mt-4">{newsItem.title}</h3>
              <p className="text-gray-700 mb-4">{newsItem.description}</p>
              <a href={newsItem.link} className="text-blue-500 underline mt-2 inline-block">En savoir plus</a>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NewsPage;
