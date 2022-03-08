import MovieContainer from '../container/MovieContainer';
import { useParams } from 'react-router-dom';

function Movie() {
  const { id } = useParams<string>();
  if (id) {
    return <MovieContainer id={id} />;
  } else {
    return <div>Error</div>;
  }
}

export default Movie;
