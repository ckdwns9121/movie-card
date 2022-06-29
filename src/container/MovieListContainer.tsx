import { useEffect, useState } from "react";
import styles from "./MovieContainer.module.scss";
import MovieList from "../component/Movies/MovieList";
import { useQuery, useInfiniteQuery } from "react-query";

import { getMoviesAPI } from "../api/movie";

import Loading from "../component/Loading/Loading";

import useScroll from "../hooks/useScroll";
function MovieListContainer() {
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
  } = useInfiniteQuery("movies", ({ pageParam = 1 }) => getMoviesAPI(pageParam), {
    getNextPageParam: (lastPage, pages) => {
      return pages.length + 1;
    },
  });

  const { scrollEnd } = useScroll();

  useEffect(() => {
    if (scrollEnd) {
      fetchNextPage();
    }
  }, [scrollEnd]);
  if (isLoading) return <Loading loading={isLoading} />;
  if (error) return <>An error has occurred</>;
  return (
    <div className={styles["container"]}>
      {data?.pages.map((movies, i) => {
        return <MovieList key={i} movies={movies} />;
      })}
      <div className={styles["loading"]}>{isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load More" : "Nothing more to load"}</div>
    </div>
  );
}

export default MovieListContainer;
