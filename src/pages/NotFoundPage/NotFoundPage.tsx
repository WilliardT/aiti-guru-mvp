import { type FC } from 'react';
import AppLayout from '@core/components/AppLayout/AppLayout.tsx';

const NotFoundPage: FC = () => {
  return (
    <AppLayout variant="centered">
      <section className="appNotFoundCard">
        <p className="appNotFoundCode">404</p>
        <h1 className="appNotFoundTitle">Страница не найдена</h1>
        <p className="appNotFoundText">
          Проверьте адрес страницы или вернитесь позже.
        </p>
      </section>
    </AppLayout>
  );
};

export default NotFoundPage;
