export async function getData(url: string) {
  const response = await fetch(url);
  if (response.status < 300) {
    const data = await response.json();
    return data;
  }
  return response;
}

export async function sendData(url, data, token: null | string = null) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}
