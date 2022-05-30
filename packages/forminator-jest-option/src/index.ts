/// <reference path="jest.d.ts" />
import * as matchers from './matchers';

const jestExpect = expect;

/* istanbul ignore else */
if (jestExpect !== undefined) {
  jestExpect.extend(matchers);
} else {
  throw new Error("Unable to find Jest's global expect.");
}
