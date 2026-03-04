import {
  type ChangeEvent,
  type FC,
  type FormEvent,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import styles from './AddProductModal.module.scss';

export interface IAddProductFormValues {
  title: string;
  price: number;
  brand: string;
  sku: string;
}

interface IAddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: IAddProductFormValues) => void;
}

interface IAddProductFormState {
  title: string;
  price: string;
  brand: string;
  sku: string;
}

const INITIAL_ADD_PRODUCT_FORM: IAddProductFormState = {
  title: '',
  price: '',
  brand: '',
  sku: '',
};

const AddProductModal: FC<IAddProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formState, setFormState] = useState<IAddProductFormState>(INITIAL_ADD_PRODUCT_FORM);

  const handleClose = () => {
    setFormState(INITIAL_ADD_PRODUCT_FORM);
    onClose();
  };

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value,
    } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = formState.title.trim();
    const brand = formState.brand.trim();
    const sku = formState.sku.trim();
    const parsedPrice = Number(formState.price);

    if (!title || !brand || !sku || Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      toast.error('Заполните форму: наименование, цена, вендор и артикул.');
      return;
    }

    onSubmit({
      title,
      price: parsedPrice,
      brand,
      sku,
    });

    setFormState(INITIAL_ADD_PRODUCT_FORM);
  };

  if (!isOpen) {
    return null;
  }


  return (
    <div
      className={styles.modalOverlay}
      onClick={handleClose}
      role="presentation"
    >
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-product-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h3
          className={styles.modalTitle}
          id="add-product-modal-title"
        >
          Добавление товара
        </h3>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Наименование</span>
            <input
              className={styles.input}
              type="text"
              name="title"
              value={formState.title}
              onChange={handleFieldChange}
              required
            />
          </label>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>Цена</span>
            <input
              className={styles.input}
              type="number"
              name="price"
              value={formState.price}
              onChange={handleFieldChange}
              min="0.01"
              step="0.01"
              required
            />
          </label>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>Вендор</span>
            <input
              className={styles.input}
              type="text"
              name="brand"
              value={formState.brand}
              onChange={handleFieldChange}
              required
            />
          </label>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>Артикул</span>
            <input
              className={styles.input}
              type="text"
              name="sku"
              value={formState.sku}
              onChange={handleFieldChange}
              required
            />
          </label>

          <div className={styles.actions}>
            <button
              className={styles.buttonCancel}
              type="button"
              onClick={handleClose}
            >
              Отмена
            </button>

            <button
              className={styles.buttonSubmit}
              type="submit"
            >
              Добавить
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddProductModal;
