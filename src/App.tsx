import './App.css';
import { FC, Suspense, lazy, useState } from 'react';
import { AppRoutes } from './core/router/routes.ts';
import {
  hasAuthToken,
  saveAuthToken,
} from '@core/router/helpers/authSession.ts';
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage.tsx'));
const ProductsPage = lazy(() => import('./pages/ProductsPage/ProductsPage.tsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage.tsx'));


const App:FC = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(() => hasAuthToken());

  const handleLogin = (
    token: string,
    rememberMe: boolean
  ) => {
    saveAuthToken(token, rememberMe);

    setIsAuthorized(true);

    navigate(AppRoutes.PRODUCTS, {
      replace: true,
    });
  };

  return (
    <>
      <Suspense fallback={<main className="appLayout" />}>
        <Routes>
          <Route
            path={AppRoutes.ROOT}
            element={
              <Navigate
                to={isAuthorized ? AppRoutes.PRODUCTS : AppRoutes.LOGIN}
                replace
              />
            }
          />

          <Route
            path={AppRoutes.LOGIN}
            element={isAuthorized
              ? <Navigate to={AppRoutes.PRODUCTS} replace />
              : <LoginPage onLogin={handleLogin} />}
          />

          <Route
            path={AppRoutes.PRODUCTS}
            element={isAuthorized
              ? <ProductsPage />
              : <Navigate to={AppRoutes.LOGIN} replace />}
          />

          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </Suspense>

      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default App;
