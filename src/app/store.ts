import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import swapiReducer from '../items/swapi/SwapiSlice';
import searchReducer from '../items/search/SearchSlice';
import detailsReducer from "../items/details/detailsSlice"
import createSagaMiddleware from 'redux-saga';
import { watchFetchPeople } from '../saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    swapi: swapiReducer,
    search: searchReducer,
    details : detailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchFetchPeople);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
