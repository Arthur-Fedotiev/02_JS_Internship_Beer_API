import { isEmpty } from "./validate.js";
import CONSTANT from "../src/constants.js";

export function getBeers(query, page = 1, perPage = 5) {
  const url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}&beer_name=${query}`;

  return fetch(url).then(handleResponse).catch(handleError);
}

export async function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }

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

export const actionOnServerResponse = (receivedBeerItems) => {
  return isEmpty(receivedBeerItems)
    ? CONSTANT.SERVER_RESPONSE_IS_EMPTY
    : CONSTANT.SERVER_RESPONDED_WITH_BEERS;
};

export const someBeersWereRendered = (beerItems) => {
  return !isEmpty(beerItems);
};
