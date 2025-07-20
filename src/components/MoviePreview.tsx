import { Movie, tmdbApi } from "@/lib/tmdb";
import { Star, Calendar, Play, Info } from "lucide-react";
import { Button } from "./ui/button";

interface MoviePreviewProps {
  movie: Movie;
  position: { x: number; y: number };
  visible: boolean;
}

export const MoviePreview = ({ movie, position, visible }: MoviePreviewProps) => {
  if (!visible) return null;

  const backdropUrl = movie.backdrop_path 
    ? tmdbApi.getBackdropUrl(movie.backdrop_path, "w500")
    : tmdbApi.getImageUrl(movie.poster_path, "w500");

  return (
    <div
      className="fixed z-50 w-80 bg-preview-bg rounded-lg shadow-2xl border border-border overflow-hidden transition-all duration-300 transform"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(${position.x > window.innerWidth / 2 ? '-100%' : '0'}, ${position.y > window.innerHeight / 2 ? '-100%' : '0'})`
      }}
    >
      {/* Backdrop Image */}
      {backdropUrl && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-preview-bg via-transparent to-transparent" />
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="sm" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/20">
              <Play className="w-4 h-4 mr-1 fill-white" />
              Play
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2">
          {movie.title}
        </h3>
        
        {/* Rating and Release Date */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-foreground">
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              ({movie.vote_count})
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span className="text-xs">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : "TBA"}
            </span>
          </div>
        </div>

        {/* Overview */}
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {movie.overview || "No description available."}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            <Play className="w-3 h-3 mr-1 fill-primary-foreground" />
            Play
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Info className="w-3 h-3 mr-1" />
            Info
          </Button>
        </div>
      </div>
    </div>
  );
};