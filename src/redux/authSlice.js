import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: null,
  userType: null,
  userId: null,
  isLoading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.token = action.payload.token;
      state.userType = action.payload.userType;
      state.userId = action.payload.userId;
      state.error = null;
    },
    loginFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload.error.message || action.payload.error;
    },

    logout(state) {
      state.token = null;
      state.userType = null;
      state.userId = null;
      state.isLoading = false;
      state.error = null;
    }

  }
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;

export const login = (email, password) => async dispatch => {
  dispatch(loginRequest());
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password
    });
    const { token, userId,userType } = response.data;
    console.log(response.data)
    dispatch(loginSuccess({ token, userType, userId }));
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId); 
  } catch (error) {
    dispatch(loginFailure({ error: error.message }));
  }
};

export default authSlice.reducer;
