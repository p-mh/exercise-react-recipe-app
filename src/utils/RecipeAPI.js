import axios from 'axios';

import { APP_ID, APP_KEY } from './auth';

const BASE_URL = 'https://api.edamam.com/search';

export const getRecipeById = uri => {
  const formatUri = encodeURIComponent(uri);
  return axios.get(
    `${BASE_URL}?r=${formatUri}&app_id=${APP_ID}&app_key=${APP_KEY}`
  );
};

export const searchRecipesByQuery = (query, firstResult = 0) =>
  axios.get(
    `${BASE_URL}?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${firstResult}&to=${firstResult +
      10}`
  );
