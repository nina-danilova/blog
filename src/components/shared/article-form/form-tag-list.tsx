import React from 'react';
import { Control, Controller, FieldArrayWithId, FieldErrors, UseFieldArrayRemove } from 'react-hook-form';
import { clsx } from 'clsx';

import { ArticleFormInput } from './article-form';
import styles from './article-form.module.scss';

type FormTagListProps = {
  fields: FieldArrayWithId<ArticleFormInput, 'tags', 'id'>[];
  control: Control<any>;
  errorsObject: FieldErrors<ArticleFormInput>;
  remove: UseFieldArrayRemove;
};

export const FormTagList: React.FC<FormTagListProps> = ({
  fields,
  control,
  errorsObject,
  remove,
}: FormTagListProps) => {
  const removeTag = (index: number) => () => {
    remove(index);
  };
  return (
    <>
      {fields.map((item, index) => (
        <li key={item.id}>
          <label className={styles['article-form-tag']}>
            <p className={styles['visually-hidden']}>{`tags.${index}`}</p>
            <Controller
              name={`tags.${index}.name` as const}
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <input
                      className={clsx(styles['article-form-input'], styles['article-form-input--tag'], {
                        [styles['article-form-input--invalid']]: !!errorsObject.tags,
                      })}
                      type="text"
                      placeholder="Tag"
                      value={value || ''}
                      onChange={onChange}
                    />
                    <button
                      className={clsx(styles['article-form-tag-button'], styles['article-form-tag-button--delete'])}
                      type="button"
                      onClick={removeTag(index)}
                    >
                      Delete
                    </button>
                    {errorsObject.tags?.[index] && (
                      <span className={styles['article-form-error']}>{errorsObject.tags?.[index]?.name?.message}</span>
                    )}
                  </>
                );
              }}
            />
          </label>
        </li>
      ))}
    </>
  );
};
