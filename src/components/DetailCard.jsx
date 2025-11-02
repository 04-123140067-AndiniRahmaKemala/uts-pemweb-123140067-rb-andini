// src/components/DetailCard.jsx
import React from 'react';

// Komponen ini menerima 'track' yang dipilih dan fungsi 'onClose'
const DetailCard = ({ track, onClose }) => {
  return (
    <div className="detail-card">
      {/* Tombol untuk kembali ke tampilan Playlist */}
      <button className="close-button" onClick={onClose}>
        &times; Kembali ke Playlist
      </button>
      
      <h2>Detail Lagu</h2>
      
      {/* Kita ganti URL gambar agar mendapat resolusi lebih besar */}
      <img 
        src={track.artwork.replace('100x100', '400x400')} 
        alt={track.trackName} 
        className="detail-artwork" 
      />
      
      <h3>{track.trackName}</h3>
      <p className="detail-artist">{track.artistName}</p>
      <p><strong>Harga:</strong> ${track.price.toFixed(2)}</p>
      <p><strong>Tanggal Rilis:</strong> {new Date(track.releaseDate).toLocaleDateString()}</p>
      
      {/* Menampilkan audio player di detail card */}
      {track.previewUrl && (
        <audio controls src={track.previewUrl} className="detail-audio">
          Browser Anda tidak mendukung audio.
        </audio>
      )}
    </div>
  );
};

export default DetailCard;
