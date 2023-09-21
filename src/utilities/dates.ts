import { format } from 'date-fns';

export const getDate = (date: string): string => {
  return format(new Date(date), 'MMMM dd, yyyy');
};
