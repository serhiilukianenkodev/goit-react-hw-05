import { useEffect, useState } from "react";
import API from "../../API/fetchImgs";
import { useParams } from "react-router-dom";
import paleceholder from "../../assets/placeholder.svg";

const MovieCast = () => {
  const [movieCast, setMovieCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  useEffect(() => {
    setIsLoading(true);
    API.fetchMovieCust(movieId)
      .then((data) => {
        setMovieCast(data.cast);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h2>Cast</h2>
      {isLoading && <p>Loading...</p>}
      {movieCast.length === 0 ? (
        <p>We don't have any cast for this movie.</p>
      ) : (
        <ul>
          {movieCast.map((actor) => (
            <li key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300/${actor.profile_path}`
                    : `${paleceholder}`
                }
                alt={actor.name}
                width="100"
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
