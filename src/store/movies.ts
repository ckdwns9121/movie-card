import { createAction, ActionType, createReducer, createAsyncAction } from 'typesafe-actions';
import { takeEvery, call, put, delay } from 'redux-saga/effects';
import { Movie } from '../types/Movie';
import * as api from '../api/movie';

const GET_MOVIES = 'movies/GET_MOVIES' as const;
const GET_MOVIES_SUCCESS = 'moives/GET_MOIVES_SUCCESS' as const;
const GET_MOVIES_ERROR = 'movies/GET_MOVIES_ERROR' as const;

export const getMovies = createAction(GET_MOVIES)<any>();
export const getMoviesSuccess = createAction(GET_MOVIES_SUCCESS)<any>();
export const getMoviesError = createAction(GET_MOVIES_ERROR)<any | null>();

const actions = {
  getMovies,
  getMoviesSuccess,
  getMoviesError,
};

type Actions = ActionType<typeof actions>;

type Response = {
  data: any;
};

type State = {
  movies: Movie[];
  loading: boolean;
  error: boolean;
  page: number;
};

const initState: State = {
  movies: [],
  loading: false,
  error: false,
  page: 1,
};

function* get_movies_saga(action: any) {
  try {
    const { page } = action.payload;
    const res: Response = yield api.requestGetMovieList(page);
    console.log(res);
    if (res?.data?.data) {
      yield put({
        type: GET_MOVIES_SUCCESS,
        payload: res.data.data.movies,
      });
    }
  } catch (e) {
    yield put({
      type: GET_MOVIES_ERROR,
      payload: e,
    });
  }
}

export function* movie_saga() {
  yield takeEvery(GET_MOVIES, get_movies_saga);
}

const movie = createReducer<State, Actions>(initState, {
  [GET_MOVIES]: (state, action) => {
    return {
      ...state,
      loading: true,
      error: false,
    };
  },
  [GET_MOVIES_SUCCESS]: (state, action) => {
    return {
      ...state,
      movies: state.movies.concat(action.payload),
      loading: false,
      error: false,
      page: state.page + 1,
    };
  },
  [GET_MOVIES_ERROR]: (state, action) => {
    return {
      ...state,
      movies: [],
      loading: false,
      error: false,
    };
  },
});

export type RooteState = ReturnType<typeof movie>;
export default movie;
