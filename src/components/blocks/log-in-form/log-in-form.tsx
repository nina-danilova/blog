import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert } from 'antd';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { userLogin } from 'redux/action-creators/user';
import { RootState } from 'redux/reducers';
import { store } from 'redux/store';

import { emailRegEx, messagePattern, messageRequired } from '../../../utilities/constants';

import styles from './log-in-form.module.scss';

type LoginFormInput = {
  email: string;
  password: string;
};

export const LogInForm: React.FC = () => {
  const logInSchema = yup.object().shape({
    email: yup.string().required(messageRequired).email(messagePattern).matches(emailRegEx, messagePattern),
    password: yup.string().required(messageRequired),
  });
  const {
    register,
    formState: { errors },
    handleSubmit: onFormSubmit,
  } = useForm({ resolver: yupResolver(logInSchema) });
  const history = useHistory();
  const logIn: SubmitHandler<LoginFormInput> = (data, event) => store.dispatch(userLogin(event, history, data));
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
        onSubmit={onFormSubmit(logIn)}
      >
        <p className={styles['log-in-form-title']}>Sign In</p>
        <div className={styles['log-in-form-input-group']}>
          <label>
            <p className={styles['log-in-form-label-name']}>Email address</p>
            <input
              className={styles['log-in-form-input']}
              type="email"
              placeholder="Email address"
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...register('email')}
            />
            {errors?.email && <p className={styles['log-in-form-error']}>{errors.email.message}</p>}
          </label>
          <label>
            <p className={styles['log-in-form-label-name']}>Password</p>
            <input
              className={styles['log-in-form-input']}
              type="password"
              placeholder="Password"
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...register('password')}
            />
            {errors.password && <p className={styles['log-in-form-error']}>{errors.password.message}</p>}
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
            <Link
              to="/sign-up"
              className={styles['log-in-form-link']}
            >
              Sign Up
            </Link>
            .
          </p>
        </div>
      </form>
      {errorMessage}
    </>
  );
};
