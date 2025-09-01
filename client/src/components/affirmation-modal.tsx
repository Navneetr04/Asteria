import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getRandomAffirmation } from "@/lib/affirmations";
import { useEffect, useState } from "react";

interface AffirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AffirmationModal({ isOpen, onClose }: AffirmationModalProps) {
  const [affirmation, setAffirmation] = useState("");

  useEffect(() => {
    if (isOpen) {
      setAffirmation(getRandomAffirmation());
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
          data-testid="affirmation-modal"
        >
          <motion.div
            className="affirmation-card max-w-md mx-4 p-8 rounded-xl text-center space-y-6"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full mx-auto flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <span className="text-2xl">⭐</span>
            </motion.div>
            
            <div>
              <motion.h3
                className="text-2xl font-medium mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                You've let it go
              </motion.h3>
              
              <motion.p
                className="text-muted-foreground mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                data-testid="affirmation-message"
              >
                You are not alone — even if no one sees your words, they are transformed into light.
              </motion.p>
              
              <motion.p
                className="text-sm text-accent italic"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                data-testid="random-affirmation"
              >
                {affirmation}
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={onClose}
                className="px-6 py-2 bg-secondary hover:bg-muted rounded-lg transition-colors"
                data-testid="close-affirmation"
              >
                Continue
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
