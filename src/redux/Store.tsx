import { configureStore } from '@reduxjs/toolkit';
import authReducer from './feature/auth/authSlice';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  }
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
