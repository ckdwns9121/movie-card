import axios from 'axios';

export const getMovieAPI = async (id: string): Promise<any> => {
  const URL = `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`;
  const res = await axios.get(URL);
  return res.data.data.movie;
};

export const getMoviesAPI = async (page: number): Promise<any> => {
  const URL = `https://yts-proxy.now.sh/list_movies.json?limit=24&&sort_by=download_count&page=${page}`;
  const res = await axios.get(URL);
  return res.data.data.movies;
};
