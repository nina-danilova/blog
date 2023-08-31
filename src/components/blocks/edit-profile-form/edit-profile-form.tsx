import React from 'react';
import { useHistory } from 'react-router-dom';
import { Alert } from 'antd';
import { useSelector } from 'react-redux';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
} from '../../../utilities/constants';

import styles from './edit-profile-form.module.scss';
import { onInputValueChange } from './utility';

type EditProfileFormInput = {
  username: string;
  email: string;
  password: string;
  image?: string | null | undefined;
};

export const EditProfileForm: React.FC = () => {
  const editProfileSchema = yup.object().shape({
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
    image: yup.string().nullable().optional().url(messagePattern),
  });
  const userName = useSelector((state: RootState) => state.user.profile?.userName) || '';
  const {
    register,
    formState: { errors },
    handleSubmit: onFormSubmit,
    control,
  } = useForm({ resolver: yupResolver(editProfileSchema) });
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

  const userEmail = useSelector((state: RootState) => state.user.profile?.email) || '';
  const userImage = useSelector((state: RootState) => state.user.profile?.image) || '';
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
              render={({ field: { onChange, value = userName, name }, fieldState: { invalid } }) => (
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
              rules={{
                required: true,
                minLength: 3,
                maxLength: 20,
              }}
            />
            {errors?.username && <p className={styles['edit-profile-form-error']}>{errors.username.message}</p>}
          </label>
          <label>
            <p className={styles['edit-profile-form-label-name']}>Email address</p>
            <input
              className={styles['edit-profile-form-input']}
              type="email"
              placeholder="Email address"
              required
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...register('email')}
              defaultValue={userEmail}
              onChange={onInputValueChange}
            />
            {errors?.email && <p className={styles['edit-profile-form-error']}>{errors.email.message}</p>}
          </label>
          <label>
            <p className={styles['edit-profile-form-label-name']}>New password</p>
            <input
              className={styles['edit-profile-form-input']}
              type="password"
              placeholder="New password"
              minLength={6}
              maxLength={40}
              required
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...register('password')}
            />
            {errors?.password && <p className={styles['edit-profile-form-error']}>{errors.password.message}</p>}
          </label>
          <label>
            <p className={styles['edit-profile-form-label-name']}>Avatar image (url)</p>
            <input
              className={styles['edit-profile-form-input']}
              type="text"
              placeholder="Avatar image"
              defaultValue={userImage}
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...register('image')}
              onChange={onInputValueChange}
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
      {errorMessage}
    </>
  );
};
