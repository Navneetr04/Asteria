import { useState, useEffect, useCallback } from "react";

export interface Star {
  id: string;
  x: number;
  y: number;
  createdAt: number;
}

export function useStars() {
  const [stars, setStars] = useState<Star[]>([]);
  const [todayStarCount, setTodayStarCount] = useState(0);

  // Get today's date string for storage key
  const getTodayKey = () => {
    return new Date().toDateString();
  };

  // Load stars from localStorage on mount
  useEffect(() => {
    const todayKey = getTodayKey();
    const storedStars = localStorage.getItem(`stars-${todayKey}`);
    
    if (storedStars) {
      try {
        const parsedStars = JSON.parse(storedStars);
        setStars(parsedStars);
        setTodayStarCount(parsedStars.length);
      } catch (error) {
        console.error("Error parsing stored stars:", error);
      }
    }

    // Clean up old days' stars
    const allKeys = Object.keys(localStorage);
    allKeys.forEach(key => {
      if (key.startsWith('stars-') && key !== `stars-${todayKey}`) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  // Save stars to localStorage whenever stars change
  useEffect(() => {
    if (stars.length > 0) {
      const todayKey = getTodayKey();
      localStorage.setItem(`stars-${todayKey}`, JSON.stringify(stars));
    }
  }, [stars]);

  const addStar = useCallback(() => {
    const newStar: Star = {
      id: Date.now().toString(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * (window.innerHeight * 0.4) + 50, // Upper 40% of screen
      createdAt: Date.now(),
    };

    setStars(prev => [...prev, newStar]);
    setTodayStarCount(prev => prev + 1);
    
    return newStar;
  }, []);

  return {
    stars,
    todayStarCount,
    addStar,
  };
}
