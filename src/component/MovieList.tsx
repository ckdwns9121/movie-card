import React from 'react';
import styles from './MovieList.module.scss';
import {useHistory} from 'react-router-dom';
import {ButtonBase} from '@material-ui/core';
import {Movie} from '../types/Movie';

type MovieItemProps={
    movie : Movie;
}
type MovieListProps={
    movies : Movie[]
}

function MovieItem ( {movie} : MovieItemProps){

    const history = useHistory();
    const {id, medium_cover_image,title,rating,description_full} = movie;

    const onClickItem =()=>{
        history.push(`/detail/${id}`);
    }
    return(
        <ButtonBase className={styles['movie-item']} onClick={onClickItem}>
            <div className={styles['movie-poster']}>
                <img src={medium_cover_image} alt={title}/>
            </div>
            <div className={styles['movie-title']}>
                {title}
            </div>
            <div className={styles['movie-description']}>
                {description_full}
            </div>
        </ButtonBase>
    )
}

function MovieList({movies} : MovieListProps){
    const list = movies.map(( movie : Movie)=> 
    <MovieItem  key={movie.id} movie={movie} />)
    return(
        <div className={styles['movie-list']}>
            {list}
        </div>
    )
}

export default React.memo(MovieList);