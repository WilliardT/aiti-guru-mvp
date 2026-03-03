import { type FC } from 'react';
import styles from './AuthModule.module.scss';
import AuthForm from './components/AuthForm/AuthForm.tsx';

const AuthModule: FC = () => {

  return (
    <section className={styles.authModule}>
      <AuthForm />
    </section>
  );
};

export default AuthModule;
