import { useState } from "react";
import { Movie, tmdbApi } from "@/lib/tmdb";
import { Star, Calendar, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  onHover?: (movie: Movie | null) => void;
  showPreview?: boolean;
}

export const MovieCard = ({ movie, onHover, showPreview = true }: MovieCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleMouseEnter = () => {
    if (showPreview && onHover) {
      onHover(movie);
    }
  };

  const handleMouseLeave = () => {
    if (showPreview && onHover) {
      onHover(null);
    }
  };

  const posterUrl = movie.poster_path 
    ? tmdbApi.getImageUrl(movie.poster_path, "w300")
    : null;

  return (
    <div
      className={cn(
        "group relative flex-shrink-0 w-48 transition-all duration-300 ease-out cursor-pointer",
        "hover:scale-105 hover:z-10"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden rounded-lg bg-movie-card shadow-lg group-hover:shadow-card-hover transition-all duration-300">
        {posterUrl && !imageError ? (
          <>
            <img
              src={posterUrl}
              alt={movie.title}
              className={cn(
                "w-full h-72 object-cover transition-all duration-300",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            {!imageLoaded && (
              <div className="w-full h-72 bg-muted animate-pulse flex items-center justify-center">
                <div className="text-muted-foreground">Loading...</div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-72 bg-movie-card flex items-center justify-center">
            <div className="text-center p-4">
              <div className="text-lg font-semibold text-foreground mb-2">
                {movie.title}
              </div>
              <div className="text-sm text-muted-foreground">
                No Image Available
              </div>
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-white text-sm font-medium">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
            <h3 className="text-white font-semibold text-sm line-clamp-2 mb-2">
              {movie.title}
            </h3>
            <div className="flex items-center gap-2 text-white/80 text-xs">
              <Calendar className="w-3 h-3" />
              <span>
                {movie.release_date ? new Date(movie.release_date).getFullYear() : "TBA"}
              </span>
            </div>
          </div>
          
          {/* Play button */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-glow transition-transform duration-300 group-hover:scale-110">
              <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground ml-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};