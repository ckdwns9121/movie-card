import {useState, useEffect} from 'react';
import {requestGetMovieList} from '../api/movie';
import MovieList from '../component/MovieList';

export interface Movie{
    id : number,
    medium_cover_image : string,
    title: string,
    rating : number,
}

function HomeContainer(){

    const [movies,setMovies] = useState<Movie[]>([]);

    const callGetApiMoiveList = async() :Promise<void> =>{
        try{
            const res = await requestGetMovieList();
            console.log(res);
            if(res?.data?.status==='ok'){
                setMovies(res.data.data.movies);
            }
            else{
                console.log('error');
            }
        }
        catch(e){

        }
    }

    useEffect(()=>{
        callGetApiMoiveList();
    },[])

    return(
        <MovieList movies={movies}/>
    )
}

export default HomeContainer;