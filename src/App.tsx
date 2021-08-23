import {useEffect} from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch , Route} from 'react-router-dom';
import {Movie,MovieList} from './page';

//components
import Loading from './component/Loading';
//hooks
import {useDispatch,useSelector} from 'react-redux';
import useLoading from './hooks/loading';

//store
import {RootState,useAppSelector} from './store';
import {getMovies} from './store/movies';

function App() {

  const {loading} = useSelector((state:RootState)=>state.movie);
  const dispatch = useDispatch();
  const {handleLoading} = useLoading();

    useEffect(()=>{
      dispatch(getMovies());
  },[dispatch])

  useEffect(()=>{
      handleLoading(loading);
    },[loading])

  return (
    <div className='App'>
    <Router>
      <Switch>
        <Route path='/' component={MovieList} exact />
        <Route path='/detail/:id?' component={Movie}  />
      </Switch>
    </Router>
    <Loading/>
    </div>
  
  );
}

export default App;
