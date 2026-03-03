import './App.css';
import { FC, useEffect, useMemo, useState } from 'react';
import { AUTH_STORAGE_KEY, AppRoutes } from './core/router/routes.ts';
import { navigateTo } from './core/router/navigation.ts';
import { usePathname } from '@core/router/helpers/usePathname.ts';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import ProductsPage from './pages/ProductsPage/ProductsPage.tsx';


const App:FC = () => {
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(
    window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true',
  );

  const handleLogin = () => {
    setIsAuthorized(true);

    window.localStorage.setItem(AUTH_STORAGE_KEY, 'true');

    navigateTo(AppRoutes.PRODUCTS);
  };

  useEffect(() => {
    if (!isAuthorized && pathname !== AppRoutes.LOGIN) {
      navigateTo(AppRoutes.LOGIN, true);

      return;
    }

    if (isAuthorized && (pathname === AppRoutes.ROOT || pathname === AppRoutes.LOGIN)) {
      navigateTo(AppRoutes.PRODUCTS, true);
    }
  }, [isAuthorized, pathname]);


  const page = useMemo(() => {
    if (pathname === AppRoutes.LOGIN) {
      return <LoginPage onLogin={handleLogin} />;
    }

    if (pathname === AppRoutes.PRODUCTS && isAuthorized) {
      return <ProductsPage />;
    }

    return null;
  }, [pathname, isAuthorized]);


  return page;
}

export default App;
