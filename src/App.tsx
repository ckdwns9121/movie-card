import './App.scss';

import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Movie, MovieList } from './page';
import { useDispatch } from 'react-redux';

//components
import Loading from './component/Loading';
import { getMovies } from './store/movies';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies({ page: 1 }));
  }, []);

  return (
    <div className="App">
      <Router basename="movie-card">
        <Switch>
          <Route path="/" component={MovieList} exact />
          <Route path="/detail/:id?" component={Movie} />
        </Switch>
      </Router>
      <Loading />
    </div>
  );
}

export default App;
