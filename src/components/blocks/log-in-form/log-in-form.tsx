import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert } from 'antd';

import { userLogIn } from '../../../redux/action-creators/user';
import { RootState } from '../../../redux/reducers';

import styles from './log-in-form.module.scss';

export const LogInForm = () => {
  const history = useHistory();
  const error = useSelector((state: RootState) => state.user.loginError);
  const errorMessage = error ? <Alert message={error} /> : null;
  return (
    <>
      <form
        className={styles['log-in-form']}
        method="POST"
        action="https://blog.kata.academy"
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
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              required
            />
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
              name="password"
              placeholder="Password"
              required
            />
          </label>
        </div>
        <div className={styles['log-in-form-actions']}>
          <button
            type="submit"
            className={styles['log-in-form-button']}
            onClick={(evt) => {
              userLogIn(evt, history);
            }}
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
