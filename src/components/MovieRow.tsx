import { useState, useEffect, useRef, useCallback } from "react";
import { Movie, MoviesResponse } from "@/lib/tmdb";
import { MovieCard } from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface MovieRowProps {
  title: string;
  fetchMovies: (page: number) => Promise<MoviesResponse>;
  onMovieHover?: (movie: Movie | null, position?: { x: number; y: number }) => void;
}

export const MovieRow = ({ title, fetchMovies, onMovieHover }: MovieRowProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const loadMovies = useCallback(async (page: number, append = false) => {
    setLoading(true);
    try {
      const response = await fetchMovies(page);
      const newMovies = response.results.filter((movie) => movie.poster_path);
      
      setMovies(prev => append ? [...prev, ...newMovies] : newMovies);
      setHasNextPage(page < response.total_pages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error loading movies:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchMovies]);

  useEffect(() => {
    loadMovies(1);
  }, [loadMovies]);

  const updateScrollButtons = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setScrollPosition(scrollLeft);
      updateScrollButtons();

      // Load more movies when near the end
      if (scrollLeft > scrollWidth - clientWidth - 400 && hasNextPage && !loading) {
        loadMovies(currentPage + 1, true);
      }
    }
  }, [hasNextPage, loading, currentPage, loadMovies, updateScrollButtons]);

  useEffect(() => {
    updateScrollButtons();
  }, [movies, updateScrollButtons]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 800;
      const newScrollPosition = direction === 'left' 
        ? scrollPosition - scrollAmount 
        : scrollPosition + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleMovieHover = (movie: Movie | null, event?: React.MouseEvent) => {
    if (onMovieHover && event) {
      const rect = event.currentTarget.getBoundingClientRect();
      onMovieHover(movie, {
        x: rect.right + 10,
        y: rect.top
      });
    } else if (onMovieHover) {
      onMovieHover(null);
    }
  };

  return (
    <div className="relative group mb-8">
      <h2 className="text-2xl font-bold text-foreground mb-4 px-4 md:px-8">
        {title}
      </h2>
      
      <div className="relative">
        {/* Left scroll button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 backdrop-blur-sm",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            !canScrollLeft && "opacity-0 pointer-events-none"
          )}
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </Button>

        {/* Right scroll button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 backdrop-blur-sm",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            !canScrollRight && "opacity-0 pointer-events-none"
          )}
          onClick={() => scroll('right')}
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </Button>

        {/* Movies container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-8 pb-2"
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              onMouseEnter={(e) => handleMovieHover(movie, e)}
              onMouseLeave={() => handleMovieHover(null)}
            >
              <MovieCard movie={movie} showPreview={false} />
            </div>
          ))}
          
          {loading && (
            <div className="flex gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-48 h-72 bg-muted animate-pulse rounded-lg"
                />
              ))}
            </div>
          )}
        </div>

        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
};