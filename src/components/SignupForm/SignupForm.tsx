import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SignupForm.module.css';
import { Button, Input, InputProps } from '..';
import { useAppSelector } from '../../store';
import { authSelectors } from '../../store/slices';
import { useAuth } from '../../hooks';
import { ILoginData } from '../../types';
import { instanceOfApiError } from '../../api';
import { routes } from '../../routes';

export const SignupForm: FC = () => {
  const [email, setEmail] = useState<ILoginData['email']>('');
  const [statusEmail, setStatusEmail] = useState<InputProps['status']>('default');
  const [feedbackEmail, setFeedbackEmail] = useState<InputProps['feedback']>('');

  const [password, setPassword] = useState<ILoginData['password']>('');
  const [statusPass, setStatusPass] = useState<InputProps['status']>('default');
  const [feedbackPass, setFeedbackPass] = useState<InputProps['feedback']>('');

  const [confirmPassword, setConfirmPassword] = useState<ILoginData['password']>('');
  const [statusConfirmPassword, setStatusConfirmPassword] =
    useState<InputProps['status']>('default');
  const [feedbackConfirmPassword, setFeedbackConfirmPassword] =
    useState<InputProps['feedback']>('');

  const statusForm = useAppSelector(authSelectors.selectStatus);
  const { signUp } = useAuth();

  const isValidForm = (): boolean => {
    const isValidEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/g.test(email);

    if (!isValidEmail) {
      setStatusEmail('error');
      setFeedbackEmail('Введите валидную почту.');
    }

    const isValidPassword =
      /(?=(?:.*[A-ZА-ЯЁ]){3,})/g.test(password) && // 3 заглавные буквы
      /(?=(?:.*\d){2,})/g.test(password) && // 2 цифры
      /^[A-Za-zА-ЯЁа-яё0-9!@#$%^&*()\-_=+{};:,<.>]{8,30}$/g.test(password); // любой из перечисленных от 8 до 30

    if (!isValidPassword) {
      setStatusPass('error');
      setFeedbackPass('Пароль не соответсвует требованиям');
    }

    const isValidConfirmPassword = password === confirmPassword;

    if (!isValidConfirmPassword) {
      setStatusConfirmPassword('error');
      setFeedbackConfirmPassword('Пароли не совпадают');
    }

    return isValidEmail && isValidPassword && isValidConfirmPassword;
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
      case 'confirmPassword':
        setConfirmPassword('');
        setStatusConfirmPassword('default');
        setFeedbackConfirmPassword('');
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
      case 'confirmPassword':
        setConfirmPassword(e.target.value);
        setStatusConfirmPassword('default');
        setFeedbackConfirmPassword('');
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

    setStatusConfirmPassword('default');
    setFeedbackConfirmPassword('');

    if (!isValidForm()) {
      return;
    }

    try {
      await signUp({ email, password });
    } catch (error) {
      if (instanceOfApiError(error)) {
        const { statusCode, message } = error.response?.data || {};
        if (statusCode === 409 && message === 'Conflict') {
          setStatusEmail('error');
          setFeedbackEmail('Такой пользователь уже существует.');
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
          hint="Пример: example@gmail.com"
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
          hint="Пароль должен содержать 8-30 символов, без пробелов. Минимум 2 цифры и 3 заглавные буквы."
          status={statusPass}
          feedback={feedbackPass}
          value={password}
          disabled={statusForm === 'loading'}
          onChange={handleChange}
          clearValue={clearValue('password')}
        />
        <Input
          label="Повторите пароль"
          name="confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          status={statusConfirmPassword}
          feedback={feedbackConfirmPassword}
          value={confirmPassword}
          disabled={statusForm === 'loading'}
          onChange={handleChange}
          clearValue={clearValue('confirmPassword')}
        />
      </div>
      <span className={styles.registration}>
        Уже есть аккаунт?{' '}
        <Link className={styles.link} to={routes.pages.root}>
          Войти
        </Link>
      </span>

      <Button
        type="submit"
        className={styles.button}
        disabled={email === '' || password === '' || confirmPassword === ''}
        isLoading={statusForm === 'loading'}
      >
        Войти
      </Button>
    </form>
  );
};
