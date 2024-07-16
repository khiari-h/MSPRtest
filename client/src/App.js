// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import HomePage from './components/pages/homepage';
import PartnersPage from './components/pages/PartnersPage';
import ContactPage from './components/pages/contactPage';
import ConcertsDetailsPage from './components/pages/ConcertsDetailsPage';
import NewsPage from './components/pages/NewsPage';
import './index.css';

// Ajouter les icônes à la bibliothèque
library.add(fab);

const App = () => {
  return (
    <div className="bg-global min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/partenaires" element={<PartnersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/concerts" element={<ConcertsDetailsPage />} />
          <Route path="/news" element={<NewsPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
