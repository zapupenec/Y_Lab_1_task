import axios, { AxiosError } from 'axios';
import { routes } from '../routes';
import { IAuthData, ILoginData } from '../types';

export const instanceOfApiError = (object: any): object is AxiosError<any, any> => {
  return object instanceof Error && 'config' in object && 'isAxiosError' in object;
};

const login = async (loginData: ILoginData): Promise<IAuthData> => {
  const { data } = await axios.post(routes.api.auth, loginData);
  return data;
};

const signup = async (loginData: ILoginData): Promise<IAuthData> => {
  const { data } = await axios.post(routes.api.signup, loginData);
  return data;
};

export const api = {
  login,
  signup,
};
