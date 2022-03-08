import './App.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Movie, MovieList } from './page';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/detail/:id" element={<Movie />} />
          </Routes>
          <ReactQueryDevtools initialIsOpen={process.env.NODE_ENV === 'development'} />
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
