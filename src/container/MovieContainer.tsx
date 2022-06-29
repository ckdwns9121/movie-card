//hooks
import { useState, useEffect, useRef } from "react";
import styles from "./MovieContainer.module.scss";
import { useQuery } from "react-query";
import { Movie } from "../types/Movie";
//api
import { getMovieAPI } from "../api/movie";

import Loading from "../component/Loading/Loading";

interface Props {
  id: string;
}

interface data extends Movie {
  background_image: string;
  background_image_original: string;
  date_uploaded: string;
  date_uploaded_unix: number;
  description_intro: string;
  download_count: number;
  genres: string[] | undefined;
  imdb_code: string;
  language: string;
  large_cover_image: string;
  like_count: number;
  mpa_rating: string;
  runtime: number;
  slug: string;
  small_cover_image: string;
  title_english: string;
  title_long: string;
  torrents: object[];
  url: string;
  year: number;
  yt_trailer_code: string;
}
function MovieContainer({ id }: Props) {
  const [height, setHeight] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const { isLoading, data, error } = useQuery(["movie", id], () => getMovieAPI(id));
  const state = data;
  const scrollControl = () => {
    let scroll = window.scrollY;
    setHeight(scroll);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", scrollControl);
    return () => window.removeEventListener("scroll", scrollControl);
  }, []);

  if (isLoading) return <Loading loading={isLoading} />;
  if (error) return <>An error has occurred</>;

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["content"]}>
          <div className={styles["movie-poster"]}>
            <img src={state?.large_cover_image} alt={state?.title} />
          </div>
          <div className={styles["mobile-wrap"]}>
            <div
              className={styles["mobile-movie-poster"]}
              style={{
                backgroundImage: `url(${state?.large_cover_image})`,
                transform: `translate3d(0%,${height / 100}% ,0) scale(${100 + height / 2 / 10}%)`,
                filter: `blur(${height / 100}px)`,
              }}
            />
          </div>

          <div className={styles["movie-content"]}>
            <div className={styles["movie-title"]} onClick={() => setOpen(!open)}>
              {state?.title_long}
            </div>
            <div className={styles["movie-descript"]}>
              {state?.description_full}
              {state?.description_full}

              {state?.description_full}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieContainer;
