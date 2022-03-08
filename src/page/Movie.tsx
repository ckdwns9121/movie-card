import MovieContainer from '../container/MovieContainer';
import { useParams } from 'react-router-dom';

function Movie() {
  const params = useParams();
  const { id } = params;
  return <MovieContainer id={typeof id === 'string' ? id : '0'} />;
}

export default Movie;
