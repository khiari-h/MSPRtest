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
  { id: 'Tous', name: 'Tous' },
  { id: 'Scène', name: 'Scène' },
  { id: 'Shops', name: 'Shops' },
  { id: 'Buvettes', name: 'Buvettes' },
  { id: 'WC', name: 'WC' },
  { id: 'Restaurants', name: 'Restaurants' }
];

const Map = () => {
  const [pointsOfInterest, setPointsOfInterest] = useState([]);
  const [filteredPoints, setFilteredPoints] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  useEffect(() => {
    axios.get('https://nationsounds.online/wp-json/wp/v2/pointsinterets')
      .then(response => {
        setPointsOfInterest(response.data);
        setFilteredPoints(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des points d'intérêt!", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory === 'Tous') {
      setFilteredPoints(pointsOfInterest);
    } else {
      setFilteredPoints(pointsOfInterest.filter(point => point.acf.Categorie === selectedCategory));
    }
  }, [selectedCategory, pointsOfInterest]);

  return (
    <div>
      <div className="flex justify-center mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      <MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: "80vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredPoints.map((point, index) => (
          <Marker
            key={index}
            position={[point.acf.Latitude, point.acf.Longitude]}
            icon={new L.Icon({
              iconUrl: require('leaflet/dist/images/marker-icon.png'),
              shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
              iconSize: [25, 41],
              iconAnchor: [12, 41]
            })}
          >
            <Popup>
              <strong>{point.title.rendered}</strong><br />{point.acf.Description}<br />Catégorie: {point.acf.Categorie}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
