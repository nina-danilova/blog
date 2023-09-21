import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert } from 'antd';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { updateProfile, EditProfileFormInput } from 'redux-toolkit/profile/profileThunks';
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

export const EditProfileForm: React.FC = () => {
  const userName = useAppSelector((state) => state.profile.userName) || '';
  const userImage = useAppSelector((state) => state.profile.image) || '';
  const userEmail = useAppSelector((state) => state.profile.email) || '';
  const {
    handleSubmit: onFormSubmit,
    control,
    setValue,
    formState: { errors },
    resetField,
  } = useForm<EditProfileFormInput>({
    mode: 'onChange',
  });
  const dispatch = useAppDispatch();
  const history = useHistory();
  const updateUserProfile: SubmitHandler<EditProfileFormInput> = (data, event) => {
    dispatch(updateProfile({ event, history, data }));
    resetField('password');
  };
  const error = useAppSelector((state) => state.profile?.profileError);
  const errorMessage = error ? (
    <Alert
      message={error.message}
      type="error"
    />
  ) : null;
  useEffect(() => {
    setValue('username', userName);
  }, [userName]);
  useEffect(() => {
    setValue('email', userEmail);
  }, [userEmail]);
  useEffect(() => {
    setValue('image', userImage);
  }, [userImage]);
  return (
    <>
      <form
        className={styles['edit-profile-form']}
        onSubmit={onFormSubmit(updateUserProfile)}
      >
        <p className={styles['edit-profile-form-title']}>Edit profile</p>
        <div className={styles['edit-profile-form-input-group']}>
          <label>
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
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <input
                      className={styles['edit-profile-form-input']}
                      type="text"
                      placeholder="Username"
                      value={value || ''}
                      onChange={onChange}
                    />
                    {errors?.username && (
                      <p className={styles['edit-profile-form-error']}>
                        {errors.username.message || 'Validation error'}
                      </p>
                    )}
                  </>
                );
              }}
            />
          </label>
          <label>
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
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <input
                      className={styles['edit-profile-form-input']}
                      type="email"
                      placeholder="Email address"
                      value={value || ''}
                      onChange={onChange}
                    />
                    {errors?.email && (
                      <p className={styles['edit-profile-form-error']}>{errors.email.message || 'Validation error'}</p>
                    )}
                  </>
                );
              }}
            />
          </label>
          <label>
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
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <input
                      className={styles['edit-profile-form-input']}
                      type="password"
                      placeholder="New password"
                      value={value || ''}
                      onChange={onChange}
                    />
                    {errors?.password && (
                      <p className={styles['edit-profile-form-error']}>
                        {errors.password.message || 'Validation error'}
                      </p>
                    )}
                  </>
                );
              }}
            />
          </label>
          <label>
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
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <input
                      className={styles['edit-profile-form-input']}
                      type="text"
                      placeholder="Avatar image"
                      value={value || ''}
                      onChange={onChange}
                    />
                    {errors?.image && (
                      <p className={styles['edit-profile-form-error']}>{errors.image.message || 'Validation error'}</p>
                    )}
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
