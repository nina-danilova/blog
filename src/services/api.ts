export async function getData(url: string, token: null | string = null) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  });
  if ((response.status >= 200 && response.status < 300) || response.status === 422) {
    return response.json();
  }
  const error = new Error(`Error code ${response.status.toString()}`);
  error.response = response;
  throw error;
}

/* export async function sendData(url, data, token: null | string = null) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response;
} */

export async function sendLogInInfo(url, data, token: null | string = null) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  });
  if ((response.status >= 200 && response.status < 300) || response.status === 422) {
    return response.json();
  }
  const error = new Error(`Error code ${response.status.toString()}`);
  error.response = response;
  throw error;
}

export async function sendRegisterInfo(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });
  if ((response.status >= 200 && response.status < 300) || response.status === 422) {
    return response.json();
  }
  const error = new Error(`Error code ${response.status.toString()}`);
  error.response = response;
  throw error;
}

export async function sendProfileInfo(url, data, token: null | string = null) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  });
  if ((response.status >= 200 && response.status < 300) || response.status === 422) {
    return response.json();
  }
  const error = new Error(`Error code ${response.status.toString()}`);
  error.response = response;
  throw error;
}
