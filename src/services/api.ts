export async function getData(url: string) {
  const response = await fetch(url);
  if (response.status < 300) {
    const data = await response.json();
    return data;
  }
  return response;
}
