import stringify from '../stringify';

export default function toBe(received: any, expected: any) {
  const pass = received === expected;

  const message = (isNot) => (
    isNot ?
      `.not.toBe\n\n` +
      `Expected value to not be (using ===):\n` +
      `  ${stringify(expected)}\n` +
      `Received:\n` +
      `  ${stringify(received)}`
    :
      `.toBe\n\n` +
      `Expected value to be (using ===):\n` +
      `  ${stringify(expected)}\n` +
      `Received:\n` +
      `  ${stringify(received)}`
  );

  return { message, pass };
}
