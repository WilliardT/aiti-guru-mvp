import { type FC, type FormEvent, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { signInApi } from '../../api/authModuleApi.ts';
import { normalizeUsername } from '../../helpers/helpersInputs.ts';
import styles from './AuthForm.module.scss';


const AuthForm: FC<{
  onLogin: (token: string, rememberMe: boolean) => void;
}> = ({ onLogin }) => {

  // for demo
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');

  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // вынести в хелпер обработки ошибок общего httpRequest
  const [apiError, setApiError] = useState('');

  const [fieldErrors, setFieldErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const validateFields = (): boolean => {
    const nextErrors: {
      username?: string;
      password?: string;
    } = {};

    if (!normalizeUsername(username)) {
      nextErrors.username = 'Введите логин';
    }

    if (!password.trim()) {
      nextErrors.password = 'Введите пароль';
    }

    setFieldErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setApiError('');

    if (!validateFields()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const authData = await signInApi({
        username: normalizeUsername(username),
        password: password.trim(),
        expiresInMins: rememberMe ? 60 * 24 * 30 : 60,
      });

      const token = authData.accessToken;

      if (!token) {
        throw new Error('Сервер не вернул токен авторизации');
      }

      onLogin(token, rememberMe);

    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Не удалось выполнить вход';

      setApiError(message);

    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className={styles.shell}>
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

        <div className={styles.formErrorSlot}>
          <p
            className={`${styles.formError} ${!apiError ? styles.formErrorHidden : ''}`}
            aria-live="polite"
          >
            {apiError || '\u00A0'}
          </p>
        </div>

        <div className={styles.field}>
          <label
            className={styles.fieldLabel}
            htmlFor="login"
          >
            Логин
          </label>

          <input
            className={`${styles.input} ${fieldErrors.username ? styles.inputError : ''}`}
            id="login"
            name="login"
            type="text"
            placeholder="Введите логин"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);

              if (fieldErrors.username) {
                setFieldErrors((prev) => ({ ...prev, username: undefined }));
              }
            }}
          />

          {fieldErrors.username ? (
            <p className={styles.errorText}>{fieldErrors.username}</p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="password">
            Пароль
          </label>

          <input
            className={`${styles.input} ${fieldErrors.password ? styles.inputError : ''}`}
            id="password"
            name="password"
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);

              if (fieldErrors.password) {
                setFieldErrors((prev) => ({ ...prev, password: undefined }));
              }
            }}
          />

          {fieldErrors.password ? (
            <p className={styles.errorText}>{fieldErrors.password}</p>
          ) : null}
        </div>

        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          <span>Запомнить данные</span>
        </label>

        <Button
          className={styles.loginButton}
          type="submit"
          variant="contained"
          disableElevation
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className={styles.loaderCenter}>
              <CircularProgress
                size={18}
                thickness={5}
                color="inherit"
                className={styles.buttonLoader}
              />
            </span>
          ) : (
            'Войти'
          )}
        </Button>

        <div className={styles.divider}>
          <span>или</span>
        </div>

        <p className={styles.footer}>
          Нет аккаунта? <span className={styles.createLink}>Создать</span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
