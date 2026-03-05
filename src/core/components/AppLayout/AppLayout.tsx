import { type FC, type ReactNode } from 'react';
import styles from './AppLayout.module.scss';

interface IAppLayoutProps {
  children?: ReactNode;
  variant?: 'centered' | 'top';
}

const AppLayout: FC<IAppLayoutProps> = ({
  children,
  variant = 'centered',
}) => {
  const layoutClassName = variant === 'top'
    ? `${styles.layout} ${styles.layoutTop}`
    : styles.layout;

  return (
    <main className={layoutClassName}>
      {children}
    </main>
  );
};

export default AppLayout;
