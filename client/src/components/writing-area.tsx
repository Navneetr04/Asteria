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
    
    // Trigger release animation
    setTimeout(() => {
      onRelease(text);
      setText("");
      setIsReleasing(false);
    }, 1500);
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
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 0.3, opacity: 0, y: -200 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-center max-w-md"
            >
              {text.slice(0, 100)}...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="writing-area rounded-lg p-6">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write your thoughts, feelings, or worries here..."
          className="w-full h-40 bg-transparent border-none outline-none resize-none text-lg placeholder-muted-foreground focus-visible:ring-0"
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
              "✨ Release Into The Sky"
            )}
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground text-center mt-4">
        Your thoughts are anonymous and private. Each day brings a fresh sky.
      </p>
    </div>
  );
}
