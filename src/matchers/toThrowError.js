import _ from 'lodash';
import stringify from '../stringify';

const parseMessage = error => (
  error ?
    'Instead, it threw:\n' +
    `  ${stringify(error)}`
  :
    'But it didn\'t throw anything.'
);

const toThrowMatchingError = (
  error: ?Error,
  ErrorClass: typeof Error,
) => {
  const pass = !!(error && error instanceof ErrorClass);

  const message = (isNot) => (
    isNot ?
      '.not.toThrowError\n\n' +
      'Expeced the function not to throw an error of type:\n' +
      `  ${ErrorClass.name}\n` +
      `But it threw:\n` +
      `  ${stringify(error)}`
    :
      '.toThrowError\n\n' +
      'Expected the function to throw an error of type:\n' +
      `  ${ErrorClass.name}\n` +
      `${parseMessage(error)}`
  );

  return { pass, message };
};

const toThrowMatchingRegexp = (
  error: ?Error,
  pattern: RegExp,
) => {
  const pass = !!(error && error instanceof Error && error.message.match(pattern));

  const message = (isNot) => (
    isNot ?
      '.not.toThrowError\n\n' +
      'Expeced the function not to throw an error matching:\n' +
      `  ${stringify(pattern)}\n` +
      'But it threw:\n' +
      `  ${stringify(error)}`
    :
      '.toThrowError\n\n' +
      'Expected the function to throw an error matching:\n' +
      `  ${stringify(pattern)}\n` +
      `${parseMessage(error)}`
  );

  return { pass, message };
};

export default function toEqual(received: Function, expected: String | Error | RegExp) {
  let error;

  try {
    received();
  } catch (e) {
    error = e;
  }

  if (_.isFunction(expected)) {
    return toThrowMatchingError(error, expected);
  } else if (_.isString(expected)) {
    const regexp = new RegExp(_.escapeRegExp(expected), 'gi');
    return toThrowMatchingRegexp(error, regexp);
  } else if (_.isRegExp(expected)) {
    return toThrowMatchingRegexp(error, expected);
  }

  throw new Error(
    'Unexpected argument passed. Expected to get\n' +
    '  "String", "Error" or "RegExp".\n' +
    'Got: \n' +
    `  ${typeof expected}: ${stringify(expected)}.`
  );
}
