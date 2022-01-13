import axios from 'axios';
import { customAxiosInstance, cancleToken } from './init';
const instance = customAxiosInstance();

export const requsetGetMovie = async (id: string, source: any): Promise<any> => {
  const URL = `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`;
  const res = await axios.get(URL, { cancelToken: source.token });
  return res;
};

export const requestGetMovieList = async (page: number): Promise<any> => {
  const URL = `https://yts-proxy.now.sh/list_movies.json?limit=24&&sort_by=download_count&page=${page}`;
  const res = await axios.get(URL);
  return res;
};
