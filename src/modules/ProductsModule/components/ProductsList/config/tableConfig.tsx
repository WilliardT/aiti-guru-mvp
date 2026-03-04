import type {
  ColDef,
  GetRowIdParams,
  GridOptions,
  ICellRendererParams,
  MultiRowSelectionOptions,
} from 'ag-grid-community';
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

  const formattedPrice = formatPrice(data.price);
  const [priceWhole, priceFraction] = formattedPrice.split(',');

  if (!priceFraction) {
    return <span className={styles.priceValue}>{formattedPrice}</span>;
  }

  return (
    <span className={styles.priceValue}>
      {priceWhole},
      <span className={styles.priceFraction}>{priceFraction}</span>
    </span>
  );
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
      cellRenderer: () => renderActionsCell(styles),
      suppressHeaderMenuButton: true,
      headerName: '',
    },
  ];
};

export const productsDefaultColDef: ColDef<IProduct> = {
  sortable: false,
  resizable: false,
};

const productsRowSelection: MultiRowSelectionOptions<IProduct> = {
  mode: 'multiRow',
  checkboxes: true,
  headerCheckbox: true,
  enableClickSelection: false,
};

export const getProductsRowId = ({
  data,
}: GetRowIdParams<IProduct>): string => String(data.id);

export const productsGridConfig: Pick<
  GridOptions<IProduct>,
  | 'rowSelection'
  | 'rowHeight'
  | 'headerHeight'
  | 'suppressCellFocus'
  | 'animateRows'
  | 'overlayLoadingTemplate'
  | 'overlayNoRowsTemplate'
  | 'defaultColDef'
  | 'selectionColumnDef'
  | 'getRowId'
  | 'theme'
> = {
  rowSelection: productsRowSelection,
  rowHeight: 68,
  headerHeight: 56,
  suppressCellFocus: true,
  animateRows: true,
  overlayLoadingTemplate: "<span class='ag-overlay-loading-center'>Загрузка...</span>",
  overlayNoRowsTemplate: "<span class='ag-overlay-loading-center'>Ничего не найдено</span>",
  defaultColDef: productsDefaultColDef,
  selectionColumnDef: {
    width: 56,
    minWidth: 56,
    maxWidth: 56,
    pinned: 'left',
    sortable: false,
    resizable: false,
  },
  getRowId: getProductsRowId,
  theme: 'legacy',
};
