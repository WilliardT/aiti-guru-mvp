import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import type { ReactElement } from 'react';
import type { IProduct } from '../../../interfaces/types.ts';
import { formatPrice, formatRating } from '../../../helpers/helpersInputs.ts';


const renderNameCell = (
  params: ICellRendererParams<IProduct>,
  styles: Record<string, string>,
): ReactElement | null => {
  const { data } = params;

  if (!data) {
    return null;
  }

  return (
    <div className={styles.nameCell}>
      <div className={styles.nameImageWrap}>
        <img
          className={styles.nameImage}
          src={data.thumbnail}
          alt={data.title}
          loading="lazy"
        />
      </div>

      <div className={styles.nameText}>
        <p className={styles.nameTitle}>{data.title}</p>
        <p className={styles.nameCategory}>{data.category}</p>
      </div>
    </div>
  );
};

const renderRatingCell = (
  params: ICellRendererParams<IProduct>,
  styles: Record<string, string>,
): ReactElement | null => {
  const { data } = params;

  if (!data) {
    return null;
  }

  const isLowRating = data.rating < 4;

  return (
    <span className={`${styles.ratingValue} ${isLowRating ? styles.ratingValueLow : ''}`}>
      {formatRating(data.rating)}
      <span className={styles.ratingDivider}>/5</span>
    </span>
  );
};

const renderPriceCell = (
  params: ICellRendererParams<IProduct>,
  styles: Record<string, string>,
): ReactElement | null => {
  const { data } = params;

  if (!data) {
    return null;
  }

  return <span className={styles.priceValue}>{formatPrice(data.price)}</span>;
};

const renderActionsCell = (
  styles: Record<string, string>,
): ReactElement => {
  return (
    <div className={styles.actionsCell}>
      <button
        className={styles.actionPrimary}
        type="button"
        aria-label="Добавить товар"
      >
        +
      </button>

      <button
        className={styles.actionGhost}
        type="button"
        aria-label="Дополнительные действия"
      >
        ...
      </button>
    </div>
  );
};

export const getProductsColumnDefs = (styles: Record<string, string>): ColDef<IProduct>[] => {
  return [
    {
      width: 56,
      maxWidth: 56,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      resizable: false,
      sortable: false,
      pinned: 'left',
    },
    {
      headerName: 'Наименование',
      field: 'title',
      minWidth: 380,
      flex: 1.6,
      cellRenderer: (params: ICellRendererParams<IProduct>) => renderNameCell(params, styles),
    },
    {
      headerName: 'Вендор',
      field: 'brand',
      minWidth: 170,
      flex: 0.8,
      cellClass: styles.vendorValue,
      valueGetter: ({ data }) => data?.brand ?? 'Без бренда',
    },
    {
      headerName: 'Артикул',
      field: 'sku',
      minWidth: 180,
      flex: 0.9,
      valueGetter: ({ data }) => data?.sku ?? `SKU-${data?.id ?? ''}`,
      cellClass: styles.skuValue,
    },
    {
      headerName: 'Оценка',
      field: 'rating',
      minWidth: 140,
      flex: 0.7,
      cellRenderer: (params: ICellRendererParams<IProduct>) => renderRatingCell(params, styles),
    },
    {
      headerName: 'Цена, ₽',
      field: 'price',
      minWidth: 170,
      flex: 0.8,
      cellRenderer: (params: ICellRendererParams<IProduct>) => renderPriceCell(params, styles),
    },
    {
      width: 150,
      minWidth: 150,
      maxWidth: 150,
      sortable: false,
      cellRenderer: () => renderActionsCell(styles),
      suppressHeaderMenuButton: true,
      headerName: '',
    },
  ];
};

export const productsGridConfig = {
  rowSelection: 'multiple' as const,
  rowHeight: 68,
  headerHeight: 56,
  suppressCellFocus: true,
  suppressRowClickSelection: true,
  animateRows: true,
  overlayLoadingTemplate: "<span class='ag-overlay-loading-center'>Загрузка...</span>",
  overlayNoRowsTemplate: "<span class='ag-overlay-loading-center'>Ничего не найдено</span>",
};
