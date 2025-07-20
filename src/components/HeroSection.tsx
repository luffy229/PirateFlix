import { useState, useEffect } from "react";
import { Play, Info, ChevronLeft, ChevronRight, Star, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Movie, tmdbApi } from "@/lib/tmdb";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "./ui/skeleton";

export const HeroSection = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularMovies = await tmdbApi.getPopularMovies();
        setMovies(popularMovies.results.slice(0, 5)); // Take first 5 movies for hero rotation
      } catch (error) {
        console.error('Error fetching hero movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Only start auto-rotation when movies are loaded
  useEffect(() => {
    if (movies.length > 0 && !loading) {
      const interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => 
          prevIndex === movies.length - 1 ? 0 : prevIndex + 1
        );
      }, 8000); // 8 seconds for slower transitions

      return () => clearInterval(interval);
    }
  }, [movies, loading]);

  const nextMovie = () => {
    if (loading || movies.length === 0) return;
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevMovie = () => {
    if (loading || movies.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  if (loading || movies.length === 0) {
    return (
      <div className="relative h-screen bg-hero-gradient">
        {/* Static Background Skeleton - No animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted" />
        
        {/* Content Skeleton - Static */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-2xl space-y-6">
              {/* Title Skeleton */}
              <div className="space-y-3">
                <Skeleton className="h-12 md:h-20 w-full max-w-lg bg-muted/80" />
                <Skeleton className="h-8 md:h-12 w-3/4 bg-muted/60" />
              </div>
              
              {/* Rating and Year Skeleton */}
              <div className="flex items-center gap-6">
                <Skeleton className="h-8 w-20 rounded-full bg-muted/70" />
                <Skeleton className="h-8 w-20 rounded-full bg-muted/70" />
              </div>
              
              {/* Description Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-muted/60" />
                <Skeleton className="h-4 w-5/6 bg-muted/60" />
                <Skeleton className="h-4 w-4/5 bg-muted/60" />
              </div>
              
              {/* Buttons Skeleton */}
              <div className="flex gap-4">
                <Skeleton className="h-12 w-32 rounded-lg bg-primary/20" />
                <Skeleton className="h-12 w-32 rounded-lg bg-muted/60" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Static Navigation Skeleton - No functionality */}
        <div className="absolute left-2 md:left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-muted/50" />
        <div className="absolute right-2 md:right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-muted/50" />
      </div>
    );
  }

  const currentMovie = movies[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Images with Smooth Transitions */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 200, damping: 40 },
            opacity: { duration: 0.8 },
            scale: { duration: 0.8 }
          }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${tmdbApi.getImageUrl(currentMovie.backdrop_path, 'original')})`
          }}
        >
          <div className="absolute inset-0 bg-hero-gradient" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 40 },
                  opacity: { duration: 0.8 },
                  delay: 0.3
                }}
              >
                <motion.h1 
                  className="text-3xl md:text-7xl font-pirate font-bold text-white mb-6 leading-tight tracking-wider animate-glow"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  {currentMovie.title}
                </motion.h1>
                
                <motion.div 
                  className="flex items-center gap-6 mb-6 text-white/90"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <div className="flex items-center gap-2 bg-primary/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-rye">{currentMovie.vote_average.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-accent/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span className="font-rye">{new Date(currentMovie.release_date).getFullYear()}</span>
                  </div>
                </motion.div>
                
                <motion.p 
                  className="text-base md:text-xl text-white/90 mb-8 leading-relaxed font-rye max-w-xl"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  {currentMovie.overview.length > 200 
                    ? currentMovie.overview.substring(0, 200) + "..." 
                    : currentMovie.overview}
                </motion.p>
                
                <motion.div 
                  className="flex gap-4"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-pirate shadow-glow hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] transition-all duration-300"
                  >
                    <Play className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                    Play
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-pirate backdrop-blur-sm"
                  >
                    <Info className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                    Info
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <motion.div 
        className="absolute left-2 md:left-8 top-1/2 transform -translate-y-1/2 z-20"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={prevMovie}
          className="bg-black/30 hover:bg-primary/30 text-white border-0 backdrop-blur-sm w-12 h-12 md:w-14 md:h-14 group"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:animate-glow" />
        </Button>
      </motion.div>
      
      <motion.div 
        className="absolute right-2 md:right-8 top-1/2 transform -translate-y-1/2 z-20"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={nextMovie}
          className="bg-black/30 hover:bg-primary/30 text-white border-0 backdrop-blur-sm w-12 h-12 md:w-14 md:h-14 group"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:animate-glow" />
        </Button>
      </motion.div>
    </div>
  );
};
