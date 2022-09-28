import { Option, Some } from '@forminator/option';

const EXPECTED_LABEL = 'Expected';
const RECEIVED_LABEL = 'Received';

export const printReceivedNone = (self: jest.MatcherContext) => {
  const { RECEIVED_COLOR } = self.utils;
  return `${RECEIVED_COLOR(`none()`)}`;
};
export const printReceivedSome = (
  self: jest.MatcherContext,
  received: Some<any>,
) => {
  const { RECEIVED_COLOR } = self.utils;
  return `${RECEIVED_COLOR(
    `some(${self.utils.printReceived(received.unwrap())})`,
  )}`;
};
export const printExpectedNone = (self: jest.MatcherContext) => {
  const { EXPECTED_COLOR } = self.utils;
  return `${EXPECTED_COLOR(`none()`)}`;
};
export const printExpectedSome = (
  self: jest.MatcherContext,
  expected: Some<any>,
) => {
  const { EXPECTED_COLOR } = self.utils;
  return `${EXPECTED_COLOR(
    `some(${self.utils.printExpected(expected.unwrap())})`,
  )}`;
};
export const printReceivedOption = (
  self: jest.MatcherContext,
  received: Option<any>,
) => {
  if (received.isNone()) {
    return printReceivedNone(self);
  }
  return printReceivedSome(self, received);
};
export const printExpectedOption = (
  self: jest.MatcherContext,
  expected: Option<any>,
) => {
  if (expected.isNone()) {
    return printExpectedNone(self);
  }
  return printExpectedSome(self, expected);
};

export const printMessage = (
  self: jest.MatcherContext,
  matcherName: string,
  options: {
    comment?: string;
    receivedLabel?: string;
    expectedLabel?: string;
    received?: string;
    expected?: string;
    diff?: {
      received: any;
      expected: any;
    };
  },
) => {
  const { comment, received, expected, receivedLabel, expectedLabel } = options;
  const hintOptions = {
    comment,
    isNot: self.isNot,
    promise: self.promise,
  };
  let message =
    self.utils.matcherHint(
      matcherName,
      receivedLabel,
      expectedLabel,
      hintOptions,
    ) + '\n\n';
  if (expected) {
    message += `Expected: ${expected}\n`;
  }
  if (received) {
    message += `Received: ${received}\n`;
  }

  if (options.diff) {
    message +=
      self.utils.printDiffOrStringify(
        options.diff.expected,
        options.diff.received,
        EXPECTED_LABEL,
        RECEIVED_LABEL,
        self.expand,
      ) + '\n';
  }
  return message;
};
