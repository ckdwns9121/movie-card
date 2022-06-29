import React, { MouseEvent } from "react";
import styles from "./MovieList.module.scss";
import { useNavigate, Link } from "react-router-dom";
import { ButtonBase } from "@material-ui/core";

import { Movie } from "../../types/Movie";
import Image from "../Image/Image";

interface MovieItemProps {
  movie: Movie;
  onLoad?: any;
}
function MovieItem({ movie }: MovieItemProps) {
  const { id, medium_cover_image, title, description_full } = movie;

  return (
    <Link to={`/detail/${id}`} className={styles["movie-link"]}>
      <ButtonBase className={styles["movie-item"]}>
        <div className={styles["movie-block"]}>
          <div className={styles["movie-poster"]}>
            <Image src={medium_cover_image} alt={title} />
          </div>
          <div className={styles["movie-title"]}>{title}</div>
          <div className={styles["movie-description"]}>{description_full}</div>
        </div>
      </ButtonBase>
    </Link>
  );
}

function MovieList({ movies }: any) {
  const list = movies.map((movie: Movie) => <MovieItem key={movie.id} movie={movie} />);
  let navigate = useNavigate();

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    console.log("hello");
  };
  return (
    <div className={styles["movie-list"]} onClick={onClick}>
      {list}
    </div>
  );
}

export default React.memo(MovieList);
