import './App.css';
import { FC, useEffect, useMemo, useState } from 'react';
import { AppRoutes } from './core/router/routes.ts';
import { navigateTo } from './core/router/navigation.ts';
import {
  hasAuthToken,
  saveAuthToken,
} from '@core/router/helpers/authSession.ts';
import { usePathname } from '@core/router/helpers/usePathname.ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import ProductsPage from './pages/ProductsPage/ProductsPage.tsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.tsx';

const knownRoutes = new Set<string>([
  AppRoutes.ROOT,
  AppRoutes.LOGIN,
  AppRoutes.PRODUCTS,
]);


const App:FC = () => {
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(() => hasAuthToken());

  const handleLogin = (
    token: string,
    rememberMe: boolean
  ) => {
    saveAuthToken(token, rememberMe);

    setIsAuthorized(true);

    navigateTo(AppRoutes.PRODUCTS);
  };

  useEffect(() => {
    if (pathname === AppRoutes.ROOT) {
      navigateTo(isAuthorized ? AppRoutes.PRODUCTS : AppRoutes.LOGIN, true);

      return;
    }

    if (!isAuthorized && pathname === AppRoutes.PRODUCTS) {
      navigateTo(AppRoutes.LOGIN, true);

      return;
    }

    if (isAuthorized && pathname === AppRoutes.LOGIN) {
      navigateTo(AppRoutes.PRODUCTS, true);
    }
  }, [isAuthorized, pathname]);


  const page = useMemo(() => {
    if (pathname === AppRoutes.LOGIN) {
      if (isAuthorized) {
        return null;
      }

      return <LoginPage onLogin={handleLogin} />;
    }

    if (pathname === AppRoutes.PRODUCTS) {
      if (!isAuthorized) {
        return null;
      }

      return <ProductsPage />;
    }

    if (!knownRoutes.has(pathname)) {
      return <NotFoundPage />;
    }

    return <NotFoundPage />;
  }, [pathname, isAuthorized]);


  return (
    <>
      {page}

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
