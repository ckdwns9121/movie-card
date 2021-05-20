import styles from './MovieList.module.scss';
import {Movie} from '../container/HomeContainer';


interface MovieItem{
    movie : Movie;
}

interface MovieList{
    movies : Movie[]
}

function MovieItem ( {movie} : MovieItem){

    const {id, medium_cover_image,title,rating} = movie;
    return(
        <div className={styles['movie-item']}>
           {title}
        </div>
    )
}
function MovieList({movies} : MovieList){

    const list = movies.map((movie)=> 
    <MovieItem  key={movie.id} movie={movie} />)
    return(
        <div className={styles['movie-list']}>
            {list}
        </div>
    )
}

export default MovieList;