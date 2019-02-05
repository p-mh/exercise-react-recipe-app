import { incrementFirstResult } from './stateManagement';

test('incrementFirstResult with {firstResult:10} to be an object with firstResult as key', () => {
  expect(incrementFirstResult({ firstResult: 10 })).toHaveProperty(
    'firstResult'
  );
});

test('incrementFirstResult with {firstResult:10} to be {firstResult: 15}', () => {
  expect(incrementFirstResult({ firstResult: 10 })).toEqual({
    firstResult: 15,
  });
});
