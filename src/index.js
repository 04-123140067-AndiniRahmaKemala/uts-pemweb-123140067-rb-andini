import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'  // ← Ganti dari .js ke .jsx
import './styles/index.css'  // ← TAMBAH "styles/" di depan

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  React.createElement(React.StrictMode, null,
    React.createElement(App)
  )
)