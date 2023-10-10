import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  deleteArticleFromServer,
  getArticle,
  sendArticle,
  sendFavoritedSlug,
  sendUnfavoritedSlug,
  updateArticleOnServer,
} from 'services/blog-service';
import { createError, ServiceError } from 'utilities/errors';
import { ArticleFormInput, Tag } from 'components/shared/article-form/article-form';
import { getLoginToken } from 'services/storage-service';

import { Article } from './articleSlice';

const prepareTags = (tags: Tag[] | undefined): string[] => {
  if (!tags) {
    return [];
  }
  return tags.map((tag) => tag.name);
};

type LoadArticlePayloadProps = {
  id: string;
};

export const loadArticle = createAsyncThunk<Article, LoadArticlePayloadProps, { rejectValue: ServiceError }>(
  'articles/loadArticle',
  async ({ id }, { rejectWithValue }) => {
    const token = getLoginToken();
    try {
      return await getArticle({ id, token });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

type SendArticlePayloadProps = {
  data: ArticleFormInput;
};

export const createArticle = createAsyncThunk<Article, SendArticlePayloadProps, { rejectValue: ServiceError }>(
  'articles/createArticle',
  async ({ data: formData }, { rejectWithValue }) => {
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
  }
);

type UpdateArticlePayloadProps = {
  slug: string;
  data: ArticleFormInput;
};

export const updateArticle = createAsyncThunk<Article, UpdateArticlePayloadProps, { rejectValue: ServiceError }>(
  'articles/updateArticle',
  async ({ slug, data: formData }, { rejectWithValue }) => {
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
      return await updateArticleOnServer({ slug, data, token });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteArticle = createAsyncThunk<void, string, { rejectValue: ServiceError }>(
  'articles/deleteArticle',
  async (slug, { rejectWithValue }) => {
    const token = getLoginToken();
    if (!token) {
      const error = createError('No login token for this email');
      return rejectWithValue(error);
    }
    try {
      return await deleteArticleFromServer({ slug, token });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const favoriteArticle = createAsyncThunk<Article, string, { rejectValue: ServiceError }>(
  'articles/favoriteArticle',
  async (slug, { rejectWithValue }) => {
    const token = getLoginToken();
    if (!token) {
      const error = createError('No login token for this email');
      return rejectWithValue(error);
    }
    try {
      return await sendFavoritedSlug({ slug, token });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const unfavoriteArticle = createAsyncThunk<Article, string, { rejectValue: ServiceError }>(
  'articles/unfavoriteArticle',
  async (slug, { rejectWithValue }) => {
    const token = getLoginToken();
    if (!token) {
      const error = createError('No login token for this email');
      return rejectWithValue(error);
    }
    try {
      return await sendUnfavoritedSlug({ slug, token });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
