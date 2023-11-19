import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Input.module.css';
import { IconEye, IconEyeOff, IconXCircle } from '..';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  feedback?: string;
  clearValue?: () => void | never;
  status: 'default' | 'success' | 'error';
}

export const Input: React.FC<InputProps> = ({
  type,
  value,
  label,
  hint,
  feedback,
  clearValue,
  autoComplete = 'off',
  status = 'default',
  ...props
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [inputTypePassword, setInputTypePassword] = useState<'text' | 'password'>('password');

  useEffect(() => {
    setInputTypePassword(isShowPassword ? 'text' : 'password');
  }, [isShowPassword]);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const handleClear = () => {
    if (clearValue) {
      clearValue();
      inputRef.current?.focus();
    }
  };

  const classNameFeedback = classNames(styles.feedback, {
    [styles.feedbackValid]: status === 'success',
    [styles.feedbackInvalid]: status === 'error',
  });

  const classNameBorder = classNames(styles.border, {
    [styles.valid]: status === 'success',
    [styles.invalid]: status === 'error',
  });

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        <div className={styles.field}>
          <input
            value={value}
            type={type !== 'password' ? type : inputTypePassword}
            autoComplete={autoComplete}
            className={styles.input}
            ref={inputRef}
            {...props}
          />
          <div className={classNameBorder}>
            {label && <span className={styles.borderText}>{label}</span>}
          </div>
          {value && (
            <>
              <button
                className={styles.inputBtn}
                onClick={handleClear}
                type="button"
                aria-label="очистить поле"
              >
                <IconXCircle />
              </button>
              {type === 'password' && (
                <button
                  className={styles.inputBtn}
                  type="button"
                  onClick={toggleShowPassword}
                  aria-label={`${inputTypePassword === 'password' ? 'показать' : 'скрыть'} пароль`}
                >
                  {isShowPassword ? <IconEyeOff /> : <IconEye />}
                </button>
              )}
            </>
          )}
        </div>
      </label>
      {feedback && <p className={classNameFeedback}>{feedback}</p>}
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
};
