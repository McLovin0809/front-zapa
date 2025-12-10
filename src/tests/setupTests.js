// src/test/setupTests.js
import * as matchers from '@testing-library/jasmine-dom';

beforeAll(() => {
  jasmine.getEnv().addMatchers(matchers);
});
