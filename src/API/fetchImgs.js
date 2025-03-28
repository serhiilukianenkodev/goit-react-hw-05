import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGQyNDlmYmQ0OWNhOTZiYTc0MDA4MDBjNjQwMDgyMSIsIm5iZiI6MTY2MTM1NTE2Ni4zMzc5OTk4LCJzdWIiOiI2MzA2NDQ5ZTNkZDEyNjAwN2VkNzhjYjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.LsOOvNsmdG1A0LlTSZmujyZtkdHCqqxiyszEBl0Z6m0";
// const BASE_URL =
//   "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers["Authorization"] = `Bearer ${API_KEY}`;

const fetchTrendingMovies = async (signal) => {
  const res = await axios.get("/trending/movie/day", { signal });
  return res.data;
};

const fetchMovieById = async (movieId, signal) => {
  const res = await axios.get(`/movie/${movieId}`, { signal });
  return res.data;
};

const fetchMovieCust = async (movieId) => {
  const res = await axios.get(`movie/${movieId}/credits`);
  return res.data;
};

const fetchMovieReviews = async (movieId) => {
  const res = await axios.get(`movie/${movieId}/reviews`);
  return res.data;
};

const fetchMovieByQuery = async (query) => {
  const res = await axios.get(`/search/movie?query=${query}`);
  return res.data;
};

export default {
  fetchTrendingMovies,
  fetchMovieById,
  fetchMovieCust,
  fetchMovieReviews,
  fetchMovieByQuery,
};
