import './App.scss';
import {BrowserRouter as Router, Switch , Route} from 'react-router-dom';
import {Movie,Home} from './page';

function App() {
  return (
    <Router>
    <Switch>
      <Route path='/' component={Home} exact />
      <Route path='/detail/:id?' component={Movie}  />
    </Switch>
  </Router>
  );
}

export default App;
