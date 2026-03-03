import { type FC } from 'react';
import { Button, TextField } from '@mui/material';
import styles from './AuthForm.module.scss';


const AuthForm: FC = () => {

  return (
    <div className={styles.form}>
      <div>
        <h1>Авторизация</h1>

        <TextField
          fullWidth
          label="Email"
          type="email"
        />

        <TextField
          fullWidth
          label="Пароль"
          type="password"
        />

        <Button variant="contained">
          Войти
        </Button>
      </div>
    </div>
  );
};

export default AuthForm;
