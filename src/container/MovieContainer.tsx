//hooks
import {useState,useEffect} from 'react';
import useLoading from '../hooks/loading';
import {Movie} from '../component/MovieList';
//api
import {requsetGetMovie} from '../api/movie';

interface Props{
    id: string
}

function MovieContainer({id}: Props){

    const [state,setState] = useState<Movie>();
    const {handleLoading} =useLoading();

    const callGetMovie = async()=>{
        try{
            handleLoading(true);
            const res = await requsetGetMovie(id);
            console.log(res);
            if(res?.data?.status==='ok'){
                    setState(res.data.data.movie);
            }
            handleLoading(false);
        }
        catch(e){
            handleLoading(false);
            console.log(e);
        }
    }
    useEffect(()=>{
        callGetMovie();
    },[])

    useEffect(()=>{
        console.log(state);
    },[state])
    return(
        <div>
            {state?.title}
        </div>
    )
}

export default MovieContainer;