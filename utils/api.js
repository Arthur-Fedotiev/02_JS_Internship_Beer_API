export function queryApi(url) {
  return fetch(url).then((response) =>
    response.status === 200
      ? response.json()
      : Promise.reject("Response is unsuccessfull")
  );
}

export async function getBeerItems(query) {
  try {
    const url = `https://api.punkapi.com/v2/beers?page=1&per_page=10&beer_name=${query}`;
    const beerItems = await queryApi(url);
    console.log(beerItems);
    return beerItems;
  } catch (err) {
    throw new Error(err);
  }
}
