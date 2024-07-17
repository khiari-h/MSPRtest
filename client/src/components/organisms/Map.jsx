// src/components/organisms/Map.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

// Fix marker icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const categories = [
  { id: 'all', name: 'Tous' },
  { id: 'scenes', name: 'Scènes' },
  { id: 'shops', name: 'Shops' },
  { id: 'buvettes', name: 'Buvettes' },
  { id: 'wc', name: 'WC' },
  { id: 'restaurants', name: 'Restaurants' }
];

const Map = () => {
  const [pointsOfInterest, setPointsOfInterest] = useState([]);
  const [filteredPoints, setFilteredPoints] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    axios.get('https://votre-site.com/wp-json/wp/v2/pointsinteret')
      .then(response => {
        setPointsOfInterest(response.data);
        setFilteredPoints(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des points d'intérêt!", error);
      });
  }, []);

  const filterPoints = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredPoints(pointsOfInterest);
    } else {
      setFilteredPoints(pointsOfInterest.filter(point => point.acf.category === category));
    }
  };

  return (
    <div>
      <div className="button-container">
        {categories.map(category => (
          <button
            key={category.id}
            className={`btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => filterPoints(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <MapContainer className="map-container" center={[48.8566, 2.3522]} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredPoints.map((point, index) => (
          <Marker key={index} position={[point.acf.latitude, point.acf.longitude]}>
            <Popup>
              <strong>{point.title.rendered}</strong><br />{point.acf.description}<br />Catégorie: {point.acf.category}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
