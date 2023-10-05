import { Tag } from 'components/shared/article-form/article-form';

export const addIdToTags = (list: string[]): { name: string; id: number }[] => {
  let id = 0;
  return list.map((tag) => {
    const tagWithId = { name: tag, id };
    id += 1;
    return tagWithId;
  });
};

export const prepareTags = (tags: Tag[] | undefined): string[] => {
  if (!tags) {
    return [];
  }
  return tags.map((tag) => tag.name);
};
