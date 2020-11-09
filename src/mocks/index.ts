import moment from 'moment';
import { Post } from '../types';

export const basePost: Post = {
  id: 1,
  title: 'Base post',
  markdown: 'Content',
  html: '<p>Content</p>',
  authorId: 1,
  created: moment(),
};

export const todayPost: Post = {
  ...basePost,
  id: 1,
  title: 'Today',
};

export const thisWeekPost: Post = {
  ...basePost,
  id: 2,
  title: 'This week',
  created: moment().subtract(2, 'days'),
};

export const thisMonthPost: Post = {
  ...basePost,
  id: 3,
  title: 'This month',
  created: moment().subtract(2, 'weeks'),
};
