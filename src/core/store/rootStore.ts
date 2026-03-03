import { configureStore } from '@reduxjs/toolkit';
import { rootReducer as reducer } from './rootReducer';


export const rootStore = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;
