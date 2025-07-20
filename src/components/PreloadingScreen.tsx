import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const PreloadingScreen = ({ onFinish }: { onFinish?: () => void }) => {
  const [showRibbons, setShowRibbons] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timeout1 = setTimeout(() => setShowRibbons(true), 800);
    const timeout2 = setTimeout(() => setFadeOut(true), 2500);
    const timeout3 = setTimeout(() => onFinish?.(), 3000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1 }}
    >
      {/* PirateFlix Glowing Title */}
      <motion.h1
        className="z-10 text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] font-creepster text-primary tracking-wider text-center px-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        PirateFlix
      </motion.h1>

      {/* Fullscreen Ribbons - Responsive */}
      {showRibbons && (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="flex h-full w-full">
            {Array.from({ length: 80 }).map((_, i) => (
              <motion.div
                key={i}
                className="h-full flex-shrink-0"
                style={{ width: "1.25%" }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [1, 1.5, 1], opacity: 0.3 }}
                transition={{
                  delay: i * 0.02,
                  duration: 0.75,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              >
                <div className="w-full h-full bg-gradient-to-b from-red-600 via-transparent to-purple-600 blur-sm" />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
