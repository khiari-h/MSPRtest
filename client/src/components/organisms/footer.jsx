import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Text from '../atoms/Text';
import NavItem from '../molecules/NavItem';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-2">À Propos de Nation Sounds</h3>
            <Text content="Nation Sounds est un festival de musique qui célèbre la diversité et la créativité musicale. Rejoignez-nous pour une expérience inoubliable." type="p" className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Contact</h3>
            <Text content="Mail: contact@nationsounds.com" type="p" className="text-white" />
            <Text content="Adresse: 123 rue de la musique" type="p" className="text-white" />
            <Text content="Téléphone: 01 34 56 78 90" type="p" className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Newsletter</h3>
            <form className="max-w-sm mx-auto">
              <input type="email" placeholder="Votre email" className="p-2 rounded text-black w-full" aria-label="Email" />
              <button type="submit" className="bg-custom-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">S'inscrire</button>
            </form>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Informations légales</h3>
            <ul>
              <li><NavItem label="Mentions légales" href="/legal" className="text-white hover:text-gray-400" /></li>
              <li><NavItem label="Politique de confidentialité" href="/privacy" className="text-white hover:text-gray-400" /></li>
              <li><NavItem label="Conditions générales de vente" href="/cgv" className="text-white hover:text-gray-400" /></li>
              <li><NavItem label="Politique de cookies" href="/cookies" className="text-white hover:text-gray-400" /></li>
              <li><NavItem label="RGPD" href="/rgpd" className="text-white hover:text-gray-400" /></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Réseaux sociaux</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-white hover:text-gray-400" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-gray-400" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://instagram.com" className="text-white hover:text-gray-400" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://linkedin.com" className="text-white hover:text-gray-400" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} />
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
