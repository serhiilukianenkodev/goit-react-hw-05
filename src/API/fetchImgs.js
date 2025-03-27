import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGQyNDlmYmQ0OWNhOTZiYTc0MDA4MDBjNjQwMDgyMSIsIm5iZiI6MTY2MTM1NTE2Ni4zMzc5OTk4LCJzdWIiOiI2MzA2NDQ5ZTNkZDEyNjAwN2VkNzhjYjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.LsOOvNsmdG1A0LlTSZmujyZtkdHCqqxiyszEBl0Z6m0";
// const BASE_URL =
//   "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers["Authorization"] = `Bearer ${API_KEY}`;

export const fetchTrendingMovies = async () => {
  const res = await axios.get("/trending/movie/day");
  return res.data;
};
