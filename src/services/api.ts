export const getData = async (url, token: null | string = null) => {
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
  data;
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
  data;
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
