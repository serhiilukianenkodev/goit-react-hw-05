import { useEffect, useState } from "react";
import API from "../../API/fetchImgs";
import MovieList from "../../components/MovieList/MovieList";
const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchMovies() {
      try {
        setIsLoading(true);
        const data = await API.fetchTrendingMovies(signal);
        setPopularMovies(data.results);
      } catch (error) {
        if (error.message === "canceled") return;
        console.log(error);
      }
      setIsLoading(false);
    }

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <section>
      <h1>HomePage</h1>
      {isLoading && <p>Loading...</p>}
      {popularMovies.length !== 0 && <MovieList movies={popularMovies} />}
    </section>
  );
};

export default HomePage;
