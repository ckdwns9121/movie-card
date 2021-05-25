//hooks
import {useState,useEffect} from 'react';
import useLoading from '../hooks/loading';
import styles from './MovieContainer.module.scss';

import Genres from '../component/Genres';
import {Movie} from '../types/Movie';
//api
import {requsetGetMovie} from '../api/movie';

type Props={
    id: string
}

interface State extends Movie{
    background_image: string,
    background_image_original: string,
    date_uploaded: string,
    date_uploaded_unix: number,
    description_intro:string,
    download_count: number
    genres: string[] |undefined,
    imdb_code: string,
    language:string,
    large_cover_image: string,
    like_count: number
    mpa_rating: string,
    runtime: number
    slug:string,
    small_cover_image: string,
    title_english: string,
    title_long: string,
    torrents: object[],
    url: string,
    year: number
    yt_trailer_code: string,
}
function MovieContainer({id}: Props){

    const [state,setState] = useState<State>();
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
        <div className={styles['container']}>
            <div className={styles['content']}>
                <div className={styles['movie-poster']}>
                    <img src ={state?.large_cover_image} alt={state?.title}/>
                </div>
                <div className={styles['movie-content']}>
                    <div className={styles['movie-title']}>
                        {state?.title}
                    </div>
                    <div className={styles['movie-descript']}>
                         {state?.description_full}

                    </div>
                    <div className={styles['movie-rating']}>
                        <Genres genres ={state?.genres}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieContainer;