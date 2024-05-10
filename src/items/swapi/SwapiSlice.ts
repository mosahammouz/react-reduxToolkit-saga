import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Person {
  name: string;
  gender: string;
  height: string;
  eye_color: string;
  url: string;
}

interface PeopleState {
  loading: boolean;
  data: Person[];
  error: string;
  currentPage: number;
  searchTerm: string;
}

const initialState: PeopleState = {
  loading: false,
  data: [],
  error: "",
  currentPage: 1,
  searchTerm: '',
};

const swapiSlice = createSlice({
  name: 'swapi',
  initialState,
  reducers: {
    fetchPeopleRequest(state, action: PayloadAction<{ currentPage: number; searchTerm: string }>) {
      state.loading = true;
      state.error = "";
      state.currentPage = action.payload.currentPage;
      state.searchTerm = action.payload.searchTerm;
    },
    fetchPeopleSuccess(state, action: PayloadAction<Person[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchPeopleFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchPeopleRequest, fetchPeopleSuccess, fetchPeopleFailure } = swapiSlice.actions;

export const selectSwapiState = (state: RootState) => state.swapi;

const swapiReducer = swapiSlice.reducer;
export default swapiReducer;
