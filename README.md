# AITI Guru MVP

Клиентское приложение на React + TypeScript для авторизации и работы со списком товаров (таблица, поиск, сортировка, пагинация, локальное добавление товара).

## Стек
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Vite](https://vite.dev/guide/)
- [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started) + [React Redux](https://react-redux.js.org/)
- [React Router](https://reactrouter.com/en/main)
- [AG Grid (React)](https://www.ag-grid.com/react-data-grid/getting-started/)
- [MUI](https://mui.com/material-ui/getting-started/)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction)
- [Axios](https://axios-http.com/docs/intro)
- [Sass](https://sass-lang.com/documentation/)
- [ESLint](https://eslint.org/docs/latest/)

## Быстрый старт
```bash
npm install
npm run dev
```

## Скрипты
- `npm run dev` — запуск dev-сервера
- `npm run build` — type-check + production build
- `npm run preview` — локальный просмотр production build
- `npm run lint` — проверка линтером

## Архитектура (кратко)
- `src/modules/*` — бизнес-модули (`AuthModule`, `ProductsModule`)
- `src/pages/*` — страницы (`LoginPage`, `ProductsPage`, `NotFoundPage`)
- `src/core/*` — store, роутинг-хелперы, общая инфраструктура
- Роутинг реализован через `react-router-dom`

## Данные и API
- Авторизация: [DummyJSON Auth API](https://dummyjson.com/docs/auth)
- Товары загружаются с [DummyJSON Products API](https://dummyjson.com/docs/products)
- Поиск выполняется через `/products/search`
- Добавление товара в UI локальное (без POST-запроса)
