import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { fetchPeopleFailure, fetchPeopleRequest, fetchPeopleSuccess } from './items/swapi/SwapiSlice';

export function* fetchPeopleSaga(action: PayloadAction<{ currentPage: number; searchTerm: string }>): Generator<any, void, any> {
  try {
    const { currentPage, searchTerm } = action.payload;
    const response = yield call(axios.get, `https://swapi.dev/api/people/?page=${currentPage}&search=${searchTerm}`);
    yield put(fetchPeopleSuccess(response.data.results));
  } catch (error) {
    const errorMessage = String(error);
    yield put(fetchPeopleFailure(errorMessage));
  }
}

export  function* watchFetchPeople() {
  yield takeLatest(fetchPeopleRequest.type, fetchPeopleSaga);
}
export default watchFetchPeople;