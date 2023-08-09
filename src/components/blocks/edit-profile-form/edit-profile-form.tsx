import React from 'react';
import { useHistory } from 'react-router-dom';
import { Alert } from 'antd';
import { useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';

import { updateUser } from '../../../redux/action-creators/user';
import { RootState } from '../../../redux/reducers';

import styles from './edit-profile-form.module.scss';

type EditProfileFormInput = {
  username: string;
  email: string;
  password: string;
  image: string | null;
};

export const EditProfileForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<EditProfileFormInput>();
  const history = useHistory();
  const onSubmit: SubmitHandler<EditProfileFormInput> = (data, event) => updateUser(event, history, data);
  const error = useSelector((state: RootState) => state.user.updateProfileError);
  const errorMessage = error ? (
    <Alert
      message={error}
      type="error"
    />
  ) : null;
  return (
    <>
      <form
        className={styles['edit-profile-form']}
        method="POST"
        action="https://blog.kata.academy"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className={styles['edit-profile-form-title']}>Edit profile</p>
        <div className={styles['edit-profile-form-input-group']}>
          <label
            htmlFor="username"
            className="edit-profile-form-label"
          >
            <p className={styles['edit-profile-form-label-name']}>Username</p>
            <input
              className={styles['edit-profile-form-input']}
              type="text"
              id="username"
              /* minLength={3}
              maxLength={20}
              required */
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
              // value="John Doe"
            />
            {errors?.username?.type === 'required' && (
              <p
                role="alert"
                className={styles['edit-profile-form-error']}
              >
                {errors.username.message}
              </p>
            )}
            {errors?.username?.type === 'pattern' && (
              <p
                role="alert"
                className={styles['edit-profile-form-error']}
              >
                {errors.username.message}
              </p>
            )}
            {errors?.username?.type === 'minLength' && (
              <p
                role="alert"
                className={styles['edit-profile-form-error']}
              >
                {errors.username.message}
              </p>
            )}
            {errors?.username?.type === 'maxLength' && (
              <p
                role="alert"
                className={styles['edit-profile-form-error']}
              >
                {errors.username.message}
              </p>
            )}
          </label>
          <label
            htmlFor="email"
            className="edit-profile-form-label"
          >
            <p className={styles['edit-profile-form-label-name']}>Email address</p>
            <input
              className={styles['edit-profile-form-input']}
              type="email"
              id="email"
              /* required */
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
              // value="john@example.com"
            />
            {errors?.email?.type === 'required' && (
              <p
                role="alert"
                className={styles['edit-profile-form-error']}
              >
                {errors.email.message}
              </p>
            )}
            {errors?.email?.type === 'pattern' && (
              <p
                role="alert"
                className={styles['edit-profile-form-error']}
              >
                {errors.email.message}
              </p>
            )}
          </label>
          <label
            htmlFor="password"
            className="edit-profile-form-label"
          >
            <p className={styles['edit-profile-form-label-name']}>New password</p>
            <input
              className={styles['edit-profile-form-input']}
              type="password"
              id="password"
              placeholder="New password"
              /* minLength={6}
              maxLength={40}
              required */
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...register('password', {
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
            {errors?.password?.type === 'pattern' && (
              <p
                role="alert"
                className={styles['edit-profile-form-error']}
              >
                {errors.password.message}
              </p>
            )}
            {errors?.password?.type === 'minLength' && (
              <p
                role="alert"
                className={styles['edit-profile-form-error']}
              >
                {errors.password.message}
              </p>
            )}
            {errors?.password?.type === 'maxLength' && (
              <p
                role="alert"
                className={styles['edit-profile-form-error']}
              >
                {errors.password.message}
              </p>
            )}
          </label>
          <label
            htmlFor="image"
            className="edit-profile-form-label"
          >
            <p className={styles['edit-profile-form-label-name']}>Avatar image (url)</p>
            <input
              className={styles['edit-profile-form-input']}
              type="text"
              id="image"
              placeholder="Avatar image"
              /* required */
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...register('image', {
                pattern: {
                  value:
                    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                  message: 'Введите корректный URL',
                },
              })}
            />
            {errors?.image?.type === 'pattern' && (
              <p
                role="alert"
                className={styles['edit-profile-form-error']}
              >
                {errors.image.message}
              </p>
            )}
          </label>
        </div>
        <div className={styles['edit-profile-form-actions']}>
          <button
            type="submit"
            className={styles['edit-profile-form-button']}
            /* onClick={(evt) => {
              updateUser(evt, history);
            }} */
          >
            Save
          </button>
        </div>
      </form>
      {errorMessage}
    </>
  );
};
