import MovieList from '../component/MovieList';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import BottomModal from '../component/BottomModal';

function MovieListContainer() {
  const { movies } = useSelector((state: RootState) => state.movie);

  return <>{movies.length !== 0 && <MovieList movies={movies} />}</>;
}

export default MovieListContainer;
