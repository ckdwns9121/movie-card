import './App.scss';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Movie, MovieList } from './page';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/" component={MovieList} />
            <Route path="/detail/:id?" component={Movie} />
          </Switch>
          <ReactQueryDevtools initialIsOpen={false} />
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
