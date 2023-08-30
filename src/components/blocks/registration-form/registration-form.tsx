import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Alert } from 'antd';
import { useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { clsx } from 'clsx';

import { registerNewUser } from 'redux/action-creators/user';
import { RootState } from 'redux/reducers';
import { store } from 'redux/store';
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
  personalInfoAgreement?: boolean;
};

export const RegistrationForm: React.FC = () => {
  const { pathToHome } = linkPaths;
  const registerSchema = yup.object().shape({
    username: yup
      .string()
      .required(messageRequired)
      .matches(usernameRegEx, messagePattern)
      .min(3, messageUsernameMinLength)
      .max(20, messageUsernameMaxLength),
    email: yup.string().required(messageRequired).email(messagePattern).matches(emailRegEx, messagePattern),
    password: yup
      .string()
      .required(messageRequired)
      .matches(passwordRegEx, messagePattern)
      .min(6, messagePasswordMinLength)
      .max(40, messagePasswordMaxLength),
    repeatPassword: yup
      .string()
      .required(messageRequired)
      .oneOf([yup.ref('password')], messageNotTheSame),
    personalInfoAgreement: yup.bool().oneOf([true], messageRequired),
  });
  const {
    register,
    formState: { errors },
    handleSubmit: onFormSubmit,
  } = useForm({ resolver: yupResolver(registerSchema) });
  const history = useHistory();
  const registerUser: SubmitHandler<RegistrationFormInput> = (data, event) =>
    store.dispatch(registerNewUser(event, history, data));
  const error = useSelector((state: RootState) => state.user.registerError);
  const errorMessage = error ? (
    <Alert
      message={error}
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
            <input
              className={styles['registration-form-input']}
              type="text"
              placeholder="Username"
              minLength={3}
              maxLength={20}
              required
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...register('username')}
            />
            {errors?.username && <p className={styles['registration-form-error']}>{errors.username.message}</p>}
          </label>
          <label>
            <p className={styles['registration-form-label-name']}>Email address</p>
            <input
              className={styles['registration-form-input']}
              type="email"
              placeholder="Email address"
              required
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...register('email')}
            />
            {errors?.email && <p className={styles['registration-form-error']}>{errors.email.message}</p>}
          </label>
          <label>
            <p className={styles['registration-form-label-name']}>Password</p>
            <input
              className={styles['registration-form-input']}
              type="password"
              placeholder="Password"
              minLength={6}
              maxLength={40}
              required
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...register('password')}
            />
            {errors?.password && <p className={styles['registration-form-error']}>{errors.password.message}</p>}
          </label>
          <label>
            <p className={styles['registration-form-label-name']}>Repeat Password</p>
            <input
              className={styles['registration-form-input']}
              type="password"
              placeholder="Password"
              required
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...register('repeatPassword')}
            />
            {errors?.repeatPassword && (
              <p className={styles['registration-form-error']}>{errors.repeatPassword.message}</p>
            )}
          </label>
        </div>
        <div className={styles['registration-form-agreement']}>
          <input
            className={clsx(
              styles['registration-form-input'],
              styles['registration-form-input--agreement'],
              styles['visually-hidden']
            )}
            id="personalInfoAgreement"
            type="checkbox"
            required
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...register('personalInfoAgreement')}
          />
          <label
            className={`registration-form-label ${styles['registration-form-label--agreement']}`}
            htmlFor="personalInfoAgreement"
          >
            <p className={`registration-form-label-name ${styles['registration-form-label-name--agreement']}`}>
              I agree to the processing of my personal information
            </p>
            {errors?.personalInfoAgreement && (
              <p className={styles['registration-form-error']}>{errors.personalInfoAgreement.message}</p>
            )}
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
              to={pathToHome}
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
