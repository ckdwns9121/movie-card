import axios from 'axios';
import { customAxiosInstance } from './init';


// export const requestGetMovieList = async(genre: string='')=>{
//     try{

//         const URL = `https://yts.mx/api/v2/list_movies.json?limit=50${genre === undefined ? '' : `&genre=${genre}`}`
//         const res = axios.get(URL).then((res:any) =>{return res}).catch(()=>[]);
//         return res;
//     }
//     catch(e){
//         console.error(e);
//     }
// }

export const requsetGetMovie = async(id:string) :Promise<any> =>{
    try{
        const URL = `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
        const res = await axios.get(URL)
        return res;
    }
    catch(e){
        console.error(e);
    }
}


export const requestGetMovieList = async(genre: string=''):Promise<any>  =>{
    const URL = `/api/v2/list_movies.json?limit=50${genre === undefined ? '' : `&genre=${genre}`}`
    const instance = customAxiosInstance();
    const res = await instance.get(URL);
    return res;
}