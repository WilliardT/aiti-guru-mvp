import {type FC, SyntheticEvent} from 'react';
import { Button } from '@mui/material';
import styles from './AuthForm.module.scss';


const AuthForm: FC<{
  onLogin: () => void;
}> = ({ onLogin }) => {

  const handleSubmit = (
    event: SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    onLogin();
  };


  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <img
        className={styles.logo}
        src="/icons/Frame_1.svg"
        alt="Логотип"
      />

      <h1 className={styles.title}>Добро пожаловать!</h1>

      <p className={styles.subtitle}>Пожалуйста, авторизируйтесь</p>

      <label
        className={styles.fieldLabel}
        htmlFor="login"
      >
        Логин
      </label>

      <input
        className={styles.input}
        id="login"
        name="login"
        type="text"
        placeholder="Введите логин"
        defaultValue="test"
      />

      <label className={styles.fieldLabel} htmlFor="password">
        Пароль
      </label>

      <input
        className={styles.input}
        id="password"
        name="password"
        type="password"
        placeholder="Введите пароль"
        defaultValue="123456"
      />

      <label className={styles.checkboxRow}>
        <input type="checkbox" />
        <span>Запомнить данные</span>
      </label>

      <Button
        className={styles.loginButton}
        type="submit"
        variant="contained"
        disableElevation
      >
        Войти
      </Button>

      <div className={styles.divider}>
        <span>или</span>
      </div>

      <p className={styles.footer}>
        Нет аккаунта? <span className={styles.createLink}>Создать</span>
      </p>
    </form>
  );
};

export default AuthForm;
