import _ from 'lodash';
import stringify from '../stringify';

export default function toEqual(received: any, expected: any) {
  const pass = _.isEqual(received, expected);

  const message = (isNot) => (
    isNot ?
      `.not.toEqual\n\n` +
      `Expected value to not equal:\n` +
      `  ${stringify(expected)}\n` +
      `Received:\n` +
      `  ${stringify(received)}`
    :
      `.toEqual\n\n` +
      `Expected value to equal:\n` +
      `  ${stringify(expected)}\n` +
      `Received:\n` +
      `  ${stringify(received)}`
  );

  return { message, pass };
}
