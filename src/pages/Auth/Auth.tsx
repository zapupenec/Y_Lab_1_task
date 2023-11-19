import { FC } from 'react';
import styles from './Auth.module.css';
import { AuthForm } from '../../components';

export const Auth: FC = () => {
  return (
    <div className={styles.container}>
      <AuthForm />
    </div>
  );
};
