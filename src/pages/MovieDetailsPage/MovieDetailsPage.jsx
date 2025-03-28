import { useEffect, useState } from "react";
import API from "../../API/fetchImgs";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import paleceholder from "../../assets/placeholder.svg";

const MovieDetailsPage = () => {
  const [movieInfo, setMovieInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  console.log("🚀 ~ MovieDetailsPage ~ location:", location);

  const { movieId } = useParams();
  useEffect(() => {
    setIsLoading(true);
    API.fetchMovieById(movieId)
      .then((data) => {
        setMovieInfo(data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));

    return () => {};
  }, []);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {movieInfo && (
        <section>
          <div>
            <Link
              to={location.state ? location.state : "/movies"}
              state={"/movies" + location.search}
            >
              Go back
            </Link>

            <img
              src={
                movieInfo.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`
                  : `${paleceholder}`
              }
              alt={movieInfo.title}
            />

            <h2>{`${movieInfo.title} (${movieInfo.release_date.slice(
              0,
              4
            )})`}</h2>
            <p>User score: {movieInfo.vote_average * 10}%</p>
            <h3>Overview</h3>
            <p>{movieInfo.overview}</p>
            <h3>Genres</h3>
            <p>{movieInfo.genres.map((genre) => genre.name).join(", ")}</p>
            <h3>Additional information</h3>
            <ul>
              <li>
                <Link to="cast" state={location.state}>
                  cast
                </Link>
              </li>
              <li>
                <Link to="reviews" state={location.state}>
                  reviews
                </Link>
              </li>
            </ul>
            <Outlet />
          </div>
        </section>
      )}
    </>
  );
};

export default MovieDetailsPage;
