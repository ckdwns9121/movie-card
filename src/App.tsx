import './App.scss';

import { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={MovieList} />
          <Route path="/detail/:id?" component={Movie} />
        </Switch>
      </BrowserRouter>
      <Loading />
    </div>
  );
}

export default App;
