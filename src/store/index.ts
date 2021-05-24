import {combineReducers} from 'redux';
import movie,{movie_saga} from './movies';
import loading from './loading';

import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({movie,loading});

export function *rootSaga(){
    yield all([movie_saga()]);
}
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>