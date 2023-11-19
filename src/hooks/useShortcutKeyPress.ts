import { useEffect } from 'react';

export const useShortcutKeyPress = (keys: string[], callback: () => void) => {
  let pressedKeys: string[] = [];

  const handleDown = (event: KeyboardEvent) => {
    if (event.key === pressedKeys[pressedKeys.length - 1]) {
      return;
    }

    if (!pressedKeys.includes(event.key)) {
      pressedKeys.push(event.key);
    }

    const isAllKeysPressed = keys.every((key) => pressedKeys.includes(key));
    if (isAllKeysPressed) {
      callback();
      pressedKeys = [];
    }
  };

  const handleUp = (event: KeyboardEvent) => {
    pressedKeys = pressedKeys.filter((key) => key !== event.key);
  };

  useEffect(() => {
    if (keys.length !== 0) {
      document.addEventListener('keydown', handleDown);
      document.addEventListener('keyup', handleUp);
    }

    return () => {
      document.removeEventListener('keydown', handleDown);
      document.removeEventListener('keyup', handleUp);
    };
  }, [pressedKeys]);
};
