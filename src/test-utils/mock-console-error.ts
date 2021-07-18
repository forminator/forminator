/* istanbul ignore file */
import { CustomConsole, LogMessage, LogType } from '@jest/console';
import util from 'util';

export function mockConsoleError() {
  beforeEach(() => {
    const { error: originalError } = console;
    jest.spyOn(console, 'error').mockImplementation((...args) => {
      originalError(...args);
      // @ts-ignore
      const error = util.format.apply(this, args);
      throw new Error(error);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
}

export function silenceConsoleError() {
  jest.spyOn(console, 'error').mockImplementation(() => {});
}

export function simpleConsoleLog() {
  function simpleFormatter(type: LogType, message: LogMessage): string {
    const TITLE_INDENT = '    ';
    const CONSOLE_INDENT = TITLE_INDENT + '  ';

    return message
      .split(/\n/)
      .map((line) => CONSOLE_INDENT + line)
      .join('\n');
  }

  global.console = new CustomConsole(
    process.stdout,
    process.stderr,
    simpleFormatter,
  );
}
