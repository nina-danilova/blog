import { createAsyncThunk } from '@reduxjs/toolkit';

import { getArticle, sendArticle } from 'services/blog-service';
import { createError, ServiceError } from 'utilities/errors';
import { ArticleFormInput, Tag } from 'components/pages/new-article-page/article-form';
import { getLoginToken } from 'services/storage-service';

import { Article } from './articleSlice';

type LoadArticlePayloadProps = {
  id: string;
};

export const loadArticle = createAsyncThunk<Article, LoadArticlePayloadProps, { rejectValue: ServiceError | unknown }>(
  'articles/loadArticle',
  async ({ id }, { rejectWithValue }) => {
    try {
      return await getArticle(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const prepareTags = (tags: Tag[] | undefined): string[] => {
  if (!tags) {
    return [];
  }
  return tags.map((tag) => tag.name);
};

type SendArticlePayloadProps = {
  event;
  data: ArticleFormInput;
};

export const createArticle = createAsyncThunk<
  Article,
  SendArticlePayloadProps,
  { rejectValue: ServiceError | unknown }
>('articles/sendArticle', async ({ event, data: formData }, { rejectWithValue }) => {
  event.preventDefault();
  const token = getLoginToken();
  if (!token) {
    const error = createError('No login token for this email');
    return rejectWithValue(error);
  }
  const preparedTags = prepareTags(formData.tags);
  const data = {
    article: {
      title: formData.title,
      description: formData.description,
      body: formData.body,
      tagList: preparedTags,
    },
  };
  try {
    return await sendArticle({ data, token });
  } catch (error) {
    return rejectWithValue(error);
  }
});
