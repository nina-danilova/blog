import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Alert } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { clsx } from 'clsx';

import { userRegister } from 'redux-toolkit/user/userThunks';
import { RootState } from 'redux-toolkit/index';
import {
  passwordRegEx,
  emailRegEx,
  usernameRegEx,
  messageUsernameMinLength,
  messageUsernameMaxLength,
  messageRequired,
  messagePattern,
  messagePasswordMaxLength,
  messagePasswordMinLength,
  messageNotTheSame,
  linkPaths,
} from 'utilities/constants';

import styles from './registration-form.module.scss';

type RegistrationFormInput = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  personalInfoAgreement: boolean;
};

export const RegistrationForm: React.FC = () => {
  const dispatch = useDispatch();
  const { pathToSignIn } = linkPaths;
  const {
    control,
    formState: { errors },
    handleSubmit: onFormSubmit,
  } = useForm<RegistrationFormInput>({
    mode: 'onChange',
  });
  const history = useHistory();
  const registerUser: SubmitHandler<RegistrationFormInput> = (data, event) =>
    dispatch(userRegister({ event, history, data }));
  const error = useSelector((state: RootState) => state.user.registerError);
  const errorMessage = error ? (
    <Alert
      message={error.message}
      type="error"
    />
  ) : null;
  return (
    <>
      <form
        className={styles['registration-form']}
        onSubmit={onFormSubmit(registerUser)}
      >
        <p className={styles['registration-form-title']}>Create new account</p>
        <div className={styles['registration-form-input-group']}>
          <label>
            <p className={styles['registration-form-label-name']}>Username</p>
            <Controller
              name="username"
              control={control}
              rules={{
                required: messageRequired,
                pattern: {
                  value: usernameRegEx,
                  message: messagePattern,
                },
                minLength: {
                  value: 3,
                  message: messageUsernameMinLength,
                },
                maxLength: {
                  value: 20,
                  message: messageUsernameMaxLength,
                },
              }}
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <input
                      className={styles['registration-form-input']}
                      type="text"
                      placeholder="Username"
                      value={value || ''}
                      onChange={onChange}
                    />
                    {errors?.username && <p className={styles['registration-form-error']}>{errors.username.message}</p>}
                  </>
                );
              }}
            />
          </label>
          <label>
            <p className={styles['registration-form-label-name']}>Email address</p>
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
                      className={styles['registration-form-input']}
                      type="email"
                      placeholder="Email address"
                      value={value || ''}
                      onChange={onChange}
                    />
                    {errors?.email && <p className={styles['registration-form-error']}>{errors.email.message}</p>}
                  </>
                );
              }}
            />
          </label>
          <label>
            <p className={styles['registration-form-label-name']}>Password</p>
            <Controller
              name="password"
              control={control}
              rules={{
                required: messageRequired,
                pattern: {
                  value: passwordRegEx,
                  message: messagePattern,
                },
                minLength: {
                  value: 6,
                  message: messagePasswordMinLength,
                },
                maxLength: {
                  value: 40,
                  message: messagePasswordMaxLength,
                },
              }}
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <input
                      className={styles['registration-form-input']}
                      type="password"
                      placeholder="Password"
                      value={value || ''}
                      onChange={onChange}
                    />
                    {errors?.password && <p className={styles['registration-form-error']}>{errors.password.message}</p>}
                  </>
                );
              }}
            />
          </label>
          <label>
            <p className={styles['registration-form-label-name']}>Repeat Password</p>
            <Controller
              name="repeatPassword"
              control={control}
              rules={{
                required: messageRequired,
                validate: (value, formValues) => {
                  return value === formValues.password;
                },
              }}
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <input
                      className={styles['registration-form-input']}
                      type="password"
                      placeholder="Password"
                      value={value || ''}
                      onChange={onChange}
                    />
                    {errors?.repeatPassword && <p className={styles['registration-form-error']}>{messageNotTheSame}</p>}
                  </>
                );
              }}
            />
          </label>
        </div>
        <div className={styles['registration-form-agreement']}>
          <Controller
            name="personalInfoAgreement"
            control={control}
            rules={{
              required: messageRequired,
            }}
            render={({ field: { onChange, value } }) => {
              return (
                <input
                  className={clsx(
                    styles['registration-form-input'],
                    styles['registration-form-input--agreement'],
                    styles['visually-hidden']
                  )}
                  id="personalInfoAgreement"
                  type="checkbox"
                  value={value}
                  onChange={onChange}
                />
              );
            }}
          />
          <label
            className={`registration-form-label ${styles['registration-form-label--agreement']}`}
            htmlFor="personalInfoAgreement"
          >
            <p className={`registration-form-label-name ${styles['registration-form-label-name--agreement']}`}>
              I agree to the processing of my personal information
            </p>
            {errors?.personalInfoAgreement && <p className={styles['registration-form-error']}>{messageRequired}</p>}
          </label>
        </div>
        <div className={styles['registration-form-actions']}>
          <button
            type="submit"
            className={styles['registration-form-button']}
          >
            Create
          </button>
          <p className={styles['registration-form-comment']}>
            Already have an account?{' '}
            <Link
              to={pathToSignIn}
              className={styles['registration-form-link']}
            >
              Sign In
            </Link>
            .
          </p>
        </div>
      </form>
      {errorMessage}
    </>
  );
};
