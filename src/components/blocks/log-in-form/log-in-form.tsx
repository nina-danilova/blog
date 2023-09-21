import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Alert } from 'antd';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { linkPaths, emailRegEx, messagePattern, messageRequired } from 'utilities/constants';
import { userLogin, LoginFormInput } from 'redux-toolkit/user/userThunks';

import styles from './log-in-form.module.scss';

export const LogInForm: React.FC = () => {
  const { pathToSignUp } = linkPaths;
  const {
    control,
    formState: { errors },
    handleSubmit: onFormSubmit,
  } = useForm<LoginFormInput>({
    mode: 'onChange',
  });
  const dispatch = useAppDispatch();
  const history = useHistory();
  const logIn: SubmitHandler<LoginFormInput> = (data, event) => dispatch(userLogin({ event, history, data }));
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
              rules={{
                required: messageRequired,
                pattern: {
                  value: emailRegEx,
                  message: messagePattern,
                },
              }}
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
              rules={{
                required: messageRequired,
              }}
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
