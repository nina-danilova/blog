import React from 'react';
import { useHistory } from 'react-router-dom';
import { Alert } from 'antd';
import { useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';

import { registerNewUser } from '../../../redux/action-creators/user';
import { RootState } from '../../../redux/reducers';
import { store } from '../../../redux/store';

import styles from './registration-form.module.scss';

type RegistrationFormInput = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  personalInfoAgreement: boolean;
};

export const RegistrationForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegistrationFormInput>();
  const history = useHistory();
  const onSubmit: SubmitHandler<RegistrationFormInput> = (data, event) =>
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
        method="POST"
        action="https://blog.kata.academy"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className={styles['registration-form-title']}>Create new account</p>
        <div className={styles['registration-form-input-group']}>
          <label
            htmlFor="username"
            className="registration-form-label"
          >
            <p className={styles['registration-form-label-name']}>Username</p>
            <input
              className={styles['registration-form-input']}
              type="text"
              id="username"
              placeholder="Username"
              minLength={3}
              maxLength={20}
              required
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...register('username', {
                required: {
                  value: true,
                  message: 'Поле обязательно к заполнению',
                },
                pattern: {
                  value: /^[a-z0-9]*$/,
                  message: 'Допустимы латинские буквы в нижнем регистре и цифры',
                },
                minLength: {
                  value: 3,
                  message: 'Минимальная длина имени пользователя - 3 символа',
                },
                maxLength: {
                  value: 20,
                  message: 'Максимальная длина имени пользователя - 20 символов',
                },
              })}
            />
            {errors?.username?.type === 'required' && (
              <p
                role="alert"
                className={styles['registration-form-error']}
              >
                {errors.username.message}
              </p>
            )}
            {errors?.username?.type === 'pattern' && (
              <p
                role="alert"
                className={styles['registration-form-error']}
              >
                {errors.username.message}
              </p>
            )}
            {errors?.username?.type === 'minLength' && (
              <p
                role="alert"
                className={styles['registration-form-error']}
              >
                {errors.username.message}
              </p>
            )}
            {errors?.username?.type === 'maxLength' && (
              <p
                role="alert"
                className={styles['registration-form-error']}
              >
                {errors.username.message}
              </p>
            )}
          </label>
          <label
            htmlFor="email"
            className="registration-form-label"
          >
            <p className={styles['registration-form-label-name']}>Email address</p>
            <input
              className={styles['registration-form-input']}
              type="email"
              id="email"
              placeholder="Email address"
              required
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
                className={styles['registration-form-error']}
              >
                {errors.email.message}
              </p>
            )}
            {errors?.email?.type === 'pattern' && (
              <p
                role="alert"
                className={styles['registration-form-error']}
              >
                {errors.email.message}
              </p>
            )}
          </label>
          <label
            htmlFor="password"
            className="registration-form-label"
          >
            <p className={styles['registration-form-label-name']}>Password</p>
            <input
              className={styles['registration-form-input']}
              type="password"
              id="password"
              placeholder="Password"
              minLength={6}
              maxLength={40}
              required
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...register('password', {
                required: {
                  value: true,
                  message: 'Поле обязательно к заполнению',
                },
                pattern: {
                  value: /^[a-z0-9]*$/,
                  message: 'Допустимы латинские буквы в нижнем регистре и цифры',
                },
                minLength: {
                  value: 6,
                  message: 'Минимальная длина пароля - 6 символов',
                },
                maxLength: {
                  value: 40,
                  message: 'Максимальная длина пароля - 40 символов',
                },
              })}
            />
            {errors?.password?.type === 'required' && (
              <p
                role="alert"
                className={styles['registration-form-error']}
              >
                {errors.password.message}
              </p>
            )}
            {errors?.password?.type === 'pattern' && (
              <p
                role="alert"
                className={styles['registration-form-error']}
              >
                {errors.password.message}
              </p>
            )}
            {errors?.password?.type === 'minLength' && (
              <p
                role="alert"
                className={styles['registration-form-error']}
              >
                {errors.password.message}
              </p>
            )}
            {errors?.password?.type === 'maxLength' && (
              <p
                role="alert"
                className={styles['registration-form-error']}
              >
                {errors.password.message}
              </p>
            )}
          </label>
          <label
            htmlFor="repeatPassword"
            className="registration-form-label"
          >
            <p className={styles['registration-form-label-name']}>Repeat Password</p>
            <input
              className={styles['registration-form-input']}
              type="password"
              id="repeatPassword"
              placeholder="Password"
              required
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...register('repeatPassword', {
                required: {
                  value: true,
                  message: 'Поле обязательно к заполнению',
                },
                validate: (value, formValues) => value === formValues.password,
              })}
            />
            {errors?.repeatPassword?.type === 'required' && (
              <p
                role="alert"
                className={styles['registration-form-error']}
              >
                {errors.repeatPassword.message}
              </p>
            )}
            {errors?.repeatPassword?.type === 'validate' && (
              <p
                role="alert"
                className={styles['registration-form-error']}
              >
                Пароли должны совпадать
              </p>
            )}
          </label>
        </div>
        <div className={styles['registration-form-agreement']}>
          <input
            className={`${styles['registration-form-input']} ${styles['registration-form-input--agreement']} ${styles['visually-hidden']}`}
            id="personalInfoAgreement"
            type="checkbox"
            required
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...register('personalInfoAgreement', {
              required: {
                value: true,
                message: 'Требуется согласие',
              },
            })}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            className={`registration-form-label ${styles['registration-form-label--agreement']}`}
            htmlFor="personalInfoAgreement"
          >
            <p className={`registration-form-label-name ${styles['registration-form-label-name--agreement']}`}>
              I agree to the processing of my personal information
            </p>
            {errors?.personalInfoAgreement?.type === 'required' && (
              <p
                role="alert"
                className={styles['registration-form-error']}
              >
                {errors.personalInfoAgreement.message}
              </p>
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
            <a
              href="/"
              className={styles['registration-form-link']}
            >
              Sign In
            </a>
            .
          </p>
        </div>
      </form>
      {errorMessage}
    </>
  );
};
