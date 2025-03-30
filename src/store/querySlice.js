import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentQuery: '',
  queryHistory: [],
  results: null,
  loading: false,
  error: null,
  suggestions: [
    'Show me sales trends for last quarter',
    'Compare revenue by region',
    'What are the top performing products?',
    'Analyze customer satisfaction ratings'
  ]
};

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setCurrentQuery: (state, action) => {
      state.currentQuery = action.payload;
    },
    addToHistory: (state, action) => {
      state.queryHistory.unshift(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCurrentQuery, addToHistory, setLoading, setResults, setError } = querySlice.actions;

export default querySlice.reducer;