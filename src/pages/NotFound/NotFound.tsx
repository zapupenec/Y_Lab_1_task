import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';
import { routes } from '../../routes';
import { Button } from '../../components';
import { shortcuts } from '../../constants';

export const NotFound: FC = () => {
  const navigate = useNavigate();

  const handleClickHome = useCallback((): void => {
    navigate(routes.pages.main);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Такой страницы не существует</h1>
        <Button
          className={styles.button}
          onClick={handleClickHome}
          desctiptionKey={shortcuts.altPlusEnter.text}
          shortcut={shortcuts.altPlusEnter.keys}
        >
          На главную
        </Button>
      </div>
    </div>
  );
};
