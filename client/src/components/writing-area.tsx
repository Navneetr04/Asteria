import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface WritingAreaProps {
  onRelease: (text: string) => void;
  disabled?: boolean;
}

export function WritingArea({ onRelease, disabled }: WritingAreaProps) {
  const [text, setText] = useState("");
  const [isReleasing, setIsReleasing] = useState(false);

  const handleRelease = async () => {
    if (!text.trim() || disabled) return;

    setIsReleasing(true);
    
    // Trigger release animation - show star rising for longer
    setTimeout(() => {
      onRelease(text);
      setText("");
      setIsReleasing(false);
    }, 3000); // Extended time to show full star animation
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleRelease();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto relative">
      <AnimatePresence>
        {isReleasing && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-xl text-foreground pointer-events-none z-20 bg-background/20 backdrop-blur-sm rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Text dissolving animation */}
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 0.3, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center max-w-md absolute"
            >
              {text.slice(0, 100)}...
            </motion.div>
            
            {/* Star rising animation */}
            <motion.div
              className="star absolute"
              initial={{ scale: 0, opacity: 0, y: 0, rotate: 0 }}
              animate={{ 
                scale: [0, 3, 2, 1.5, 1], 
                opacity: [0, 1, 1, 1, 0.8], 
                y: [0, 0, -100, -300, -600],
                rotate: [0, 180, 360, 540, 720]
              }}
              transition={{ 
                scale: { duration: 1, delay: 0.8, ease: "easeOut" },
                opacity: { duration: 0.5, delay: 0.8 },
                y: { duration: 2.5, delay: 1.2, ease: "easeOut" },
                rotate: { duration: 2.5, delay: 1.2, ease: "linear" }
              }}
              style={{
                filter: "drop-shadow(0 0 20px hsl(45, 85%, 85%))"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="writing-area rounded-lg p-6">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type what's on your mind… anything at all."
          className="w-full h-40 bg-transparent border-none outline-none resize-none text-lg placeholder-muted-foreground focus-visible:ring-0 focus:border-none focus:outline-none"
          disabled={isReleasing || disabled}
          data-testid="thoughts-input"
        />
        
        <div className="flex justify-center mt-6">
          <Button
            onClick={handleRelease}
            disabled={!text.trim() || isReleasing || disabled}
            className="release-button px-8 py-3 rounded-full text-lg font-medium text-primary-foreground"
            data-testid="release-button"
          >
            {isReleasing ? (
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ✨ Releasing...
              </motion.span>
            ) : (
              "Let it Go"
            )}
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground text-center mt-4">
        This is your space. Nothing is stored. Nothing is tracked. Just a moment for you to let go.
      </p>
    </div>
  );
}
