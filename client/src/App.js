import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import HomePage from './components/pages/homepage';
import PartnersPage from './components/pages/PartnersPage';
import ContactPage from './components/pages/contactPage';
import ConcertsPage from './components/pages/concertsPage';
import ConcertsSchedulePage from './components/pages/concertsSchedulePage';
import NewsPage from './components/pages/NewsPage';
import './index.css';

// Ajouter les icônes à la bibliothèque
library.add(fab);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/partenaires" element={<PartnersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/concerts" element={<ConcertsPage />} />
        <Route path="/concerts-schedule" element={<ConcertsSchedulePage />} />
        <Route path="/actualites" element={<NewsPage />}  />
      </Routes>
    </Router>
  );
};

export default App;
