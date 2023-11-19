import { FC } from 'react';
import { Navigate, Outlet, PathRouteProps } from 'react-router-dom';
import { useAuth } from '../hooks';
import { routes } from '../routes';

interface IPrivateRoute extends PathRouteProps {
  hasAccess?: boolean;
}

export const PrivateRoute: FC<IPrivateRoute> = ({ hasAccess = false }) => {
  const { authData } = useAuth();

  if (hasAccess) {
    return authData ? <Navigate to={routes.pages.main} /> : <Outlet />;
  }

  return authData ? <Outlet /> : <Navigate to={routes.pages.root} />;
};
