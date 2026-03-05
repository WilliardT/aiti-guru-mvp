import { type FC } from 'react';
import AppLayout from '@core/components/AppLayout/AppLayout.tsx';
import AuthModule from '../../modules/AuthModule/AuthModule.tsx';


const LoginPage: FC<{
  onLogin: (token: string, rememberMe: boolean) => void;
}> = ({ onLogin }) => {

  return (
    <AppLayout variant="centered">
      <AuthModule onLogin={onLogin} />
    </AppLayout>
  );
};

export default LoginPage;
