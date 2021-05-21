import './App.scss';
import {BrowserRouter as Router, Switch , Route} from 'react-router-dom';
import {Movie,MovieList} from './page';

function App() {
  return (
    <div className='App'>
    <Router>
      <Switch>
        <Route path='/' component={MovieList} exact />
        <Route path='/detail/:id?' component={Movie}  />
      </Switch>
    </Router>
    </div>
  
  );
}

export default App;
