import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  token: localStorage.getItem('token') || sessionStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('currentUser', JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.currentUser = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice;