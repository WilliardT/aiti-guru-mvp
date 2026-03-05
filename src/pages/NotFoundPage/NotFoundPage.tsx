import { type FC } from 'react';

const NotFoundPage: FC = () => {
  return (
    <main className="appLayout">
      <section className="appNotFoundCard">
        <p className="appNotFoundCode">404</p>
        <h1 className="appNotFoundTitle">Страница не найдена</h1>
        <p className="appNotFoundText">
          Проверьте адрес страницы или вернитесь позже.
        </p>
      </section>
    </main>
  );
};

export default NotFoundPage;
