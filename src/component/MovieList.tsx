import React, { useCallback, useRef } from 'react';
import styles from './MovieList.module.scss';
import { useHistory } from 'react-router-dom';
import { ButtonBase } from '@material-ui/core';
import { WindowScroller, CellMeasurer, CellMeasurerCache, AutoSizer, List, ListRowProps } from 'react-virtualized';

import { Movie } from '../types/Movie';

type MovieItemProps = {
  movie: Movie;
  onLoad?: any;
};
type MovieListProps = {
  movies: Movie[];
};

const cache = new CellMeasurerCache({
  defaultWidth: 50,
  fixedWidth: true,
});

function MovieItem({ movie, onLoad }: MovieItemProps) {
  const history = useHistory();

  const { id, medium_cover_image, title, rating, description_full } = movie;

  const onClickItem = () => {
    history.push(`/detail/${id}`);
  };
  return (
    <ButtonBase className={styles['movie-item']} onClick={onClickItem}>
      <div className={styles['movie-block']}>
        <div className={styles['movie-poster']}>
          <img src={medium_cover_image} alt={title} onLoad={onLoad} />
        </div>
        <div className={styles['movie-title']}>{title}</div>
        <div className={styles['movie-description']}>{description_full}</div>
      </div>
    </ButtonBase>
  );
}

function MovieList({ movies }: any) {
  const list = movies.map((movie: Movie) => <MovieItem key={movie.id} movie={movie} />);
  // const listRef = useRef<List | null>(null);

  // const rowRenderer = ({ index, key, parent, style }: ListRowProps) => {
  //   const movie = movies[index];
  //   return (
  //     <CellMeasurer cache={cache} parent={parent} key={key} columnIndex={0} rowIndex={index}>
  //       {({ measure }) => (
  //         <div style={style}>
  //           <MovieItem movie={movie} onLoad={measure} />
  //         </div>
  //       )}
  //     </CellMeasurer>
  //   );
  // };

  // return (
  //   <WindowScroller>
  //     {({ height, scrollTop, isScrolling, onChildScroll }) => (
  //       <AutoSizer disableHeight>
  //         {({ width }) => {
  //           console.log(width);
  //           return (
  //             <List
  //               ref={listRef}
  //               isScrolling={isScrolling}
  //               onScroll={onChildScroll}
  //               scrollTop={scrollTop}
  //               autoHeight
  //               width={width}
  //               height={height}
  //               rowCount={movies.length}
  //               rowHeight={cache.rowHeight}
  //               rowRenderer={rowRenderer}
  //               list={movies}
  //               deferredMeasurementCache={cache}
  //               style={{ outline: 'none' }}
  //             />
  //           );
  //         }}
  //       </AutoSizer>
  //     )}
  //   </WindowScroller>
  // );
  return <div className={styles['movie-list']}>{list}</div>;
}

export default React.memo(MovieList);
