import {useState, useEffect} from 'react';
import {requestGetMovieList} from '../api/movie';
import MovieList,{Movie} from '../component/MovieList';

function MovieListContainer(){

    const [movies,setMovies] = useState<Movie[]>([]);

    const callGetApiMoiveList = async() :Promise<void> =>{
        try{
            const res : any = await requestGetMovieList();
            console.log(res);
            if(res?.data?.status==='ok'){
                setMovies(res.data.data.movies);
            }
            else{
                console.log('error');
            }
        }
        catch(e){
            console.error(e);
        }
    }

    useEffect(()=>{
        callGetApiMoiveList();
    },[])

    return(
        <MovieList movies={movies}/>
    )
}

export default MovieListContainer;