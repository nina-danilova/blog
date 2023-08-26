import { store } from '../../../redux/store';
import {
  updateProfileFormEmail,
  updateProfileFormImageUrl,
  updateProfileFormUserName,
} from '../../../redux/action-creators/profile';

export const onInputValueChange = (evt) => {
  switch (evt.target.name) {
    case 'username': {
      store.dispatch(updateProfileFormUserName(evt.target.value));
      break;
    }
    case 'email': {
      store.dispatch(updateProfileFormEmail(evt.target.value));
      break;
    }
    case 'image': {
      store.dispatch(updateProfileFormImageUrl(evt.target.value));
      break;
    }
    default:
  }
};
