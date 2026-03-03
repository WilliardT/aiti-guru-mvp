import { type FC } from 'react';
import AuthModule from '../../modules/AuthModule/AuthModule.tsx';


const LoginPage: FC<{
  onLogin: () => void;
}> = ({ onLogin }) => {

  return (
    <main className="appLayout">
      <AuthModule onLogin={onLogin} />
    </main>
  );
};

export default LoginPage;
