import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert } from 'antd';
import { useSelector } from 'react-redux';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { store } from 'redux/store';
import { RootState } from 'redux/reducers';
import { updateProfile } from 'redux/action-creators/profile';
import {
  emailRegEx,
  messagePasswordMaxLength,
  messagePasswordMinLength,
  messagePattern,
  messageRequired,
  messageUsernameMaxLength,
  messageUsernameMinLength,
  passwordRegEx,
  urlRegEx,
  usernameRegEx,
} from 'utilities/constants';

import styles from './edit-profile-form.module.scss';

type EditProfileFormInput = {
  username: string;
  email: string;
  password: string;
  image?: string | undefined;
};

export const EditProfileForm: React.FC = () => {
  const userName = useSelector((state: RootState) => state.user.profile?.userName) || '';
  const userImage = useSelector((state: RootState) => state.user.profile?.image) || '';
  const userEmail = useSelector((state: RootState) => state.user.profile?.email) || '';
  const {
    handleSubmit: onFormSubmit,
    control,
    setValue,
  } = useForm<EditProfileFormInput>({
    mode: 'onChange',
  });
  const history = useHistory();
  const updateUserProfile: SubmitHandler<EditProfileFormInput> = (data, event) => {
    store.dispatch(updateProfile(event, history, data));
  };
  const error = useSelector((state: RootState) => state.user.profile?.updateProfileError);
  const errorMessage = error ? (
    <Alert
      message={error}
      type="error"
    />
  ) : null;
  useEffect(() => {
    setValue('username', userName);
    setValue('email', userEmail);
    setValue('image', userImage);
  }, [userName, userEmail, userImage]);
  return (
    <>
      <form
        className={styles['edit-profile-form']}
        onSubmit={onFormSubmit(updateUserProfile)}
      >
        <p className={styles['edit-profile-form-title']}>Edit profile</p>
        <div className={styles['edit-profile-form-input-group']}>
          <label htmlFor="username">
            <p className={styles['edit-profile-form-label-name']}>Username</p>
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
              render={({ field: { onChange, value }, fieldState: { error: err } }) => {
                return (
                  <>
                    <input
                      className={styles['edit-profile-form-input']}
                      type="text"
                      placeholder="Username"
                      id="username"
                      value={value}
                      onChange={onChange}
                    />
                    {err && <p className={styles['edit-profile-form-error']}>{err.message}</p>}
                  </>
                );
              }}
            />
          </label>
          <label htmlFor="email">
            <p className={styles['edit-profile-form-label-name']}>Email address</p>
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
              render={({ field: { onChange, value }, fieldState: { error: err } }) => {
                return (
                  <>
                    <input
                      className={styles['edit-profile-form-input']}
                      type="email"
                      placeholder="Email address"
                      id="email"
                      value={value}
                      onChange={onChange}
                    />
                    {err && <p className={styles['edit-profile-form-error']}>{err.message}</p>}
                  </>
                );
              }}
            />
          </label>
          <label htmlFor="password">
            <p className={styles['edit-profile-form-label-name']}>New password</p>
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
              render={({ field: { onChange, value }, fieldState: { error: err } }) => {
                return (
                  <>
                    <input
                      className={styles['edit-profile-form-input']}
                      type="password"
                      placeholder="New password"
                      id="password"
                      value={value}
                      onChange={onChange}
                    />
                    {err && <p className={styles['edit-profile-form-error']}>{err.message}</p>}
                  </>
                );
              }}
            />
          </label>
          <label htmlFor="image">
            <p className={styles['edit-profile-form-label-name']}>Avatar image (url)</p>
            <Controller
              name="image"
              control={control}
              rules={{
                pattern: {
                  value: '' || urlRegEx,
                  message: messagePattern,
                },
              }}
              render={({ field: { onChange, value }, fieldState: { error: err } }) => {
                return (
                  <>
                    <input
                      className={styles['edit-profile-form-input']}
                      type="text"
                      placeholder="Avatar image"
                      id="image"
                      value={value}
                      onChange={onChange}
                    />
                    {err && <p className={styles['edit-profile-form-error']}>{err.message}</p>}
                  </>
                );
              }}
            />
          </label>
        </div>
        <div className={styles['edit-profile-form-actions']}>
          <button
            type="submit"
            className={styles['edit-profile-form-button']}
          >
            Save
          </button>
        </div>
      </form>
      {errorMessage}
    </>
  );
};

/*
<form
        className={styles['edit-profile-form']}
        onSubmit={onFormSubmit(updateUserProfile)}
      >
        <p className={styles['edit-profile-form-title']}>Edit profile</p>
        <div className={styles['edit-profile-form-input-group']}>
          <label htmlFor="username">
            <p className={styles['edit-profile-form-label-name']}>Username</p>
            <Controller
              render={({ field: { onChange, value, name }, fieldState: { invalid } }) => (
                <input
                  value={value}
                  onChange={onChange} // send value to hook form
                  className={styles['edit-profile-form-input']}
                  type="text"
                  placeholder="Username"
                  id="username"
                  name={name}
                />
              )}
              name="username"
              control={control}
            />
            {errors?.username && <p className={styles['edit-profile-form-error']}>{errors.username.message}</p>}
          </label>
          <label htmlFor="email">
            <p className={styles['edit-profile-form-label-name']}>Email address</p>
            <Controller
              render={({ field: { onChange, value, name }, fieldState: { invalid } }) => (
                <input
                  value={value}
                  onChange={onChange} // send value to hook form
                  className={styles['edit-profile-form-input']}
                  type="email"
                  placeholder="Email address"
                  id="email"
                  name={name}
                />
              )}
              name="email"
              control={control}
              defaultValue={userEmail}
            />
            {errors?.email && <p className={styles['edit-profile-form-error']}>{errors.email.message}</p>}
          </label>
          <label htmlFor="password">
            <p className={styles['edit-profile-form-label-name']}>New password</p>
            <Controller
              render={({ field: { onChange, value, name }, fieldState: { invalid } }) => (
                <input
                  value={value}
                  onChange={onChange} // send value to hook form
                  className={styles['edit-profile-form-input']}
                  type="password"
                  placeholder="New password"
                  id="password"
                  name={name}
                />
              )}
              name="password"
              control={control}
            />
            {errors?.password && <p className={styles['edit-profile-form-error']}>{errors.password.message}</p>}
          </label>
          <label htmlFor="image">
            <p className={styles['edit-profile-form-label-name']}>Avatar image (url)</p>
            <Controller
              render={({ field: { onChange, value, name }, fieldState: { invalid } }) => (
                <input
                  value={value}
                  onChange={onChange} // send value to hook form
                  className={styles['edit-profile-form-input']}
                  type="text"
                  placeholder="Avatar image"
                  id="image"
                  name={name}
                />
              )}
              name="image"
              control={control}
              defaultValue={userImage}
            />
            {errors?.image && <p className={styles['edit-profile-form-error']}>{errors.image.message}</p>}
          </label>
        </div>
        <div className={styles['edit-profile-form-actions']}>
          <button
            type="submit"
            className={styles['edit-profile-form-button']}
          >
            Save
          </button>
        </div>
      </form>
 */
