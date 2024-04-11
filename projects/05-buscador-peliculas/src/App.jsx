import "./App.css";
import { useMovies } from "./hooks/useMovies";
import { Movies } from "./components/Movies";
import { useEffect, useState, useRef, useCallback } from "react";
import debounce from "just-debounce-it";

function useSearch() {
  // Controlamos a traves de react los valores del input
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    // Comprobamos que el input aun no tenga datos cuando se monta
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("No se puede buscar una película vacía");
      return;
    }
    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una película con un número");
      return;
    }
    if (search.length < 3) {
      setError("La búsqueda debe tener al menos 3 carácteres");
      return;
    }

    setError(null);
  }, [search]);
  return { search, updateSearch, error };
}

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });
  //const inputRef = useRef();

  // Para esperar a q el usuario termine de escribir y hacer la ultima petición
  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 300),
    [getMovies]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    //const value = inputRef.current.value; -> cuando se recupera la ref de un input
    //const fields = new FormData(event.target);
    //const query = fields.get("query"); --> Forma de conseguir los datos de un solo campo
    //En caso de necesitar recuperar varios campos de un formulario
    //const fields = Object.fromEntries(new window.FormData(event.target))
    //const { query } = Object.fromEntries(new window.FormData(event.target));
    getMovies({ search });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debouncedGetMovies(newSearch);
  };

  return (
    <>
      <div className="page">
        <header>
          <form className="form" onSubmit={handleSubmit}>
            <input
              value={search}
              onChange={handleChange}
              name="query"
              //ref={inputRef}
              type="text"
              placeholder="Avengers, Star Wars, The Matrix..."
            />
            <input type="checkbox" onChange={handleSort} checked={sort} />
            <button type="submit">Buscar</button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </header>
        <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
      </div>
    </>
  );
}

export default App;
