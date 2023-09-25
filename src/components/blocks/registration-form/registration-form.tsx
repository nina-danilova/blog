import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Alert } from 'antd';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { clsx } from 'clsx';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { userRegister } from 'redux-toolkit/user/userThunks';
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
  personalInfoAgreement: string;
};

export const RegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pathToSignIn } = linkPaths;
  const schema = yup.object().shape({
    username: yup
      .string()
      .matches(usernameRegEx, { message: messagePattern })
      .min(3, messageUsernameMinLength)
      .max(20, messageUsernameMaxLength)
      .required(messageRequired),
    email: yup.string().matches(emailRegEx, { message: messagePattern }).required(messageRequired),
    password: yup
      .string()
      .matches(passwordRegEx, { message: messagePattern })
      .min(6, messagePasswordMinLength)
      .max(40, messagePasswordMaxLength)
      .required(messageRequired),
    repeatPassword: yup
      .string()
      .test('passwords-the-same', messageNotTheSame, (value, context) => {
        if (context.from) {
          return value === context.from[0].value.password;
        }
        return false;
      })
      .required(messageRequired),
    personalInfoAgreement: yup.string().required(messageRequired),
  });
  const {
    control,
    formState: { errors },
    handleSubmit: onFormSubmit,
  } = useForm<RegistrationFormInput>({
    mode: 'onChange',
    resolver: yupResolver<RegistrationFormInput>(schema),
  });
  const history = useHistory();
  const registerUser: SubmitHandler<RegistrationFormInput> = (data, event) =>
    dispatch(userRegister({ event, history, data }));
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
                    {errors?.repeatPassword && (
                      <p className={styles['registration-form-error']}>{errors.repeatPassword.message}</p>
                    )}
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
