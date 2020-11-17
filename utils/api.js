export function getBeers(query, page = 1, perPage = 5) {
  const url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}&beer_name=${query}`;
  return fetch(url).then(handleResponse).catch(handleError);
}

export async function handleResponse(response) {
  //await sleep();
  if (response.ok) return response.json();
  if (response.status === 400) {
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("API response was not ok!");
}

export function handleError(error) {
  console.error("API call failed. " + error);
  throw error;
}
// eslint-disable-next-line
function sleep(delay = 1000) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
