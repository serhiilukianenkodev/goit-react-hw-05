import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../API/fetchImgs";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await fetchTrendingMovies();
        setPopularMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMovies();
  }, []);
  return (
    <section>
      <h1>HomePage</h1>
      {popularMovies.length !== 0 && <MovieList movies={popularMovies} />}
    </section>
  );
};

export default HomePage;
