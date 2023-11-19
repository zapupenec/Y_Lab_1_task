import { FC, useEffect } from 'react';
import styles from './Main.module.css';
import { useAuth } from '../../hooks';
import { Button } from '../../components';
import { shortcuts } from '../../constants';
import { instanceOfApiError } from '../../api';

export const Main: FC = () => {
  const { logOut } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      try {
        // некий запрос данных с помощью AuthData
      } catch (error) {
        if (instanceOfApiError(error)) {
          // обработки этого варианта на сервере нет, но вроде как-то так должно быть
          const { statusCode, message } = error.response?.data || {};
          if (statusCode === 401 && message === 'Unauthorized') {
            logOut();
          }
        }
      }
    };

    fetch();
  }, []);

  const handleClickLogout = () => {
    logOut();
  };

  return (
    <div className={styles.container}>
      <Button
        className={styles.btnLogout}
        onClick={handleClickLogout}
        desctiptionKey={shortcuts.altPlusEnter.text}
        shortcut={shortcuts.altPlusEnter.keys}
      >
        Выйти
      </Button>
    </div>
  );
};
