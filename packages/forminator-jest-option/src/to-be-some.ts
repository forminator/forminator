import { isOption, some } from '@forminator/option';
import {
  printExpectedOption,
  printMessage,
  printReceivedNone,
  printReceivedOption,
} from './print-utils';

export const toBeSome: jest.CustomMatcher = function <E>(
  this: jest.MatcherContext,
  received: any,
  expected?: E,
) {
  const isNone = isOption(received) && received.isNone();
  const isSome = isOption(received) && received.isSome();
  const is = isSome && Object.is(received.value, expected);

  const hasExpected = typeof expected !== 'undefined';
  const pass = isSome && (!hasExpected || is);
  const printableExpected = hasExpected ? expected : expect.anything();
  const expectedLabel = hasExpected ? undefined : '';

  if (pass) {
    return {
      message: () => {
        return printMessage(this, '.toBeSome', {
          expectedLabel,
          expected: 'not ' + printExpectedOption(this, some(printableExpected)),
          received: hasExpected
            ? undefined
            : printReceivedOption(this, received),
        });
      },
      pass: true,
    };
  }

  if (isNone) {
    return {
      message: () => {
        return printMessage(this, '.toBeSome', {
          expectedLabel,
          received: printReceivedNone(this),
          expected: printExpectedOption(this, some(printableExpected)),
        });
      },
      pass: false,
    };
  }

  if (isSome) {
    return {
      message: () => {
        return printMessage(this, '.toBeSome', {
          expectedLabel,
          comment: 'some with different value',
          diff: {
            received: received.value,
            expected: expected,
          },
        });
      },
      pass: false,
    };
  }

  return {
    message: () => {
      return printMessage(this, '.toBeSome', {
        expectedLabel,
        received: this.utils.printReceived(received),
        expected: printExpectedOption(this, some(printableExpected)),
      });
    },
    pass: false,
  };
};
