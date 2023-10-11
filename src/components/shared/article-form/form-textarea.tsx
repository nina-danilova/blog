import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { clsx } from 'clsx';

import { ArticleFormInput } from './article-form';
import styles from './article-form.module.scss';

type FormTextareaProps = {
  labelName: string;
  name: string;
  control: Control<any>;
  errorsObject: FieldErrors<ArticleFormInput>;
  rowCount: number;
};

export const FormTextarea: React.FC<FormTextareaProps> = ({
  labelName,
  name,
  control,
  errorsObject,
  rowCount,
}: FormTextareaProps) => {
  return (
    <label>
      <p className={styles['article-form-label-name']}>{labelName}</p>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <>
              <textarea
                className={clsx(styles['article-form-input'], {
                  [styles['article-form-input--invalid']]: !!errorsObject[name],
                })}
                placeholder={labelName}
                rows={rowCount}
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
