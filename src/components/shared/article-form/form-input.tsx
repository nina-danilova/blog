import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { clsx } from 'clsx';

import { ArticleFormInput } from './article-form';
import styles from './article-form.module.scss';

type FormInputProps = {
  labelName: string;
  name: string;
  control: Control<any>;
  errorsObject: FieldErrors<ArticleFormInput>;
};

export const FormInput: React.FC<FormInputProps> = ({ labelName, name, control, errorsObject }: FormInputProps) => {
  return (
    <label>
      <p className={styles['article-form-label-name']}>{labelName}</p>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <>
              <input
                className={clsx(styles['article-form-input'], {
                  [styles['article-form-input--invalid']]: !!errorsObject[name],
                })}
                type="text"
                placeholder={labelName}
                value={value || ''}
                onChange={onChange}
              />
              {errorsObject[name] && <p className={styles['article-form-error']}>{errorsObject[name].message}</p>}
            </>
          );
        }}
      />
    </label>
  );
};
