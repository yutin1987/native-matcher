export default (obj: any): string => {
  const set = new Set();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (
        value &&
        value.constructor &&
        value.constructor.name === 'RegExp'
      ) {
        return value.toString();
      }
      if (set.has(value)) {
        return '[Circular]';
      }
      set.add(value);
    } else if (typeof value === 'function') {
      return value.toString();
    } else if (typeof value === 'undefined') {
      return 'undefined';
    // $FlowFixMe symbols are not supported by flow yet
    } else if (typeof value === 'symbol') {
      return value.toString();
    } else if (value === Infinity) {
      return 'Infinity';
    } else if (value === -Infinity) {
      return '-Infinity';
    } else if (Number.isNaN(value)) {
      return 'NaN';
    }
    return value;
  });
};
