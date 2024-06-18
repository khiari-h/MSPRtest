import React from 'react';
import Text from '../atoms/text';
import Accordion from '../molecules/accordion';
import './practicalInfo.css';

const PracticalInfo = () => {
  return (
    <section className="practical-info-section container mx-auto py-8">
      <Text content="Infos Pratiques" type="h2" className="text-3xl font-bold mb-8 text-center" />

      <div className="accordion-container">
        <Accordion title="Accès et Transport">
          <>
            <p>Adresse : 123 rue du Festival, Ville, Pays.</p>
            <p>Moyens de transport :</p>
            <ul className="list-disc list-inside">
              <li>Transports en commun : Bus n°X, Tram n°Y</li>
              <li>Navettes : Départ toutes les 30 minutes depuis la gare centrale</li>
              <li>Parking : Disponible à proximité avec des tarifs spéciaux</li>
              <li>Covoiturage : Consultez notre page <a href="/covoiturage" className="text-blue-500">Covoiturage</a></li>
            </ul>
            <p>Horaires d’ouverture : De 10h à 23h tous les jours du festival.</p>
          </>
        </Accordion>

        <Accordion title="Hébergement">
          <>
            <p>Pour votre séjour, voici quelques options d'hébergement à proximité :</p>
            <ul className="list-disc list-inside">
              <li><a href="https://hotel.com" className="text-blue-500">Hôtel 1</a> : Description et prix</li>
              <li><a href="https://camping.com" className="text-blue-500">Camping 1</a> : Description et prix</li>
            </ul>
            <p>Partenariats et réductions disponibles pour les festivaliers. <a href="/partenariats" className="text-blue-500">En savoir plus</a></p>
          </>
        </Accordion>

        <Accordion title="Restauration">
          <>
            <p>Découvrez nos options de restauration sur place :</p>
            <ul className="list-disc list-inside">
              <li>Stands de nourriture : Variété de plats y compris options végétariennes et vegan</li>
              <li>Bars : Large choix de boissons</li>
            </ul>
          </>
        </Accordion>

        <Accordion title="Sécurité et Règlement">
          <>
            <p>Pour assurer la sécurité de tous, voici les mesures en place :</p>
            <ul className="list-disc list-inside">
              <li>Contrôles à l'entrée</li>
              <li>Objets interdits : Liste des objets interdits sur le site</li>
              <li>Règlement intérieur : Règles à respecter pendant le festival</li>
            </ul>
          </>
        </Accordion>

        <Accordion title="Accessibilité">
          <>
            <p>Nous nous engageons à rendre le festival accessible à tous :</p>
            <ul className="list-disc list-inside">
              <li>Accès pour les personnes à mobilité réduite</li>
              <li>Services disponibles : Toilettes, rampes d'accès, etc.</li>
            </ul>
          </>
        </Accordion>

        <Accordion title="FAQ">
          <p>Retrouvez les réponses à vos questions fréquentes dans notre <a href="/faq" className="text-blue-500">FAQ</a>.</p>
        </Accordion>
      </div>

      <div className="map-container mt-8">
        <h3 className="text-xl font-semibold mb-2">Carte du Festival</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.825064072408!2d144.95565151531698!3d-37.81732497975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d52ed5c9b1f5!2sFederation+Square!5e0!3m2!1sen!2sau!4v1464883813255"
          width="100%"
          height="300"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default PracticalInfo;
