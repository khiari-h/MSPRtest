// src/components/organisms/Footer.js
import React from 'react';
import Text from '../atoms/text';
import NavItem from '../molecules/NavItem';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-2">Nation Sounds</h3>
            <Text content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed eros tincidunt, porttitor ipsum id, tincidunt tellus. Pellentesque non vehicula urna, non tincidunt ligula." type="p" className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Contact</h3>
            <Text content="Mail: contact@nationsounds.com" type="p" className="text-white" />
            <Text content="Adresse: 123 rue de la musique" type="p" className="text-white" />
            <Text content="Téléphone: 01 34 56 78 90" type="p" className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Newsletter</h3>
            <form>
              <input type="email" placeholder="Votre email" className="p-2 rounded w-full text-black" />
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">S'inscrire</button>
            </form>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Informations légales</h3>
            <NavItem label="Mentions légales" href="/legal" className="text-white hover:text-gray-400" />
            <NavItem label="Politique de confidentialité" href="/privacy" className="text-white hover:text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Réseaux sociaux</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-white hover:text-gray-400">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" className="text-white hover:text-gray-400">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" className="text-white hover:text-gray-400">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" className="text-white hover:text-gray-400">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Text content="© 2024 Nation Sounds Festival. Tous droits réservés." type="p" className="text-white" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
