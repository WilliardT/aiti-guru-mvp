import { type FC } from 'react';
import styles from './AuthModule.module.scss';
import AuthForm from './components/AuthForm/AuthForm.tsx';


const AuthModule: FC<{
  onLogin: () => void;
}> = ({ onLogin }) => {

  return (
    <section className={styles.authModule}>
      <AuthForm onLogin={onLogin} />
    </section>
  );
};

export default AuthModule;
