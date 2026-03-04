import {
  type ChangeEvent,
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  AllCommunityModule,
  ModuleRegistry,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useAppDispatch, useAppSelector } from '@core/store/hooks.ts';
import { getProductsThunk } from '../../store/thunk/ProductsModuleThunk.ts';
import {
  PRODUCTS_PAGE_SIZE,
  PRODUCTS_SEARCH_DEBOUNCE_MS,
} from '../../constants/constants.ts';
import {
  selectProducts,
  selectProductsError,
  selectProductsLoading,
  selectProductsTotal,
} from '../../selectors/selectors.ts';
import type { IProduct } from '../../interfaces/types.ts';
import ProductsPagination from '../ProductsPagination/ProductsPagination.tsx';
import {
  getProductsColumnDefs,
  productsGridConfig,
} from './config/tableConfig.tsx';
import styles from './ProductsList.module.scss';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

// инициализация AG Grid в модульном режиме
// удобно вынести в main.tsx, чтобы регистрировать глобально один раз для всего приложения
ModuleRegistry.registerModules([AllCommunityModule]);

const ProductsList: FC = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectProductsLoading);
  const totalProducts = useAppSelector(selectProductsTotal);
  const requestError = useAppSelector(selectProductsError);

  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(totalProducts / PRODUCTS_PAGE_SIZE));
  const effectivePage = Math.min(currentPage, totalPages);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearchQuery(searchValue.trim());
      setCurrentPage(1);
    }, PRODUCTS_SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchValue]);

  const fetchProducts = useCallback(() => {
    const skip = (effectivePage - 1) * PRODUCTS_PAGE_SIZE;

    dispatch(getProductsThunk({
      limit: PRODUCTS_PAGE_SIZE,
      skip,
      search: searchQuery || undefined,
    }));
  }, [dispatch, effectivePage, searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const columnDefs = useMemo(() => getProductsColumnDefs(styles), []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <h1 className={styles.pageTitle}>Товары</h1>

        <label className={styles.searchField}>
          <span className={styles.searchIcon}>⌕</span>

          <input
            className={styles.searchInput}
            type="text"
            placeholder="Найти"
            value={searchValue}
            onChange={handleSearch}
          />
        </label>
      </header>

      <section className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Все позиции</h2>

          <div className={styles.tableButtons}>
            <button
              className={styles.refreshButton}
              type="button"
              onClick={fetchProducts}
              disabled={isLoading}
              aria-label="Обновить таблицу"
            >
              ↻
            </button>

            <button
              className={styles.addButton}
              type="button"
            >
              <span className={styles.addButtonIcon}>+</span>
              Добавить
            </button>
          </div>
        </div>

        {requestError ? (
          <p className={styles.errorText}>{requestError}</p>
        ) : null}

        <div className={styles.gridWrap}>
          <div className={`ag-theme-quartz ${styles.gridTheme}`}>
            <AgGridReact<IProduct>
              rowData={products}
              columnDefs={columnDefs}
              {...productsGridConfig}
              loading={isLoading}
            />
          </div>
        </div>

        <ProductsPagination
          currentPage={effectivePage}
          totalPages={totalPages}
          totalItems={totalProducts}
          pageSize={PRODUCTS_PAGE_SIZE}
          onPageChange={setCurrentPage}
        />
      </section>
    </div>
  );
};

export default ProductsList;
