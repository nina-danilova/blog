export const addIdToTags = (list: string[]): { name: string; id: number }[] => {
  let id = 0;
  return list.map((tag) => {
    const tagWithId = { name: tag, id };
    id += 1;
    return tagWithId;
  });
};
