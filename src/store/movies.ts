import {createAction} from 'typesafe-actions';


/*
    typesafe-actions 사용하기
    createAction 함수를 반드시 호출해주어야 한다.

*/
const GET_MOVIELIST = 'movies/GET_MOVIELIST';

export const get_movies = createAction(GET_MOVIELIST)(); // 호출해줘야한다.

