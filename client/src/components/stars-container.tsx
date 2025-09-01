import { motion } from "framer-motion";
import { Star } from "@/hooks/use-stars";

interface StarsContainerProps {
  stars: Star[];
}

export function StarsContainer({ stars }: StarsContainerProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="star"
          style={{
            left: star.x,
            top: star.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.6, 1, 0.6], 
            scale: 1,
          }}
          transition={{
            opacity: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
            scale: {
              duration: 0.5,
              ease: "easeOut",
            },
          }}
          data-testid={`star-${star.id}`}
        />
      ))}
    </div>
  );
}
