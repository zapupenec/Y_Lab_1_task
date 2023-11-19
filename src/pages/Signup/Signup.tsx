import { FC } from 'react';
import styles from './Signup.module.css';
import { SignupForm } from '../../components';

export const Signup: FC = () => {
  return (
    <div className={styles.container}>
      <SignupForm />
    </div>
  );
};
