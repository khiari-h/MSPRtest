import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import HomePage from './components/pages/homepage';
import PartnersPage from './components/pages/PartnersPage';
import './index.css';

// Ajouter les icônes à la bibliothèque
library.add(fab);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/partenaires" element={<PartnersPage />} />
      </Routes>
    </Router>
  );
};

export default App;
