import axios from 'axios';
import type {
  IAuthApiError,
  IAuthCredentials,
  IAuthResponse,
} from '../interfaces/types.ts';
import { AUTH_URL } from "@modules/AuthModule/constants/constants.ts";


export const signInApi = async (
  credentials: IAuthCredentials,
): Promise<IAuthResponse> => {
  try {
    const response = await axios.post<IAuthResponse>(AUTH_URL, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data as IAuthApiError | undefined;

      throw new Error(apiError?.message ?? 'Не удалось выполнить вход');
    }

    throw new Error('Не удалось выполнить вход');
  }
};
