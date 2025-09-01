import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FloatingParticles } from "@/components/floating-particles";
import { StarsContainer } from "@/components/stars-container";
import { WritingArea } from "@/components/writing-area";
import { AffirmationModal } from "@/components/affirmation-modal";
import { AudioControls } from "@/components/audio-controls";
import { useStars } from "@/hooks/use-stars";
import { useAudio } from "@/hooks/use-audio";

export default function StarRelease() {
  const { stars, todayStarCount, addStar } = useStars();
  const { playReleaseSound } = useAudio();
  const [showAffirmation, setShowAffirmation] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  const handleRelease = (text: string) => {
    addStar();
    playReleaseSound();
    setShowAffirmation(true);
  };

  const toggleContrast = () => {
    setIsHighContrast(prev => {
      const newValue = !prev;
      if (newValue) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
      return newValue;
    });
  };

  useEffect(() => {
    // Set the page title
    document.title = "Star Release - Let Go, Find Peace";
    
    // Add meta description for SEO
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'A therapeutic web experience where you can anonymously release thoughts by transforming them into stars in an animated night sky. Find peace and let go.';
    document.head.appendChild(metaDescription);

    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <FloatingParticles />
      <StarsContainer stars={stars} />
      
      {/* Header */}
      <header className="p-6 flex justify-between items-center relative z-20">
        <motion.div
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <span className="text-accent-foreground text-lg font-semibold">★</span>
          </div>
          <h1 className="text-xl font-semibold text-foreground">Star Release</h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AudioControls 
            onToggleContrast={toggleContrast}
            isHighContrast={isHighContrast}
          />
        </motion.div>
      </header>

      {/* Main Content */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-20">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-glow mb-6">
              This is your space to let go
            </h2>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Release what's on your heart. Transform your thoughts into stars and watch them rise into the endless sky.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <WritingArea onRelease={handleRelease} />
          </motion.div>
        </div>
      </section>

      {/* Stars Counter */}
      <motion.div
        className="fixed bottom-6 left-6 bg-card rounded-lg p-4 border border-border z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="flex items-center space-x-3">
          <span className="text-accent text-xl">⭐</span>
          <div>
            <p className="text-sm text-muted-foreground">Stars Released Today</p>
            <p className="text-lg font-semibold" data-testid="star-count">
              {todayStarCount}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Affirmation Modal */}
      <AffirmationModal
        isOpen={showAffirmation}
        onClose={() => setShowAffirmation(false)}
      />
    </div>
  );
}
