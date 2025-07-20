const API_KEY = import.meta.env.VITE_TMDB_API_KEY || "";
const BASE_URL = import.meta.env.VITE_BASE_URL || "";
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || "";


// Cache for storing API responses
const cache = new Map<string, any>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheItem {
  data: any;
  timestamp: number;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

class TMDBApi {
  private async fetchWithCache<T>(url: string): Promise<T> {
    const cacheKey = url;
    const cached = cache.get(cacheKey) as CacheItem;
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
      
      return data;
    } catch (error) {
      console.error("TMDB API Error:", error);
      throw error;
    }
  }

  async getPopularMovies(page = 1): Promise<MoviesResponse> {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
    return this.fetchWithCache<MoviesResponse>(url);
  }

  async getTopRatedMovies(page = 1): Promise<MoviesResponse> {
    const url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`;
    return this.fetchWithCache<MoviesResponse>(url);
  }

  async getUpcomingMovies(page = 1): Promise<MoviesResponse> {
    const url = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`;
    return this.fetchWithCache<MoviesResponse>(url);
  }

  async getNowPlayingMovies(page = 1): Promise<MoviesResponse> {
    const url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`;
    return this.fetchWithCache<MoviesResponse>(url);
  }

  async getTrendingMovies(page = 1): Promise<MoviesResponse> {
    const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`;
    return this.fetchWithCache<MoviesResponse>(url);
  }

  async getMoviesByGenre(genreId: number, page = 1): Promise<MoviesResponse> {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`;
    return this.fetchWithCache<MoviesResponse>(url);
  }

  async getGenres(): Promise<{ genres: Genre[] }> {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
    return this.fetchWithCache<{ genres: Genre[] }>(url);
  }

  getImageUrl(path: string, size = "w500"): string {
    return `${IMAGE_BASE_URL}/${size}${path}`;
  }

  getBackdropUrl(path: string, size = "w1280"): string {
    return `${IMAGE_BASE_URL}/${size}${path}`;
  }
}

export const tmdbApi = new TMDBApi();