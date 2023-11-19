import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Auth, Main, NotFound, PrivateRoute, Signup } from './pages';
import { routes } from './routes';
import { useAppDispatch } from './store';
import { authActions } from './store/slices';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authActions.setAuthData());
  }, [dispatch]);

  return (
    <Routes>
      <Route path={routes.pages.root} element={<PrivateRoute hasAccess />}>
        <Route path={routes.pages.root} element={<Auth />} />
        <Route path={routes.pages.signup} element={<Signup />} />
      </Route>
      <Route path={routes.pages.root} element={<PrivateRoute />}>
        <Route path={routes.pages.main} element={<Main />} />
      </Route>
      <Route path={routes.pages.notFound} element={<NotFound />} />
      <Route path="*" element={<Navigate to={routes.pages.notFound} />} />
    </Routes>
  );
}

export default App;
