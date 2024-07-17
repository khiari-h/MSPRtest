// src/components/organisms/PracticalInfo.js
import React, { useEffect, useState } from 'react';
import Text from '../atoms/text';
import Accordion from '../molecules/accordion';
import practicalInfoData from '../../data/practicalInfoData.json';

const PracticalInfo = () => {
  const [practicalInfo, setPracticalInfo] = useState([]);

  useEffect(() => {
    setPracticalInfo(practicalInfoData.sections);
  }, []);

  return (
    <section className="bg-soft-beige py-12" aria-labelledby="practical-info-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Text content="Infos Pratiques et FAQ" type="h2" className="text-4xl font-bold mb-8 text-center text-gray-800" id="practical-info-heading" />

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
      </div>
    </section>
  );
};

export default PracticalInfo;
