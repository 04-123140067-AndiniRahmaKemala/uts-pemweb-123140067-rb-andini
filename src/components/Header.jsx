// src/components/Header.jsx
import React from 'react';

// Komponen ini menggunakan class 'header' dan 'app-title' 
// yang style-nya sudah ada di file 'src/styles/App.css'
const Header = () => {
  return (
    <header className="header">
      {/* Judul ini sudah kita ubah sebelumnya */}
      <h1 className="app-title">Music Explorer</h1>
    </header>
  );
};

export default Header;