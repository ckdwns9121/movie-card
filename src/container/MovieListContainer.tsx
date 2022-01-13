import { useEffect } from 'react';
import styles from './MovieContainer.module.scss';
import MovieList from '../component/MovieList';
import useScroll from '../hooks/useScroll';
//hooks
import { useDispatch, useSelector } from 'react-redux';
import useLoading from '../hooks/useLoading';

//store
import { RootState } from '../store';
import { getMovies } from '../store/movies';

function MovieListContainer() {
  const { movies, loading, page } = useSelector((state: RootState) => state.movie);
  const dispatch = useDispatch();

  const { scrollEnd } = useScroll();
  const { handleLoading } = useLoading();

  useEffect(() => {
    console.log(scrollEnd);
    if (scrollEnd) {
      dispatch(getMovies({ page }));
    }
  }, [scrollEnd]);

  useEffect(() => {
    handleLoading(loading);
  }, [loading]);

  return <div className={styles['container']}>{movies.length !== 0 && <MovieList movies={movies} />}</div>;
}

export default MovieListContainer;
