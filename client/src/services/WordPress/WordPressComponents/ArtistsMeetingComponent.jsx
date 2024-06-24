// src/components/ArtistsMeetingsComponent.js
import React, { useEffect, useState } from 'react';
import wordpressService from '../services/wordpressService';

const ArtistsMeetingsComponent = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const data = await wordpressService.getData('wordpress/artists-meetings');
        setMeetings(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des rencontres avec les artistes:', error);
      }
    };

    fetchMeetings();
  }, []);

  return (
    <div>
      <h1>Rencontres avec les Artistes</h1>
      <ul>
        {meetings.map(meeting => (
          <li key={meeting.id}>
            <h2>{meeting.artist}</h2>
            <p>{meeting.date}</p>
            <p>{meeting.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistsMeetingsComponent;
