import { isOption, none } from '@forminator/option';
import {
  printExpectedOption,
  printMessage,
  printReceivedOption,
} from './print-utils';

export const toBeNone: jest.CustomMatcher = function (
  this: jest.MatcherContext,
  received: any,
) {
  const isNone = isOption(received) && received.isNone();
  const isSome = isOption(received) && received.isSome();

  if (isNone) {
    return {
      message: () => {
        return printMessage(this, '.teBeNone', {
          expectedLabel: '',
          expected: 'not ' + printExpectedOption(this, none()),
          received: printReceivedOption(this, received),
        });
      },
      pass: true,
    };
  }

  if (isSome) {
    return {
      message: () => {
        return printMessage(this, '.teBeNone', {
          expectedLabel: '',
          expected: printExpectedOption(this, none()),
          received: printReceivedOption(this, received),
        });
      },
      pass: false,
    };
  }

  return {
    message: () => {
      return printMessage(this, '.teBeNone', {
        expectedLabel: '',
        expected: printExpectedOption(this, none()),
        received: this.utils.printReceived(received),
      });
    },
    pass: false,
  };
};
