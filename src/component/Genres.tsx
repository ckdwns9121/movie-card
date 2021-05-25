import styles from './Genres.module.scss';
type Props={
    genres: string[] | undefined
}

function Genres({genres}:Props){
    const list = genres?.map((item : string)=>
    <div className={styles['genres-item']} key={item}>
        {item}
    </div>
    )
    return(
    <>
       {list}
    </>
    )
}

export default Genres;