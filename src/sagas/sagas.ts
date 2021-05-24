import { takeEvery, call, put } from 'redux-saga/effects'

import { fetchEmployees } from '../api/employee'

function* fetch() {
 
}

export default function* sagas() {
  yield takeEvery("EMPLOYEES_FETCH_REQUEST", fetch)
}