// src/components/DataTable.jsx
import React from 'react';
import TableRow from './TableRow'; 

const DataTable = ({ data, onAddToPlaylist }) => {
  if (data.length === 0) {
    return <p className="no-results">Tidak ada hasil yang ditemukan. Coba keyword lain.</p>;
  }

  return (
    <div className="table-responsive">
      <table>
        <thead>
          <tr>
            <th>Artwork</th>
            <th>Track Name</th>
            <th>Artist</th>    
            <th>Price</th>     
            <th>Preview</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((track) => (
            <TableRow 
              key={track.id} 
              track={track} 
              onAddToPlaylist={onAddToPlaylist}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

