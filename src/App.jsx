// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import SearchForm from './components/SearchForm';
import DataTable from './components/DataTable'; // Menggunakan DataTable
import Playlist from './components/Playlist';
import './styles/App.css'; 

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('jack johnson');
  const [mediaType, setMediaType] = useState('music');
  const [sortBy, setSortBy] = useState('releaseDate'); 
  const [playlist, setPlaylist] = useState(() => {
    try {
      const saved = localStorage.getItem('music-playlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Could not load playlist from localStorage", e);
      return [];
    }
  });

  const fetchData = useCallback(async () => {
    // ... (Fungsi fetch data Anda sudah benar) ...
    if (!searchTerm) return;
    setLoading(true);
    setError(null);
    try {
      const url = `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&media=${mediaType}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const transformedResults = data.results
        .filter(item => item.kind === 'song' || item.kind === 'feature-movie' || item.kind === 'album')
        .map(({ trackId, artworkUrl100, trackName, artistName, trackPrice, collectionPrice, releaseDate, previewUrl }) => ({
          id: trackId,
          artwork: artworkUrl100,
          trackName,
          artistName,
          price: trackPrice || collectionPrice || 0,
          releaseDate,
          previewUrl,
        }));
      setResults(transformedResults);
    } catch (e) {
      setError("Gagal memuat data: " + e.message);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, mediaType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Sorting Logic (Perbaikan Bug a.date -> a.releaseDate)
  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price;
    }
    return new Date(b.releaseDate) - new Date(a.releaseDate); // <-- Bug sudah diperbaiki
  });

  const handleSearchSubmit = (newSearchTerm, newMediaType) => {
    setSearchTerm(newSearchTerm);
    setMediaType(newMediaType);
  };

  const addToPlaylist = (track) => {
    const newPlaylist = [...playlist, track];
    setPlaylist(newPlaylist);
    localStorage.setItem('music-playlist', JSON.stringify(newPlaylist));
  };

  // Render JSX (Struktur Awal)
  return (
    <div className="container">
      {/* Header tetap di dalam App.jsx */}
      <header className="header">
        <h1 className="app-title">Music Explorer</h1>
      </header>

      <main className="main-content">
        <SearchForm
          onSubmit={handleSearchSubmit}
          onSortChange={setSortBy}
          currentSort={sortBy}
        />

        {error && <p className="error-error">{error}</p>}

        {loading ? (
          <p className="loading-message">Memuat hasil pencarian...</p>
        ) : (
          <DataTable 
            data={sortedResults}
            onAddToPlaylist={addToPlaylist}
            // Kita TIDAK menambahkan onTrackSelect
          />
        )}
      </main>

      {/* Sidebar HANYA menampilkan Playlist */}
      <aside className="sidebar">
        <h2>Playlist Saya</h2>
        <Playlist tracks={playlist} />
      </aside>
    </div>
  );
}

export default App;
