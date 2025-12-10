// src/test/setupTests.js
import * as matchers from '@testing-library/jasmine-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

beforeAll(() => {
  jasmine.getEnv().addMatchers(matchers);
});
