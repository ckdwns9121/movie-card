import styles from './MovieList.module.scss';
import {useHistory} from 'react-router-dom';
export type Movie = {
    id : number,
    medium_cover_image : string,
    title: string,
    description_full:string,
    rating : number,
}

interface MovieItemProps{
    movie : Movie;
}
interface MovieListProps{
    movies : Movie[]
}

function MovieItem ( {movie} : MovieItemProps){

    const history = useHistory();
    const {id, medium_cover_image,title,description_full,rating} = movie;

    const onClickItem =()=>{
        history.push(`/detail/${id}`);
    }
    return(
        <div className={styles['movie-item']} onClick={onClickItem}>
            <div className={styles['movie-poster']}>
                <img src={medium_cover_image} alt={title}/>
            </div>
            <div className={styles['movie-title']}>
                {title}
            </div>
            <div className={styles['movie-description']}>
                {description_full}
            </div>
        </div>
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

export default MovieList;