import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert } from 'antd';
import { useForm, SubmitHandler } from 'react-hook-form';

import { userLogin } from '../../../redux/action-creators/user';
import { RootState } from '../../../redux/reducers';
import { store } from '../../../redux/store';

import styles from './log-in-form.module.scss';

type LoginFormInput = {
  email: string;
  password: string;
};

export const LogInForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormInput>();
  const history = useHistory();
  const onSubmit: SubmitHandler<LoginFormInput> = (data, event) => store.dispatch(userLogin(event, history, data));
  const error = useSelector((state: RootState) => state.user.loginError);
  const errorMessage = error ? (
    <Alert
      message={error}
      type="error"
    />
  ) : null;
  return (
    <>
      <form
        className={styles['log-in-form']}
        method="POST"
        action="https://blog.kata.academy"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className={styles['log-in-form-title']}>Sign In</p>
        <div className={styles['log-in-form-input-group']}>
          <label
            htmlFor="email"
            className="log-in-form-label"
          >
            <p className={styles['log-in-form-label-name']}>Email address</p>
            <input
              className={styles['log-in-form-input']}
              /* type="email" */
              id="email"
              placeholder="Email address"
              aria-invalid={errors.email ? 'true' : 'false'}
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...register('email', {
                required: {
                  value: true,
                  message: 'Поле обязательно к заполнению',
                },
                pattern: {
                  value: /^(?!.*@.*@.*$)(?!.*@.*--.*\..*$)(?!.*@.*-\..*$)(?!.*@.*-$)((.*)?@.+(\..{1,11})?)$/,
                  message: 'Введите корректный email',
                },
              })}
            />
            {errors?.email?.type === 'required' && (
              <p
                role="alert"
                className={styles['log-in-form-error']}
              >
                {errors.email.message}
              </p>
            )}
            {errors?.email?.type === 'pattern' && (
              <p
                role="alert"
                className={styles['log-in-form-error']}
              >
                {errors.email.message}
              </p>
            )}
          </label>
          <label
            htmlFor="password"
            className="log-in-form-label"
          >
            <p className={styles['log-in-form-label-name']}>Password</p>
            <input
              className={styles['log-in-form-input']}
              type="password"
              id="password"
              placeholder="Password"
              aria-invalid={errors.password ? 'true' : 'false'}
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...register('password', {
                required: 'Поле обязательно к заполнению',
              })}
            />
            {errors.password?.type === 'required' && (
              <p
                role="alert"
                className={styles['log-in-form-error']}
              >
                {errors.password.message}
              </p>
            )}
          </label>
        </div>
        <div className={styles['log-in-form-actions']}>
          <button
            type="submit"
            className={styles['log-in-form-button']}
          >
            Login
          </button>
          <p className={styles['log-in-form-comment']}>
            Don&apos;t have an account?{' '}
            <a
              href="/"
              className={styles['log-in-form-link']}
            >
              Sign Up
            </a>
            .
          </p>
        </div>
      </form>
      {errorMessage}
    </>
  );
};
