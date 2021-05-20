import axios from 'axios';


export const requestGetMovieList = async(genre: string='')=>{
    try{
        const URL = `https://yts.mx/api/v2/list_movies.json?limit=50${genre === undefined ? '' : `&genre=${genre}`}`
        const res = axios.get(URL);
        return res;
    }
    catch(e){

    }
}

export const requsetGetMovie = async(id:string) =>{
    try{

    }
    catch(e){

    }
}