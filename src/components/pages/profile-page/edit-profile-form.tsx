import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Spin } from 'antd';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { clsx } from 'clsx';

import { useAppSelector, useAppDispatch } from 'hooks/hooks';
import { updateProfile, EditProfileFormInput } from 'redux-toolkit/profile/profileThunks';
import {
  emailRegEx,
  linkPaths,
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
import { getValidationResultErrorMessage, hasError401 } from 'utilities/errors';

import styles from './edit-profile-form.module.scss';

export const EditProfileForm: React.FC = () => {
  const userName = useAppSelector((state) => state.profile.userName) || '';
  const userImage = useAppSelector((state) => state.profile.image) || '';
  const userEmail = useAppSelector((state) => state.profile.email) || '';
  const isLoading = useAppSelector((state) => state.profile.isLoading);
  const isUpdating = useAppSelector((state) => state.profile.isUpdating);
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
    image: yup.string().matches(urlRegEx, { excludeEmptyString: true, message: messagePattern }),
  });
  const {
    handleSubmit: onFormSubmit,
    control,
    setValue,
    formState: { errors },
    resetField,
  } = useForm<EditProfileFormInput>({
    mode: 'onChange',
    resolver: yupResolver<EditProfileFormInput>(schema),
  });
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { pathToSignIn } = linkPaths;
  const updateUserProfile: SubmitHandler<EditProfileFormInput> = (data, event) => {
    if (isLoading || isUpdating) {
      return;
    }
    event?.preventDefault();
    dispatch(updateProfile({ data }));
    resetField('password');
  };
  const profileError = useAppSelector((state) => state.profile.error);
  const errorMessage = profileError ? (
    <Alert
      message={profileError.message}
      type="error"
    />
  ) : null;
  const validationResultErrorMessage =
    profileError && getValidationResultErrorMessage(profileError) ? (
      <Alert message={getValidationResultErrorMessage(profileError)} />
    ) : null;
  const loadSpinner = isLoading || isUpdating ? <Spin /> : null;
  useEffect(() => {
    setValue('username', userName);
  }, [userName]);
  useEffect(() => {
    setValue('email', userEmail);
  }, [userEmail]);
  useEffect(() => {
    setValue('image', userImage);
  }, [userImage]);
  useEffect(() => {
    if (hasError401(profileError)) {
      history.push(pathToSignIn);
    }
  }, [profileError]);
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
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <input
                      className={clsx(styles['edit-profile-form-input'], {
                        [styles['edit-profile-form-input--invalid']]: !!errors.username,
                      })}
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
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <input
                      className={clsx(styles['edit-profile-form-input'], {
                        [styles['edit-profile-form-input--invalid']]: !!errors.email,
                      })}
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
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <input
                      className={clsx(styles['edit-profile-form-input'], {
                        [styles['edit-profile-form-input--invalid']]: !!errors.password,
                      })}
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
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <input
                      className={clsx(styles['edit-profile-form-input'], {
                        [styles['edit-profile-form-input--invalid']]: !!errors.image,
                      })}
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
            disabled={isLoading || isUpdating}
          >
            Save
          </button>
        </div>
      </form>
      {loadSpinner}
      {errorMessage}
      {validationResultErrorMessage}
    </>
  );
};
