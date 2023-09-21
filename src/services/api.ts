export const getData = async (url: string, token: null | string = null) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  });
};

type UpdateDataProps = {
  url: string;
  data: {
    user: {
      email: string;
      username: string;
      image: string | null;
      password: string;
    };
  };
  token: null | string;
};

export const updateData = async ({ url, data, token = null }: UpdateDataProps) => {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  });
};

type SendDataProps = {
  url: string;
  data: {
    user: {
      username?: string;
      email: string;
      password: string;
    };
  };
  token?: null | string;
};

export const sendData = async ({ url, data, token = null }: SendDataProps) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  });
};
