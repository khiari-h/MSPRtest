import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import axios from 'axios';
import 'leaflet-routing-machine';
import './Map.css';  // Assurez-vous d'avoir ce fichier CSS

// Fix marker icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const categories = [
  { id: 'Tous', name: 'Tous' },
  { id: 'Scène', name: 'Scènes' },
  { id: 'Shops', name: 'Shops' },
  { id: 'Buvettes', name: 'Buvettes' },
  { id: 'WC', name: 'WC' },
  { id: 'Restaurants', name: 'Restaurants' }
];

const RoutingControl = ({ from, to }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!from || !to) return;

    setTimeout(() => {
      if (routingControlRef.current) {
        routingControlRef.current.setWaypoints([
          L.latLng(from[0], from[1]),
          L.latLng(to[0], to[1]),
        ]);
      } else {
        routingControlRef.current = L.Routing.control({
          waypoints: [
            L.latLng(from[0], from[1]),
            L.latLng(to[0], to[1]),
          ],
          router: L.Routing.osrmv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1',
            profile: 'car', // Utilisation du profil 'car' pour un itinéraire rapide
            language: 'fr', // Définit la langue en français
            units: 'metric', // Utilise les unités métriques
          }),
          routeWhileDragging: true,
          addWaypoints: false,
          draggableWaypoints: false,
          show: false,
          lineOptions: {
            styles: [{ color: 'blue', opacity: 1, weight: 6 }]
          },
          createMarker: function (i, waypoint, n) {
            const marker = L.marker(waypoint.latLng, {
              draggable: true,
              bounceOnAdd: false,
              bounceOnAddOptions: {
                duration: 1000,
                height: 800,
              },
              icon: L.icon({
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
              }),
            });
            return marker.bindPopup(waypoint.latLng.toString());
          },
        }).addTo(map);

        routingControlRef.current.on('routesfound', function (e) {
          const routes = e.routes;
          const summary = routes[0].summary;
          console.log(`Distance: ${summary.totalDistance / 1000} km, Time: ${Math.round(summary.totalTime % 3600 / 60)} minutes`);
          
          // Afficher les instructions dans le panneau intégré à la carte
          const instructions = routes[0].instructions.map(instr => `<li>${instr.text}</li>`).join('');
          document.getElementById('routing-instructions').innerHTML = `<ul>${instructions}</ul>`;
        });
      }
    }, 500);

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }
    };
  }, [from, to, map]);

  return <div id="routing-instructions" className="leaflet-routing-container leaflet-bar"></div>;
};

const Map = () => {
  const [pointsOfInterest, setPointsOfInterest] = useState([]);
  const [filteredPoints, setFilteredPoints] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(['Tous']);
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get('https://nationsounds.online/wp-json/wp/v2/pointsinterets');
        setPointsOfInterest(response.data);
        setFilteredPoints(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des points d'intérêt!", error);
      }
    };

    fetchPoints();
  }, []);

  useEffect(() => {
    if (selectedCategories.includes('Tous')) {
      setFilteredPoints(pointsOfInterest);
    } else {
      setFilteredPoints(pointsOfInterest.filter(point => selectedCategories.includes(point.acf.Categorie)));
    }
  }, [selectedCategories, pointsOfInterest]);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (value === 'Tous') {
      setSelectedCategories(checked ? ['Tous'] : []);
    } else {
      setSelectedCategories(prev =>
        checked ? [...prev.filter(cat => cat !== 'Tous'), value] : prev.filter(cat => cat !== value)
      );
    }
  };

  const handleRouteChange = (e, type) => {
    const [lat, lng] = e.target.value.split(',');
    const location = [parseFloat(lat), parseFloat(lng)];
    if (type === 'start') {
      setStartLocation(location);
    } else {
      setEndLocation(location);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap justify-center mb-4 space-x-4">
        {categories.map(category => (
          <label key={category.id} className="inline-flex items-center">
            <input
              type="checkbox"
              value={category.id}
              checked={selectedCategories.includes(category.id)}
              onChange={handleCategoryChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">{category.name}</span>
          </label>
        ))}
      </div>
      <div className="flex flex-wrap justify-center mb-4">
        <div className="mr-2">
          <label htmlFor="start-select" className="sr-only">Point de départ</label>
          <select
            id="start-select"
            value={startLocation ? startLocation.join(',') : ''}
            onChange={(e) => handleRouteChange(e, 'start')}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">Sélectionner un point de départ</option>
            {filteredPoints.map((point, index) => (
              <option key={index} value={`${point.acf.Latitude},${point.acf.Longitude}`}>
                {point.title.rendered}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="end-select" className="sr-only">Point d'arrivée</label>
          <select
            id="end-select"
            value={endLocation ? endLocation.join(',') : ''}
            onChange={(e) => handleRouteChange(e, 'end')}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">Sélectionner un point d'arrivée</option>
            {filteredPoints.map((point, index) => (
              <option key={index} value={`${point.acf.Latitude},${point.acf.Longitude}`}>
                {point.title.rendered}
              </option>
            ))}
          </select>
        </div>
      </div>
      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={13}
        className="map-container"
        style={{ height: "80vh", width: "100%" }}
      >
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
              <strong>{point.title.rendered}</strong><br />
              {point.acf.Description}<br />
              Catégorie: {point.acf.Categorie}
            </Popup>
          </Marker>
        ))}
        {startLocation && endLocation && (
          <RoutingControl from={startLocation} to={endLocation} />
        )}
      </MapContainer>
      <button 
        className="block md:hidden bg-blue-500 text-white p-2 rounded-full fixed bottom-4 right-4 z-50" 
        onClick={() => setShowInstructions(!showInstructions)}
      >
        {showInstructions ? 'Fermer' : 'Itinéraire'}
      </button>
      {showInstructions && (
        <div className="fixed inset-x-0 bottom-0 bg-white p-4 shadow-md z-50 md:hidden overflow-y-auto" style={{ maxHeight: '50vh' }}>
          <div id="routing-instructions">
            {/* Instructions d'itinéraire seront rendues ici */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
