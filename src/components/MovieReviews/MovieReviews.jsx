import { useEffect, useState } from "react";
import API from "../../API/fetchImgs";
import { useParams } from "react-router-dom";

const MovieReviews = () => {
  const [movieReviews, setMovieReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { movieId } = useParams();
  useEffect(() => {
    setIsLoading(true);
    API.fetchMovieReviews(movieId)
      .then((data) => {
        setMovieReviews(data.results);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h2>Reviews</h2>
      {isLoading && <p>Loading...</p>}
      {movieReviews.length === 0 ? (
        <p>We don't have any reviews for this movie.</p>
      ) : (
        <ul>
          {movieReviews.map((review) => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieReviews;
