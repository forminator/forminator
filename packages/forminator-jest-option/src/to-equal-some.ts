import { isOption, some } from '@forminator/option';
import {
  printExpectedOption,
  printMessage,
  printReceivedNone,
  printReceivedOption,
} from './print-utils';

export const toEqualSome: jest.CustomMatcher = function <E>(
  this: jest.MatcherContext,
  received: any,
  expected: E,
) {
  const isNone = isOption(received) && received.isNone();
  const isSome = isOption(received) && received.isSome();
  const eq =
    isSome &&
    this.equals(received.value, expected, [this.utils.iterableEquality]);

  const pass = isSome && eq;
  const printableExpected = expected;
  const expectedLabel = undefined;

  if (pass) {
    return {
      message: () => {
        return printMessage(this, '.toEqualSome', {
          expectedLabel,
          expected: 'not ' + printExpectedOption(this, some(printableExpected)),
          received: printReceivedOption(this, received),
        });
      },
      pass: true,
    };
  }

  if (isNone) {
    return {
      message: () => {
        return printMessage(this, '.toEqualSome', {
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
        return printMessage(this, '.toEqualSome', {
          expectedLabel,
          comment: 'deep equality',
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
      return printMessage(this, '.toEqualSome', {
        expectedLabel,
        received: this.utils.printReceived(received),
        expected: printExpectedOption(this, some(printableExpected)),
      });
    },
    pass: false,
  };
};
