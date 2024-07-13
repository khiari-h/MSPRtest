// src/components/PracticalInfo.js
import React, { useEffect, useState } from 'react';
import Text from '../atoms/text';
import Accordion from '../molecules/accordion';
import practicalInfoData from '../../data/practicalInfoData.json';
import { FaMapMarkerAlt } from 'react-icons/fa';

const PracticalInfo = () => {
  const [practicalInfo, setPracticalInfo] = useState([]);

  useEffect(() => {
    setPracticalInfo(practicalInfoData.sections);
  }, []);

  return (
    <section className="bg-soft-beige py-12" aria-labelledby="practical-info-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Text content="Infos Pratiques" type="h2" className="text-4xl font-bold mb-8 text-center text-gray-800" id="practical-info-heading" />

        <div className="space-y-8">
          {practicalInfo.map((section, index) => (
            <Accordion key={index} title={section.title}>
              <div className="text-gray-700 space-y-4">
                <p className="text-lg leading-relaxed">{section.content}</p>
                {section.faqItems && (
                  <div className="mt-4 space-y-2">
                    {section.faqItems.map((item, faqIndex) => (
                      <Accordion key={faqIndex} title={item.question}>
                        <p className="text-base leading-relaxed">{item.answer}</p>
                      </Accordion>
                    ))}
                  </div>
                )}
              </div>
            </Accordion>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">Carte du Festival</h3>
          <div className="flex justify-center mb-4">
            <FaMapMarkerAlt className="text-blue-600 text-3xl" />
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.825064072408!2d144.95565151531698!3d-37.81732497975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d52ed5c9b1f5!2sFederation+Square!5e0!3m2!1sen!2sau!4v1464883813255"
            className="w-full h-64 rounded-lg shadow-md border-0"
            allowFullScreen
            aria-label="Carte du Festival"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default PracticalInfo;
