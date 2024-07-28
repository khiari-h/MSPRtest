import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PracticalInfo from '../../../components/organisms/PracticalInfo';
import practicalInfoData from '../../../data/practicalInfoData.json';

jest.mock('../../../data/practicalInfoData.json', () => ({
  sections: [
    {
      title: "Accès et Transport",
      content: "Adresse : 123 rue du Festival, Ville, Pays. Moyens de transport : Bus n°X, Tram n°Y. Navettes : Départ toutes les 30 minutes depuis la gare centrale. Parking : Disponible à proximité avec des tarifs spéciaux. Horaires d’ouverture : De 10h à 23h tous les jours du festival."
    },
    {
      title: "Hébergement",
      content: "Pour votre séjour, voici quelques options d'hébergement à proximité : Hôtel 1 : Description et prix. Camping 1 : Description et prix. Partenariats et réductions disponibles pour les festivaliers."
    },
    {
      title: "Restauration",
      content: "Découvrez nos options de restauration sur place : Stands de nourriture : Variété de plats y compris options végétariennes et vegan. Bars : Large choix de boissons."
    },
    {
      title: "Sécurité et Santé",
      content: "Emplacements des postes de secours. Numéros d'urgence : 112 pour les urgences médicales et 17 pour la police. Mesures sanitaires : Respect des mesures COVID-19, port du masque recommandé, désinfection des mains."
    },
    {
      title: "Plan du Site",
      content: "Carte interactive du site du festival. Emplacements des scènes, toilettes, points d'eau, et consignes."
    },
    {
      title: "Objets Trouvés",
      content: "Procédure pour récupérer les objets perdus : Se rendre au stand des objets trouvés situé à l'entrée principale. Horaires d'ouverture du stand : 10h-23h."
    },
    {
      title: "Horaires et Programme",
      content: "Horaires d'ouverture du festival : De 10h à 23h. Programme détaillé des concerts et événements disponible sur le site web du festival."
    },
    {
      title: "FAQ",
      faqItems: [
        {
          question: "Quels sont les horaires d'ouverture ?",
          answer: "Le festival ouvre ses portes à 10h et ferme à 23h."
        },
        {
          question: "Y a-t-il des options de restauration végétariennes ?",
          answer: "Oui, nous avons plusieurs stands offrant des options végétariennes et véganes."
        },
        {
          question: "Comment puis-je accéder au festival ?",
          answer: "Vous pouvez utiliser les transports en commun, des navettes sont disponibles depuis la gare centrale, et un parking est à disposition."
        },
        {
          question: "Où puis-je trouver de l'aide médicale sur place ?",
          answer: "Des postes de secours sont disponibles sur le site. En cas d'urgence, appelez le 112."
        }
      ]
    }
  ]
}));

test('should render FAQ section and questions and answers', async () => {
  render(<PracticalInfo />);

  // Vérifier le titre principal
  expect(screen.getByText(/Infos Pratiques et FAQ/i)).toBeInTheDocument();

  // Vérifier les sections principales
  const sectionTitles = [
    "Accès et Transport",
    "Hébergement",
    "Restauration",
    "Sécurité et Santé",
    "Plan du Site",
    "Objets Trouvés",
    "Horaires et Programme",
    "FAQ"
  ];

  sectionTitles.forEach(title => {
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  // Ouvrir la section FAQ
  const faqButton = screen.getByRole('button', { name: /FAQ/i });
  fireEvent.click(faqButton);

  // Vérifier que la section FAQ est ouverte
  await waitFor(() => {
    expect(faqButton).toHaveAttribute('aria-expanded', 'true');
  });

  // Vérifier les questions et réponses de la FAQ
  const faqItems = practicalInfoData.sections.find(section => section.title === "FAQ").faqItems;
  faqItems.forEach(item => {
    const questionButton = screen.getByRole('button', { name: item.question });
    expect(questionButton).toBeInTheDocument();

    // Cliquer sur chaque question pour afficher la réponse
    fireEvent.click(questionButton);

    // Vérifier que la réponse est affichée
    const answerElement = screen.getByText(item.answer);
    expect(answerElement).toBeInTheDocument();
  });
});
