//hooks
import {useState,useEffect, useRef} from 'react';
import useLoading from '../hooks/loading';
import styles from './MovieContainer.module.scss';

import Genres from '../component/Genres';
import {Movie} from '../types/Movie';
//api
import {requsetGetMovie} from '../api/movie';
import axios,{CancelToken} from 'axios';

import BottomModal from '../component/BottomModal';

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
    const source = useRef<any>(null);
    const [value ,setValue] = useState<string>('');
    const [height , setHeight] = useState<number>(1);
    const [open, setOpen] = useState<boolean>(false);

    const onChange=()=>setOpen(false);

    const callGetMovie = async()=>{

        console.log('ho');
        console.log(source.current);
        if(source.current!==null){
            console.log('요청 취소');
            source.current.cancel();
        }
        const CancelToken = axios.CancelToken;
        source.current = CancelToken.source();

        try{
            
            handleLoading(true);
            const res = await requsetGetMovie(id,source);
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

    const scrollControl =()=>{
        let scroll = window.scrollY;
        setHeight(scroll);
    }

    useEffect(()=>{
        window.addEventListener('scroll', scrollControl);
        return () => window.removeEventListener('scroll', scrollControl);
    },[])
    useEffect(()=>{
        window.scrollTo(0,0);
        callGetMovie();
    },[])
    useEffect(()=>{
        callGetMovie();
    },[value])
    return(
        <>
        <div className={styles['container']}>
            <div className={styles['content']}>
                <div className={styles['movie-poster']} >
                    <img src ={state?.large_cover_image} alt={state?.title}/>
                </div>
                <div className={styles['mobile-wrap']}>
                <div className={styles['mobile-movie-poster']} 
                   style={{
                    backgroundImage: `url(${state?.large_cover_image})`,
                    transform: `translate3d(0%,${height  /100}% ,0) scale(${100 + height /2 / 10}%)`,
                    filter :`blur(${height/100}px)`
                }}
                />
                </div>
         
                <div className={styles['movie-content']}>
                    <div className={styles['movie-title']}>
                        {state?.title_long}
                    </div>
                    <div className={styles['movie-descript']}>
                        {state?.description_full}
                        {state?.description_full}

                        {state?.description_full}

                    </div>
                    {/* <div className={styles['movie-rating']}>
                        <Genres genres ={state?.genres}/>
                    </div> */}
                </div>
       
            </div>
        </div>
        {/* <BottomModal state={1} touchSize={100} delta={50}  className={styles['filter']}>
                 <div className={styles['test']}>
                             gd
                 </div>
        </BottomModal> */}
            </>
    )
}

export default MovieContainer;