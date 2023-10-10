import * as yup from 'yup';

import { messageRequired, messageTagMaxLength, messageTitleMaxLength } from 'utilities/constants';

export const schema = yup.object().shape({
  title: yup.string().max(200, messageTitleMaxLength).required(messageRequired),
  description: yup.string().required(messageRequired),
  body: yup.string().required(messageRequired),
  tags: yup.array(
    yup.object().shape({
      name: yup.string().max(20, messageTagMaxLength).required(messageRequired),
    })
  ),
  'new-tag': yup.string(),
});
