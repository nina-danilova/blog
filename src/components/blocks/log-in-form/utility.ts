import { sendData } from '../../../services/api';
import { store } from '../../../redux/store';
import { userLoginSuccess } from '../../../redux/action-creators/user';

export const logIn = (evt) => {
  evt.preventDefault();
  const formData = evt.target.form;
  const data = {
    user: {
      email: formData.email.value,
      password: formData.password.value,
    },
  };
  const token = localStorage.getItem(`${data.user.email}-token`);
  sendData('https://blog.kata.academy/api/users/login', data, token).then((response) => {
    localStorage.setItem(`${response.user.email}-login-token`, response.user.token);
    store.dispatch(userLoginSuccess(response));
  });
};
