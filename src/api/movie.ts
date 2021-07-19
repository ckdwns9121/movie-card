import axios from 'axios';
import { customAxiosInstance ,cancleToken} from './init';
const instance = customAxiosInstance();

export const requsetGetMovie = async(id:string ,source : any) :Promise<any> =>{
    const URL = `/api/v2/movie_details.json?movie_id=${id}}`
    const res = await axios.get(URL,{cancelToken : source.token})
    return res;
}


export const requestGetMovieList = async(genre: string=''):Promise<any>  =>{
    const URL = `/api/v2/list_movies.json?limit=50${genre === undefined ? '' : `&genre=${genre}`}`
    const res = await instance.get(URL);
    return res;
}