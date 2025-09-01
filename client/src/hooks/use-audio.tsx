import { useState, useEffect, useRef } from "react";

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    // Initialize Web Audio API for ambient sounds
    const initAudio = async () => {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.connect(audioContextRef.current.destination);
        gainNodeRef.current.gain.value = isMuted ? 0 : 0.1;
      } catch (error) {
        console.warn("Web Audio API not supported:", error);
      }
    };

    initAudio();

    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    if (isPlaying) {
      // Stop ambient sound
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current = null;
      }
      setIsPlaying(false);
    } else {
      // Start ambient sound (gentle white noise)
      try {
        const oscillator = audioContextRef.current.createOscillator();
        const filter = audioContextRef.current.createBiquadFilter();
        
        oscillator.type = 'brown';
        oscillator.frequency.setValueAtTime(100, audioContextRef.current.currentTime);
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, audioContextRef.current.currentTime);
        
        oscillator.connect(filter);
        filter.connect(gainNodeRef.current);
        
        oscillator.start();
        oscillatorRef.current = oscillator;
        setIsPlaying(true);
      } catch (error) {
        console.warn("Error starting audio:", error);
      }
    }
  };

  const toggleMute = () => {
    if (gainNodeRef.current) {
      const newMutedState = !isMuted;
      gainNodeRef.current.gain.value = newMutedState ? 0 : 0.1;
      setIsMuted(newMutedState);
    }
  };

  const playReleaseSound = () => {
    if (!audioContextRef.current) return;

    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, audioContextRef.current.currentTime + 1);
      
      gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 1);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.start();
      oscillator.stop(audioContextRef.current.currentTime + 1);
    } catch (error) {
      console.warn("Error playing release sound:", error);
    }
  };

  return {
    isPlaying,
    isMuted,
    toggleAudio,
    toggleMute,
    playReleaseSound,
  };
}
