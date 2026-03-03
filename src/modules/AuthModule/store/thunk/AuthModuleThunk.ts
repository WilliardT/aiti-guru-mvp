import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthModuleTypes } from './ActionTypes.ts';

export const signInThunk = createAsyncThunk(AuthModuleTypes.SIGN_IN, async () => {
  return true;
});
