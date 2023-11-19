import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthForm.module.css';
import { Button, Input, InputProps } from '..';
import { useAppSelector } from '../../store';
import { authSelectors } from '../../store/slices';
import { useAuth } from '../../hooks';
import { ILoginData } from '../../types';
import { instanceOfApiError } from '../../api';
import { routes } from '../../routes';

export const AuthForm: FC = () => {
  const [email, setEmail] = useState<ILoginData['email']>('');
  const [statusEmail, setStatusEmail] = useState<InputProps['status']>('default');
  const [feedbackEmail, setFeedbackEmail] = useState<InputProps['feedback']>('');

  const [password, setPassword] = useState<ILoginData['password']>('');
  const [statusPass, setStatusPass] = useState<InputProps['status']>('default');
  const [feedbackPass, setFeedbackPass] = useState<InputProps['feedback']>('');

  const statusForm = useAppSelector(authSelectors.selectStatus);
  const { logIn } = useAuth();

  const isValidForm = (): boolean => {
    const isValidEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/g.test(email);
    if (!isValidEmail) {
      setStatusEmail('error');
      setFeedbackEmail('Введите валидную почту (example@gmail.com)');
    }
    return isValidEmail;
  };

  const clearValue = (field: string) => (): void | never => {
    switch (field) {
      case 'name':
        setEmail('');
        setStatusEmail('default');
        setFeedbackEmail('');
        break;
      case 'password':
        setPassword('');
        setStatusPass('default');
        setFeedbackPass('');
        break;
      default:
        throw new Error(`Unknown field: ${field}`);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void | never => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value);
        setStatusEmail('default');
        setFeedbackEmail('');
        break;
      case 'password':
        setPassword(e.target.value);
        setStatusPass('default');
        setFeedbackPass('');
        break;
      default:
        throw new Error(`Unknown field name: ${e.target.name}`);
    }
  };

  const submitForm = async (e: FormEvent<EventTarget>): Promise<void> => {
    e.preventDefault();
    setStatusEmail('default');
    setFeedbackEmail('');

    setStatusPass('default');
    setFeedbackPass('');

    if (!isValidForm()) {
      return;
    }

    try {
      await logIn({ email, password });
    } catch (error) {
      if (instanceOfApiError(error)) {
        const { statusCode, message } = error.response?.data || {};
        if (statusCode === 403 && message === 'Unauthorized') {
          setStatusEmail('success');
          setStatusPass('error');
          setFeedbackPass('Неверный пароль. Проверьте правильность ввода.');
        }

        if (statusCode === 409 && message === 'Conflict') {
          setStatusEmail('error');
          setFeedbackEmail('Такого пользователя не существует. Зарегистрируйтесь.');
          setStatusPass('default');
        }
      }
    }
  };

  return (
    <form className={styles.wrapper} noValidate onSubmit={submitForm}>
      <h2 className={styles.title}>Вход</h2>
      <div className={styles.inputs}>
        <Input
          label="Почта"
          name="email"
          type="text"
          placeholder="Почта"
          status={statusEmail}
          feedback={feedbackEmail}
          value={email}
          disabled={statusForm === 'loading'}
          onChange={handleChange}
          clearValue={clearValue('name')}
        />
        <Input
          label="Пароль"
          name="password"
          type="password"
          placeholder="Пароль"
          status={statusPass}
          feedback={feedbackPass}
          value={password}
          disabled={statusForm === 'loading'}
          onChange={handleChange}
          clearValue={clearValue('password')}
        />
      </div>
      <span className={styles.registration}>
        Нет аккаунта?{' '}
        <Link className={styles.link} to={routes.pages.signup}>
          Зарегистрироваться
        </Link>
      </span>

      <Button
        type="submit"
        className={styles.button}
        disabled={email === '' || password === ''}
        isLoading={statusForm === 'loading'}
      >
        Войти
      </Button>
    </form>
  );
};
