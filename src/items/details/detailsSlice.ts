// DetailsPageSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import axios from 'axios';

interface DetailsPageState {
  personData: Person2 | null;
  films: Film[];
  loading: boolean;
  error: string | null;
}

interface Person2 {
  name: string;
  gender: string;
  hair_color: string;
  created: string;
  height: string;
  films: string[]; // Array of film URLs
}

interface Film {
  title: string;
  director: string;
  release_date: string;
}

const initialState: DetailsPageState = {
  personData: null,
  films: [],
  loading: false,
  error: null,
};

const detailsPageSlice = createSlice({
  name: 'detailsPage',
  initialState,
  reducers: {
    fetchPersonDataRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPersonDataSuccess: (state, action: PayloadAction<Person2>) => {
      state.loading = false;
      state.personData = action.payload;
    },
    fetchPersonDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchFilmsDataRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFilmsDataSuccess: (state, action: PayloadAction<Film[]>) => {
      state.loading = false;
      state.films = action.payload;
    },
    fetchFilmsDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPersonDataRequest,
  fetchPersonDataSuccess,
  fetchPersonDataFailure,
  fetchFilmsDataRequest,
  fetchFilmsDataSuccess,
  fetchFilmsDataFailure,
} = detailsPageSlice.actions;

export const selectDetailsPage = (state: { detailsPage: DetailsPageState }) => state.detailsPage;

export const fetchPersonData = (id: string): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchPersonDataRequest());
    const response = await axios.get<Person2>(`https://swapi.dev/api/people/${id}/`);
    dispatch(fetchPersonDataSuccess(response.data));

    dispatch(fetchFilmsDataRequest());
    const filmRequests = response.data.films.map((filmUrl) => axios.get<Film>(filmUrl));
    const filmResponses = await Promise.all(filmRequests);
    const filmData = filmResponses.map((response) => response.data);
    dispatch(fetchFilmsDataSuccess(filmData));
  } catch (error) {
    dispatch(fetchPersonDataFailure("error.message"));
    dispatch(fetchFilmsDataFailure("error.message"));
  }
};

export default detailsPageSlice.reducer;
