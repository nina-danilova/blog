import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Alert, Spin } from 'antd';
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
import { getValidationResultErrorMessage } from 'utilities/errors';

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
  const { pathToSignIn, pathToHome } = linkPaths;
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
    personalInfoAgreement: yup.string().required(messageRequired).oneOf(['true'], messageRequired),
  });
  const {
    control,
    formState: { errors },
    handleSubmit: onFormSubmit,
  } = useForm<RegistrationFormInput>({
    mode: 'onChange',
    resolver: yupResolver<RegistrationFormInput>(schema),
  });
  const userError = useAppSelector((state) => state.user.error);
  const errorMessage = userError ? (
    <Alert
      message={`${userError.message}`}
      type="error"
    />
  ) : null;
  const validationResultErrorMessage =
    userError && getValidationResultErrorMessage(userError) ? (
      <Alert message={getValidationResultErrorMessage(userError)} />
    ) : null;
  const isRegistering = useAppSelector((state) => state.user.isRegistering);
  const loadSpinner = isRegistering ? <Spin /> : null;
  const history = useHistory();
  const registerUser: SubmitHandler<RegistrationFormInput> = async (data: RegistrationFormInput, event) => {
    if (isRegistering) {
      return;
    }
    event?.preventDefault();
    const result = await dispatch(userRegister({ data }));
    if (!result.payload) {
      history.push(pathToHome);
    }
  };
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
                      className={clsx(styles['registration-form-input'], {
                        [styles['registration-form-input--invalid']]: !!errors.username,
                      })}
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
                      className={clsx(styles['registration-form-input'], {
                        [styles['registration-form-input--invalid']]: !!errors.email,
                      })}
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
                      className={clsx(styles['registration-form-input'], {
                        [styles['registration-form-input--invalid']]: !!errors.password,
                      })}
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
                      className={clsx(styles['registration-form-input'], {
                        [styles['registration-form-input--invalid']]: !!errors.repeatPassword,
                      })}
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
            className={clsx(styles['registration-form-label--agreement'], {
              [styles['registration-form-label--invalid']]: !!errors.personalInfoAgreement,
            })}
            htmlFor="personalInfoAgreement"
          >
            <p className={styles['registration-form-label-name--agreement']}>
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
            disabled={isRegistering}
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
      {loadSpinner}
      {errorMessage}
      {validationResultErrorMessage}
    </>
  );
};
