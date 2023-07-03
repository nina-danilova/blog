import { sendData } from '../../../services/api';

export const registerNewUser = (evt) => {
  evt.preventDefault();
  const formData = evt.target.form;
  const data = {
    user: {
      username: formData.username.value,
      email: formData.email.value,
      password: formData.password.value,
    },
  };
  sendData('https://blog.kata.academy/api/users', data).then((response) =>
    localStorage.setItem(`${response.user.email}-token`, response.user.token)
  );
};
