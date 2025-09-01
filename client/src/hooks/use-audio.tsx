import { useState, useEffect, useRef } from "react";

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  useEffect(() => {
    // Initialize Web Audio API for ambient sounds
    const initAudio = async () => {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.connect(audioContextRef.current.destination);
        gainNodeRef.current.gain.value = isMuted ? 0 : 0.2;
      } catch (error) {
        console.warn("Web Audio API not supported:", error);
      }
    };

    initAudio();

    return () => {
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {
          // Oscillator may already be stopped
        }
      });
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    // Resume audio context if it's suspended (required by browsers)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    if (isPlaying) {
      // Stop all ambient sounds
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {
          // Oscillator may already be stopped
        }
      });
      oscillatorsRef.current = [];
      setIsPlaying(false);
    } else {
      // Start immersive calming sky soundscape
      try {
        const currentTime = audioContextRef.current.currentTime;
        const newOscillators: OscillatorNode[] = [];

        // Wind-like base layer
        const windOsc = audioContextRef.current.createOscillator();
        const windFilter = audioContextRef.current.createBiquadFilter();
        const windGain = audioContextRef.current.createGain();
        
        windOsc.type = 'sawtooth';
        windOsc.frequency.setValueAtTime(40, currentTime);
        windFilter.type = 'lowpass';
        windFilter.frequency.setValueAtTime(150, currentTime);
        windGain.gain.setValueAtTime(0.08, currentTime);
        
        windOsc.connect(windFilter);
        windFilter.connect(windGain);
        windGain.connect(gainNodeRef.current);
        windOsc.start();
        newOscillators.push(windOsc);

        // Atmospheric drone layer
        const droneOsc = audioContextRef.current.createOscillator();
        const droneGain = audioContextRef.current.createGain();
        
        droneOsc.type = 'sine';
        droneOsc.frequency.setValueAtTime(80, currentTime);
        droneGain.gain.setValueAtTime(0.05, currentTime);
        
        droneOsc.connect(droneGain);
        droneGain.connect(gainNodeRef.current);
        droneOsc.start();
        newOscillators.push(droneOsc);

        // Celestial harmonics
        const harmonic1 = audioContextRef.current.createOscillator();
        const harmonic1Gain = audioContextRef.current.createGain();
        
        harmonic1.type = 'sine';
        harmonic1.frequency.setValueAtTime(160, currentTime);
        harmonic1Gain.gain.setValueAtTime(0.03, currentTime);
        
        harmonic1.connect(harmonic1Gain);
        harmonic1Gain.connect(gainNodeRef.current);
        harmonic1.start();
        newOscillators.push(harmonic1);

        const harmonic2 = audioContextRef.current.createOscillator();
        const harmonic2Gain = audioContextRef.current.createGain();
        
        harmonic2.type = 'sine';
        harmonic2.frequency.setValueAtTime(240, currentTime);
        harmonic2Gain.gain.setValueAtTime(0.02, currentTime);
        
        harmonic2.connect(harmonic2Gain);
        harmonic2Gain.connect(gainNodeRef.current);
        harmonic2.start();
        newOscillators.push(harmonic2);

        // Add gentle modulation for breathing effect
        const lfo = audioContextRef.current.createOscillator();
        const lfoGain = audioContextRef.current.createGain();
        
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.1, currentTime);
        lfoGain.gain.setValueAtTime(0.005, currentTime);
        
        lfo.connect(lfoGain);
        lfoGain.connect(windGain.gain);
        lfo.start();
        newOscillators.push(lfo);

        oscillatorsRef.current = newOscillators;
        setIsPlaying(true);
      } catch (error) {
        console.warn("Error starting audio:", error);
      }
    }
  };

  const toggleMute = () => {
    if (gainNodeRef.current) {
      const newMutedState = !isMuted;
      gainNodeRef.current.gain.value = newMutedState ? 0 : 0.2;
      setIsMuted(newMutedState);
    }
  };

  const playReleaseSound = () => {
    if (!audioContextRef.current) return;

    try {
      const currentTime = audioContextRef.current.currentTime;
      
      // Main glistening bell-like tone
      const mainOsc = audioContextRef.current.createOscillator();
      const mainGain = audioContextRef.current.createGain();
      const mainFilter = audioContextRef.current.createBiquadFilter();
      
      mainOsc.type = 'sine';
      mainOsc.frequency.setValueAtTime(1200, currentTime);
      mainOsc.frequency.exponentialRampToValueAtTime(400, currentTime + 2);
      
      mainFilter.type = 'lowpass';
      mainFilter.frequency.setValueAtTime(2000, currentTime);
      mainFilter.Q.setValueAtTime(2, currentTime);
      
      mainGain.gain.setValueAtTime(0.15, currentTime);
      mainGain.gain.exponentialRampToValueAtTime(0.001, currentTime + 2);
      
      mainOsc.connect(mainFilter);
      mainFilter.connect(mainGain);
      mainGain.connect(audioContextRef.current.destination);
      
      mainOsc.start();
      mainOsc.stop(currentTime + 2);

      // Higher sparkle layer
      const sparkleOsc = audioContextRef.current.createOscillator();
      const sparkleGain = audioContextRef.current.createGain();
      
      sparkleOsc.type = 'triangle';
      sparkleOsc.frequency.setValueAtTime(2400, currentTime);
      sparkleOsc.frequency.exponentialRampToValueAtTime(800, currentTime + 1.5);
      
      sparkleGain.gain.setValueAtTime(0.08, currentTime);
      sparkleGain.gain.exponentialRampToValueAtTime(0.001, currentTime + 1.5);
      
      sparkleOsc.connect(sparkleGain);
      sparkleGain.connect(audioContextRef.current.destination);
      
      sparkleOsc.start();
      sparkleOsc.stop(currentTime + 1.5);

      // Shimmering modulation layer
      const shimmerOsc = audioContextRef.current.createOscillator();
      const shimmerGain = audioContextRef.current.createGain();
      const shimmerLFO = audioContextRef.current.createOscillator();
      const shimmerLFOGain = audioContextRef.current.createGain();
      
      shimmerOsc.type = 'sine';
      shimmerOsc.frequency.setValueAtTime(600, currentTime);
      
      shimmerLFO.type = 'sine';
      shimmerLFO.frequency.setValueAtTime(8, currentTime);
      shimmerLFOGain.gain.setValueAtTime(0.03, currentTime);
      
      shimmerGain.gain.setValueAtTime(0.06, currentTime);
      shimmerGain.gain.exponentialRampToValueAtTime(0.001, currentTime + 1.8);
      
      shimmerLFO.connect(shimmerLFOGain);
      shimmerLFOGain.connect(shimmerGain.gain);
      shimmerOsc.connect(shimmerGain);
      shimmerGain.connect(audioContextRef.current.destination);
      
      shimmerOsc.start();
      shimmerLFO.start();
      shimmerOsc.stop(currentTime + 1.8);
      shimmerLFO.stop(currentTime + 1.8);
      
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
