// src/components/TableRow.jsx
import React from 'react';

const TableRow = ({ track, onAddToPlaylist }) => {
  const handleAddToPlaylist = () => {
    if (onAddToPlaylist) {
      onAddToPlaylist(track);
    }
  };

  return (
    <tr className="table-row">
      <td>
        {track.artwork ? (
          <img 
            src={track.artwork} 
            alt={track.trackName}
            className="track-artwork"
          />
        ) : (
          <div className="no-artwork">No Artwork</div>
        )}
      </td>
      <td>{track.trackName}</td>
      <td>{track.artistName}</td>
      <td>${track.price ? track.price.toFixed(2) : '0.00'}</td>
      <td>
        {track.previewUrl ? (
          <audio controls className="audio-preview">
            <source src={track.previewUrl} type="audio/mpeg" />
            Browser tidak support audio.
          </audio>
        ) : (
          <span className="no-preview">No Preview</span>
        )}
      </td>
      <td>
        <button
          onClick={handleAddToPlaylist}
          className="add-button"
        >
          + Playlist
        </button>
      </td>
    </tr>
  );
};

export default TableRow;