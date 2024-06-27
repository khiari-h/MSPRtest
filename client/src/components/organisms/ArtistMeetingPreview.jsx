// src/components/organisms/ArtistMeetingsPreview.js
import React from 'react';
import Text from '../atoms/text';
import Button from '../atoms/button';
import { artistMeetings } from '../../data/artistMeetingsData';

const ArtistMeetingsPreview = () => {
  const visibleMeetings = 3;

  return (
    <section className="container mx-auto py-8" aria-labelledby="artist-meetings-heading">
      <Text content="Rencontres avec les Artistes" type="h2" className="text-2xl font-bold mb-6 text-center" id="artist-meetings-heading" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artistMeetings.slice(0, visibleMeetings).map((meeting, index) => (
          <div key={index} className="info-card">
            <img src={meeting.image} alt={meeting.artist} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{meeting.artist}</h3>
              <p className="text-gray-700 mb-4">{meeting.description}</p>
              <p className="text-gray-600 mb-4">Date: {meeting.date}, Heure: {meeting.time}, Lieu: {meeting.venue}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        <Button
          label="Voir Plus"
          href="/artist-meetings"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          aria-label="Voir toutes les rencontres avec les artistes"
        />
      </div>
    </section>
  );
};

export default ArtistMeetingsPreview;
