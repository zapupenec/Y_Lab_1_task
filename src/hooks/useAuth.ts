import { useAppDispatch, useAppSelector } from '../store';
import { authActions, authSelectors } from '../store/slices';
import { ILoginData } from '../types';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  return {
    authData: useAppSelector(authSelectors.selectAuthData),
    logIn: (loginData: ILoginData) => dispatch(authActions.login(loginData)).unwrap(),
    signUp: (loginData: ILoginData) => dispatch(authActions.signup(loginData)).unwrap(),
    logOut: () => dispatch(authActions.logout()),
  };
};
