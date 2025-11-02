// src/components/SearchForm.jsx
import React, { useState } from 'react';

const SearchForm = ({ onSubmit, onSortChange, currentSort }) => {
  const [keyword, setKeyword] = useState('');
  const [media, setMedia] = useState('music');
  const [searchOnlySongs, setSearchOnlySongs] = useState(false); 
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(keyword, media);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Keyword (wajib diisi)"
        required 
      />
      <select value={media} onChange={(e) => setMedia(e.target.value)}>
        <option value="music">Musik</option>
        <option value="movie">Film</option>
        <option value="podcast">Podcast</option>
      </select>
      <select value={currentSort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="releaseDate">Urut: Tanggal Rilis</option>
        <option value="price">Urut: Harga</option>
      </select>
      <label>
        <input
            type="checkbox"
            checked={searchOnlySongs}
            onChange={(e) => setSearchOnlySongs(e.target.checked)}
        />
        Hanya Lagu
      </label>
      <button type="submit">Cari</button> 
      <input type="hidden" name="source" value="react-app" />
    </form>
  );
};

export default SearchForm;
