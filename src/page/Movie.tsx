import MovieContainer from '../container/MovieContainer';
import {RouteComponentProps} from 'react-router-dom';

interface MatchParams{
    id: string
}

function Movie({match} :RouteComponentProps<MatchParams>){
    const {id}= match.params;
    return(
        <MovieContainer id={id}/>
    )
}

export default Movie;