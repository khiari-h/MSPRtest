// src/components/MapComponent.js
import React, { useEffect, useState } from 'react';
import wordpressService from '../services/wordpressService';

const MapComponent = () => {
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const data = await wordpressService.getData('wordpress/map');
        setMapData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de la carte:', error);
      }
    };

    fetchMapData();
  }, []);

  return (
    <div>
      <h1>Carte des Points d'Intérêt</h1>
      <ul>
        {mapData.map(point => (
          <li key={point.id}>{point.title.rendered}</li>
        ))}
      </ul>
    </div>
  );
};

export default MapComponent;
