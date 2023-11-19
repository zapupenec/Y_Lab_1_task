import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';
import { useShortcutKeyPress } from '../../hooks';
import { Loader } from '..';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  desctiptionKey?: string;
  isLoading?: boolean;
  shortcut?: string[];
  onClick?: (e?: React.MouseEvent) => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  desctiptionKey,
  onClick,
  shortcut = [],
  type = 'button',
  disabled = false,
  isLoading = false,
  ...props
}) => {
  const classNamedesctiptionText = classNames(styles.button__desctiptionText, {
    [styles.disabled]: disabled || isLoading,
  });

  const handleShortcutKeyPress = () => {
    if (!disabled && !isLoading) {
      if (onClick) {
        onClick();
      }
    }
  };

  useShortcutKeyPress(shortcut, () => handleShortcutKeyPress());

  return (
    <div className={classNames(className, styles.button)} aria-disabled={disabled || isLoading}>
      <button
        disabled={disabled || isLoading}
        className={styles.button__body}
        onClick={onClick}
        type={type}
        {...props}
      >
        {isLoading ? <Loader /> : children}
      </button>
      {desctiptionKey && (
        <p className={classNamedesctiptionText}>
          или нажмите <span className={styles.button__desctiptionKey}>{desctiptionKey}</span>
        </p>
      )}
    </div>
  );
};
