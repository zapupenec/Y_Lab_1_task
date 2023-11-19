import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { api } from '../../api';
import { IAuthData, ILoginData } from '../../types';

const login = createAsyncThunk('auth/login', async (loginData: ILoginData, { rejectWithValue }) => {
  try {
    const data = await api.login(loginData);
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const signup = createAsyncThunk(
  'auth/signup',
  async (loginData: ILoginData, { rejectWithValue }) => {
    try {
      const data = await api.signup(loginData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

interface IInitialState {
  authData: IAuthData | null;
  status: 'error' | 'loading' | 'idle';
}

const initialState: IInitialState = {
  authData: null,
  status: 'idle',
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state) => {
      const authData = localStorage.getItem('authData');
      state.authData = authData ? JSON.parse(authData) : null;
    },
    logout: (state) => {
      localStorage.removeItem('authData');
      state.authData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, { payload }: PayloadAction<IAuthData>) => {
        state.authData = payload;
        state.status = 'idle';
        const authData = JSON.stringify(payload);
        localStorage.setItem('authData', authData);
      })
      .addCase(login.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, { payload }: PayloadAction<IAuthData>) => {
        state.authData = payload;
        state.status = 'idle';
        const authData = JSON.stringify(payload);
        localStorage.setItem('authData', authData);
      })
      .addCase(signup.rejected, (state) => {
        state.status = 'error';
      });
  },
});

const selectAuthData = (state: RootState) => state.auth.authData;
const selectStatus = (state: RootState) => state.auth.status;

export const authActions = { ...auth.actions, login, signup };
export const authSelectors = { selectAuthData, selectStatus };
