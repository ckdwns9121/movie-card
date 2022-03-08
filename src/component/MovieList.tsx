import React from 'react';
import styles from './MovieList.module.scss';
import { useNavigate } from 'react-router-dom';
import { ButtonBase } from '@material-ui/core';

import { Movie } from '../types/Movie';

interface MovieItemProps {
  movie: Movie;
  onLoad?: any;
}
function MovieItem({ movie }: MovieItemProps) {
  let navigate = useNavigate();

  const { id, medium_cover_image, title, description_full } = movie;

  const onClickItem = () => {
    navigate(`/detail/${id}`);
  };
  return (
    <ButtonBase className={styles['movie-item']} onClick={onClickItem}>
      <div className={styles['movie-block']}>
        <div className={styles['movie-poster']}>
          <img src={medium_cover_image} alt={title} />
        </div>
        <div className={styles['movie-title']}>{title}</div>
        <div className={styles['movie-description']}>{description_full}</div>
      </div>
    </ButtonBase>
  );
}

function MovieList({ movies }: any) {
  const list = movies.map((movie: Movie) => <MovieItem key={movie.id} movie={movie} />);
  return <div className={styles['movie-list']}>{list}</div>;
}

export default React.memo(MovieList);
