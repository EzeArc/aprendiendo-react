import { useCallback, useMemo, useRef, useState } from "react";
import { searchMovies } from "../services/movies";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  // el error no se usa pero puedes implementarlo
  const [error, setError] = useState(null);
  const previusSearch = useRef();

  const getMovies = useCallback(async ({ search }) => {
    if (search === previusSearch.current) return;
    // search es ''
    try {
      setLoading(true);
      setError(null);
      previusSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);
  // Renderiza la lista de peliculas solo cuando cambia el valor del input
  const sortedMovies = useMemo(() => {
    if (!movies) return;
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, loading };
}
