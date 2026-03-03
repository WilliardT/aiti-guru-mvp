import { type FC, type FormEvent, useState } from 'react';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from '@mui/material';
import { signInApi } from '../../api/authModuleApi.ts';
import { normalizeUsername } from '../../helpers/helpersInputs.ts';
import styles from './AuthForm.module.scss';


const AuthForm: FC<{
  onLogin: (token: string, rememberMe: boolean) => void;
}> = ({ onLogin }) => {

  // for demo
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [showPassword, setShowPassword] = useState(false);

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

          <div
            className={`${styles.inputShell} ${fieldErrors.username ? styles.inputShellError : ''}`}
          >
            <img
              className={styles.inputIconLeft}
              src="/icons/user icon.svg"
              alt=""
              aria-hidden="true"
            />

            <input
              className={styles.input}
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

            {username ? (
              <button
                className={styles.inputIconButton}
                type="button"
                aria-label="Очистить логин"
                onClick={() => {
                  setUsername('');

                  if (fieldErrors.username) {
                    setFieldErrors((prev) => ({ ...prev, username: undefined }));
                  }
                }}
              >
                <img
                  className={styles.inputIconRight}
                  src="/icons/close-icon.svg"
                  alt=""
                  aria-hidden="true"
                />
              </button>
            ) : (
              <span className={styles.inputIconPlaceholder} aria-hidden="true" />
            )}
          </div>

          {fieldErrors.username ? (
            <p className={styles.errorText}>{fieldErrors.username}</p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="password">
            Пароль
          </label>

          <div
            className={`${styles.inputShell} ${fieldErrors.password ? styles.inputShellError : ''}`}
          >
            <img
              className={styles.inputIconLeft}
              src="/icons/lock-03.svg"
              alt=""
              aria-hidden="true"
            />

            <input
              className={styles.input}
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Введите пароль"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);

                if (fieldErrors.password) {
                  setFieldErrors((prev) => ({ ...prev, password: undefined }));
                }
              }}
            />

            <button
              className={styles.inputIconButton}
              type="button"
              aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <img
                className={`${styles.inputIconRight} ${styles.inputIconEye}`}
                src="/icons/eye-off.svg"
                alt=""
                aria-hidden="true"
              />
            </button>
          </div>

          {fieldErrors.password ? (
            <p className={styles.errorText}>{fieldErrors.password}</p>
          ) : null}
        </div>

        <FormControlLabel
          className={styles.checkboxRow}
          control={(
            <Checkbox
              className={styles.checkboxControl}
              disableRipple
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              icon={<span className={styles.checkboxIcon} />}
              checkedIcon={(
                <span className={`${styles.checkboxIcon} ${styles.checkboxIconChecked}`}>
                  <span className={styles.checkboxTick} />
                </span>
              )}
            />
          )}
          label="Запомнить данные"
        />

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
