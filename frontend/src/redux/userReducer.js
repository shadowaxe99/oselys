import { createSlice } from '@reduxjs/toolkit';

// Initial state for the user slice
const initialState = {
  authToken: null,
  userProfile: null,
  loading: false,
  error: null,
};

// Slice for user operations
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.authToken = action.payload.authToken;
      state.userProfile = action.payload.userProfile;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.authToken = null;
      state.userProfile = null;
      state.loading = false;
      state.error = null;
    },
    updateProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.userProfile = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export the actions
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
} = userSlice.actions;

// Export the reducer
export default userSlice.reducer;