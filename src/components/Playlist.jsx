// src/components/Playlist.jsx
import React from 'react';

const Playlist = ({ tracks }) => {
  if (tracks.length === 0) {
    return <p>Playlist kosong.</p>;
  }
  return (
    <ul>
      {tracks.map((track, index) => (
        <li key={index}>
          {track.trackName} - {track.artistName}
        </li>
      ))}
    </ul>
  );
};

export default Playlist;
