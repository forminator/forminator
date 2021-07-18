import '@testing-library/jest-dom/extend-expect';
import {
  mockConsoleError,
  simpleConsoleLog,
} from './test-utils/mock-console-error';

mockConsoleError();
simpleConsoleLog();
