// src/components/AudioPlayer.jsx
import React, { useRef, useEffect, useState } from 'react';

const AudioPlayer = ({ track, onStop }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // ✅ TAMBAH: Safety check - jika track undefined, jangan render
  if (!track) {
    return null;
  }

  useEffect(() => {
    if (audioRef.current && track.previewUrl) {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
      });
      setIsPlaying(true);
    }

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [track]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
        });
        setIsPlaying(true);
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (onStop) {
      onStop();
    }
  };

  return (
    <div className="audio-player">
      <div className="audio-player-info">
        <span>Now Playing: {track.trackName || 'Unknown Track'} - {track.artistName || 'Unknown Artist'}</span>
        <div className="audio-controls">
          <button onClick={togglePlay} className="play-pause-btn">
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button onClick={onStop} className="stop-btn">
            ⏹️
          </button>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={track.previewUrl}
        onEnded={handleEnded}
        onError={(e) => {
          console.error("Audio error:", e);
          setIsPlaying(false);
        }}
      />
    </div>
  );
};

export default AudioPlayer;