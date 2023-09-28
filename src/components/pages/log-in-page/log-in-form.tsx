import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Alert } from 'antd';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { linkPaths, emailRegEx, messagePattern, messageRequired, passwordRegEx } from 'utilities/constants';
import { userLogin, LoginFormInput } from 'redux-toolkit/user/userThunks';
import { setAuthStatus } from 'services/storage-service';

import styles from './log-in-form.module.scss';

export const LogInForm: React.FC = () => {
  const { pathToSignUp, pathToHome } = linkPaths;
  const schema = yup.object().shape({
    email: yup.string().matches(emailRegEx, { message: messagePattern }).required(messageRequired),
    password: yup.string().matches(passwordRegEx, { message: messagePattern }).required(messageRequired),
  });
  const {
    control,
    formState: { errors },
    handleSubmit: onFormSubmit,
  } = useForm<LoginFormInput>({
    mode: 'onChange',
    resolver: yupResolver<LoginFormInput>(schema),
  });
  const dispatch = useAppDispatch();
  const history = useHistory();
  const logIn: SubmitHandler<LoginFormInput> = async (data, event) => {
    const result = await dispatch(userLogin({ event, data }));
    if (!result.payload) {
      setAuthStatus(true);
      history.push(pathToHome);
    }
  };
  const error = useAppSelector((state) => state.user.userError);
  const errorMessage = error ? (
    <Alert
      message={error.message}
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
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <input
                      className={styles['log-in-form-input']}
                      type="email"
                      placeholder="Email address"
                      value={value || ''}
                      onChange={onChange}
                    />
                    {errors?.email && <p className={styles['log-in-form-error']}>{errors.email.message}</p>}
                  </>
                );
              }}
            />
          </label>
          <label>
            <p className={styles['log-in-form-label-name']}>Password</p>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <input
                      className={styles['log-in-form-input']}
                      type="password"
                      placeholder="Password"
                      value={value || ''}
                      onChange={onChange}
                    />
                    {errors?.password && <p className={styles['log-in-form-error']}>{errors.password.message}</p>}
                  </>
                );
              }}
            />
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
              to={pathToSignUp}
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
