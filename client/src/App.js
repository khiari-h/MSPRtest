import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import HomePage from './components/pages/HomePage';
import PartnersPage from './components/pages/PartnersPage';
import ConcertsDetailsPage from './components/pages/ConcertsDetailsPage';
import NewsPage from './components/pages/NewsPage';
import ProgrammingPage from './components/pages/ProgrammingPage';
import NotFoundPage from './components/error/NotFoundPage';
import ServerErrorPage from './components/error/ServerErrorPage';
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
          <Route path="/concerts" element={<ConcertsDetailsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/programmation" element={<ProgrammingPage/>} />
          <Route path="/500" element={<ServerErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
         
        </Routes>
      </Router>
    </div>
  );
};

export default App;
