import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import movie, { movie_saga, RooteState } from './movies';
import loading from './loading';
import counter from './counter';

import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({ movie, loading, counter });

export function* rootSaga() {
  yield all([movie_saga()]);
}
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RooteState> = useSelector;
