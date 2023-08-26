import { format } from 'date-fns';

export const getDate = (date) => {
  return format(new Date(date), 'MMMM dd, yyyy');
};
