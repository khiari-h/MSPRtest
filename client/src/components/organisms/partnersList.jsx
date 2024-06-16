// src/components/organisms/PartnersList.js
import React from 'react';
import Image from '../atoms/image';
import Text from '../atoms/text';

const PartnersList = ({ partners }) => {
  const categories = partners.reduce((acc, partner) => {
    const { category } = partner;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(partner);
    return acc;
  }, {});

  return (
    <section className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Our Partners</h2>
      {Object.keys(categories).map((category, idx) => (
        <div key={idx} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories[category].map((partner, index) => (
              <div key={index} className="text-center">
                <Image src={partner.logo} alt={partner.name} className="w-32 h-32 mx-auto mb-4" />
                <Text content={partner.name} type="h3" className="text-lg font-bold" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default PartnersList;
