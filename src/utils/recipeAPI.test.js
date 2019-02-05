import mockAxios from 'jest-mock-axios';

import * as APICalls from './recipeAPI';

afterEach(() => {
  mockAxios.reset();
});

test('getRecipeById is called', () => {
  const spy = jest.spyOn(APICalls, 'getRecipeById');
  const call = APICalls.getRecipeById(12345);

  expect(APICalls.getRecipeById).toHaveBeenCalled();
});

test('getRecipeById is called with correct data', () => {
  const spy = jest.spyOn(APICalls, 'getRecipeById');
  const call = APICalls.getRecipeById(12345);

  expect(APICalls.getRecipeById).toHaveBeenCalledWith(12345);
});

test('searchRecipesByQuery is called', () => {
  const spy = jest.spyOn(APICalls, 'searchRecipesByQuery');
  const call = APICalls.searchRecipesByQuery('apple', 10);

  expect(APICalls.searchRecipesByQuery).toHaveBeenCalled();
});

test('searchRecipesByQuery is called with corrects datas', () => {
  const spy = jest.spyOn(APICalls, 'searchRecipesByQuery');
  const call = APICalls.searchRecipesByQuery('apple', 10);

  expect(APICalls.searchRecipesByQuery).toHaveBeenCalledWith('apple', 10);
});
