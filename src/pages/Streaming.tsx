
import { useState } from "react";
import { Movie, tmdbApi } from "@/lib/tmdb";
import { StreamingNavbar } from "@/components/StreamingNavbar";
import { HeroSection } from "@/components/HeroSection";
import { MovieRow } from "@/components/MovieRow";
import { MoviePreview } from "@/components/MoviePreview";
import { StreamingFooter } from "@/components/StreamingFooter";
import { motion } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";

export const Streaming = () => {
  const [hoveredMovie, setHoveredMovie] = useState<Movie | null>(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });

  // Enable smooth scrolling
  useLenis();

  const handleMovieHover = (movie: Movie | null, position?: { x: number; y: number }) => {
    setHoveredMovie(movie);
    if (position) {
      setPreviewPosition(position);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <StreamingNavbar />
      
      <main>
        <HeroSection />
        
        <motion.div 
          className="py-8 space-y-8 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <MovieRow
              title="New Releases"
              fetchMovies={tmdbApi.getTrendingMovies.bind(tmdbApi)}
              onMovieHover={handleMovieHover}
            />
          </motion.div>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <MovieRow
              title="Captain's Choice"
              fetchMovies={tmdbApi.getPopularMovies.bind(tmdbApi)}
              onMovieHover={handleMovieHover}
            />
          </motion.div>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <MovieRow
              title="Legendary Adventures"
              fetchMovies={tmdbApi.getTopRatedMovies.bind(tmdbApi)}
              onMovieHover={handleMovieHover}
            />
          </motion.div>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <MovieRow
              title="Current Voyages"
              fetchMovies={tmdbApi.getNowPlayingMovies.bind(tmdbApi)}
              onMovieHover={handleMovieHover}
            />
          </motion.div>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <MovieRow
              title="Upcoming Expeditions"
              fetchMovies={tmdbApi.getUpcomingMovies.bind(tmdbApi)}
              onMovieHover={handleMovieHover}
            />
          </motion.div>
        </motion.div>
      </main>

      <StreamingFooter />

      {/* Movie Preview */}
      {hoveredMovie && (
        <MoviePreview
          movie={hoveredMovie}
          position={previewPosition}
          visible={!!hoveredMovie}
        />
      )}
    </div>
  );
};
