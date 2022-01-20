import { useEffect, useState } from 'react';
import styles from '../component/MovieList.module.scss';
import MovieList from '../component/MovieList';
import { useQuery, useInfiniteQuery } from 'react-query';

import { getMoviesAPI } from '../api/movie';

import Loading from '../component/Loading';
import useScroll from '../hooks/useScroll';
function MovieListContainer() {
  const { scrollEnd } = useScroll();
  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    ...result
  } = useInfiniteQuery('movies', ({ pageParam = 1 }) => getMoviesAPI(pageParam), {
    getNextPageParam: (lastPage, pages) => {
      return pages.length + 1;
    },
  });

  useEffect(() => {
    console.log(scrollEnd);
    if (scrollEnd) {
      fetchNextPage();
    }
  }, [scrollEnd]);
  if (isLoading) return <Loading loading={isLoading} />;
  if (error) return <>An error has occurred</>;
  return (
    <div className={styles['container']}>
      {data?.pages.map((movies, i) => {
        return <MovieList key={i} movies={movies} />;
      })}
      <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
        {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
      </button>
    </div>
  );
}

export default MovieListContainer;
