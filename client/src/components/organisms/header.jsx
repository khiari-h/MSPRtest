// src/components/organisms/Header.js
import React from 'react';
import NavItem from '../molecules/NavItem';
import Image from '../atoms/image';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center transform transition duration-500 hover:scale-110">
          <Image src="logo.png" alt="Festival Logo" className="h-12 w-auto" />
        </div>
        <nav className="flex items-center space-x-4">
          <NavItem label="Accueil" href="/" />
          <NavItem label="Programmation" href="/programmation" />
          <NavItem label="Artistes" href="/artistes" />
          <NavItem label="Infos Pratiques" href="/infos-pratiques" />
          <NavItem label="Contact" href="/contact" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
