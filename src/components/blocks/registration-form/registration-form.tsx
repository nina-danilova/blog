import React from 'react';

import styles from './registration-form.module.scss';

export const RegistrationForm = () => {
  return (
    <form
      className={styles['registration-form']}
      method="POST"
      action="https://blog.kata.academy"
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
            name="username"
            placeholder="Username"
            required
          />
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
            name="email"
            placeholder="Email address"
            required
          />
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
            name="password"
            placeholder="Password"
            required
          />
        </label>
        <label
          htmlFor="repeat-password"
          className="registration-form-label"
        >
          <p className={styles['registration-form-label-name']}>Repeat Password</p>
          <input
            className={styles['registration-form-input']}
            type="password"
            id="repeat-password"
            name="repeat-password"
            placeholder="Password"
            required
          />
        </label>
      </div>
      <div className={styles['registration-form-agreement']}>
        <input
          className={`${styles['registration-form-input']} ${styles['registration-form-input--agreement']} ${styles['visually-hidden']}`}
          id="personal-info-agreement"
          name="personal-info-agreement"
          type="checkbox"
          required
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          className={`registration-form-label ${styles['registration-form-label--agreement']}`}
          htmlFor="personal-info-agreement"
        >
          <p
            className={`registration-form-label-name ${styles['registration-form-label-name--agreement']}`}
          >
            I agree to the processing of my personal information
          </p>
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
  );
};
