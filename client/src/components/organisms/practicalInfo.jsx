// src/components/organisms/PracticalInfo.js
import React from 'react';
import PracticalInfoCard from '../molecules/practicalInfoCard';
import Text from '../atoms/text';
import './practicalInfo.css';

const PracticalInfo = () => {
  return (
    <section className="practical-info-section container mx-auto py-8">
      <Text content="Infos Pratiques" type="h2" className="text-3xl font-bold mb-8 text-center" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PracticalInfoCard
          title="Accès et Transport"
          content={
            <>
              <p>Adresse : 123 rue du Festival, Ville, Pays. <a href="https://maps.google.com" className="text-blue-500">Voir sur Google Maps</a></p>
              <p>Moyens de transport :</p>
              <ul className="list-disc list-inside">
                <li>Transports en commun : Bus n°X, Tram n°Y</li>
                <li>Navettes : Départ toutes les 30 minutes depuis la gare centrale</li>
                <li>Parking : Disponible à proximité avec des tarifs spéciaux</li>
                <li>Covoiturage : Consultez notre page <a href="/covoiturage" className="text-blue-500">Covoiturage</a></li>
              </ul>
              <p>Horaires d’ouverture : De 10h à 23h tous les jours du festival.</p>
            </>
          }
        />

        <PracticalInfoCard
          title="Hébergement"
          content={
            <>
              <p>Pour votre séjour, voici quelques options d'hébergement à proximité :</p>
              <ul className="list-disc list-inside">
                <li><a href="https://hotel.com" className="text-blue-500">Hôtel 1</a> : Description et prix</li>
                <li><a href="https://camping.com" className="text-blue-500">Camping 1</a> : Description et prix</li>
              </ul>
              <p>Partenariats et réductions disponibles pour les festivaliers. <a href="/partenariats" className="text-blue-500">En savoir plus</a></p>
            </>
          }
        />

        <PracticalInfoCard
          title="Restauration"
          content={
            <>
              <p>Découvrez nos options de restauration sur place :</p>
              <ul className="list-disc list-inside">
                <li>Stands de nourriture : Variété de plats y compris options végétariennes et vegan</li>
                <li>Bars : Large choix de boissons</li>
              </ul>
            </>
          }
        />

        <PracticalInfoCard
          title="Sécurité et Règlement"
          content={
            <>
              <p>Pour assurer la sécurité de tous, voici les mesures en place :</p>
              <ul className="list-disc list-inside">
                <li>Contrôles à l'entrée</li>
                <li>Objets interdits : Liste des objets interdits sur le site</li>
                <li>Règlement intérieur : Règles à respecter pendant le festival</li>
              </ul>
            </>
          }
        />

        <PracticalInfoCard
          title="Accessibilité"
          content={
            <>
              <p>Nous nous engageons à rendre le festival accessible à tous :</p>
              <ul className="list-disc list-inside">
                <li>Accès pour les personnes à mobilité réduite</li>
                <li>Services disponibles : Toilettes, rampes d'accès, etc.</li>
              </ul>
            </>
          }
        />

        <PracticalInfoCard
          title="FAQ"
          content={
            <p>Retrouvez les réponses à vos questions fréquentes dans notre <a href="/faq" className="text-blue-500">FAQ</a>.</p>
          }
        />
      </div>
    </section>
  );
};

export default PracticalInfo;
