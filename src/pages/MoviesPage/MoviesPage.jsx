import { useEffect, useState } from "react";
import API from "../../API/fetchImgs";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);

  const query = searchParams.get("query");

  const updateSearchParams = (key, value) => {
    // 1. Копіюємо існуючі параметри
    const updatedParams = new URLSearchParams(searchParams);
    // 2. Оновлюємо певний ключ
    updatedParams.set(key, value);
    // 3. Застосовуємо зміни до URL
    setSearchParams(updatedParams);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.query.value.trim();
    if (value === "") return console.log("Enter value");
    updateSearchParams("query", value);
    e.target.reset();
  };

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);
    API.fetchMovieByQuery(query)
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [query]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong. Try to reload page.</p>}

      {movies && <MovieList movies={movies} />}
    </>
  );
};

export default MoviesPage;
