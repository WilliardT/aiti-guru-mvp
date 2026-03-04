import { type FC, useMemo } from 'react';
import styles from './ProductsPagination.module.scss';


interface IProductsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const getPageButtons = (page: number, totalPages: number): number[] => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const startPage = Math.min(
    Math.max(1, page - 2),
    totalPages - 4,
  );

  return Array.from({ length: 5 }, (_, index) => startPage + index);
};

const ProductsPagination: FC<IProductsPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  const effectivePage = Math.min(currentPage, totalPages);

  const rangeStart = totalItems === 0
    ? 0
    : ((effectivePage - 1) * pageSize) + 1;

  const rangeEnd = totalItems === 0
    ? 0
    : Math.min(effectivePage * pageSize, totalItems);

  const pages = useMemo(
    () => getPageButtons(effectivePage, totalPages),
    [effectivePage, totalPages],
  );

  return (
    <footer className={styles.pagination}>
      <p className={styles.paginationMeta}>
        Показано {rangeStart}-{rangeEnd} из {totalItems}
      </p>

      <div className={styles.paginationButtons}>
        <button
          className={styles.paginationArrow}
          type="button"
          onClick={() => onPageChange(Math.max(1, effectivePage - 1))}
          disabled={effectivePage === 1}
          aria-label="Предыдущая страница"
        >
          ‹
        </button>

        {pages.map((page) => (
          <button
            key={page}
            className={`${styles.paginationButton} ${page === effectivePage ? styles.paginationButtonActive : ''}`}
            type="button"
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className={styles.paginationArrow}
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, effectivePage + 1))}
          disabled={effectivePage === totalPages}
          aria-label="Следующая страница"
        >
          ›
        </button>
      </div>
    </footer>
  );
};

export default ProductsPagination;
