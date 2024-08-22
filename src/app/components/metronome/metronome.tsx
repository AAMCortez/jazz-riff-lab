

import React, { useState, useEffect, useRef } from 'react';

export default function Metronome() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(100); // default tempo 100 BPM
  const [isMuted, setIsMuted] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      startMetronome();
    } else {
      stopMetronome();
    }

    return () => stopMetronome(); // Clean up when component unmounts
  }, [isPlaying, tempo, isMuted]);

  const startMetronome = () => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const interval = (60 / tempo) * 1000;

    intervalId.current = setInterval(() => {
      if (!isMuted) {
        playClick();
      }
    }, interval);
  };

  const stopMetronome = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  const playClick = () => {
    const osc = audioContext.current!.createOscillator();
    const envelope = audioContext.current!.createGain();

    osc.frequency.value = 1000; // Frequency of the click sound
    envelope.gain.value = 1;

    osc.connect(envelope);
    envelope.connect(audioContext.current!.destination);

    osc.start();
    envelope.gain.exponentialRampToValueAtTime(0.001, audioContext.current!.currentTime + 0.1);
    osc.stop(audioContext.current!.currentTime + 0.1);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTempoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempo(Number(e.target.value));
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl mb-8">Metronome</h1>
      <div className="mb-4">
        <label htmlFor="tempo" className="mr-4">Tempo: {tempo} BPM</label>
        <input 
          id="tempo"
          type="range"
          min="40"
          max="240"
          value={tempo}
          onChange={handleTempoChange}
          className="slider"
        />
      </div>
      <div className="flex space-x-4">
        <button 
          onClick={togglePlay} 
          className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded"
        >
          {isPlaying ? 'Stop' : 'Start'}
        </button>
        <button 
          onClick={toggleMute} 
          className={`bg-cyan-700 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded ${isMuted ? 'opacity-50' : ''}`}
        >
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
      </div>
    </div>
  );
}
