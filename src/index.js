import toBe from './matchers/toBe';
import toEqual from './matchers/toEqual';
import toThrowError from './matchers/toThrowError';

const GLOBAL_SYMBOL = Symbol.for('$$native-matcher');

if (!global[GLOBAL_SYMBOL]) {
  Object.defineProperty(global, GLOBAL_SYMBOL, { value: Object.create(null) });
}

class Expect {

  actual = null;

  isNot = false;

  get not() {
    this.isNot = !this.isNot;
    return this;
  }

  constructor(actual) {
    this.actual = actual;

    const allMatchers = global[GLOBAL_SYMBOL];
    Object.keys(allMatchers).forEach(name => {
      this[name] = this.runMatcher(allMatchers[name]);
    });
  }

  runMatcher(matcher: Function) {
    return function throwingMatcher(expected: any) {
      const result = matcher(this.actual, expected);
      const pass = this.isNot ? !result.pass : !!result.pass;

      if (pass === false) {
        const message =
          typeof result.message === 'function' ? result.message(this.isNot) : result.message;
        const error = new Error(message);
        throw error;
      }
    };
  }
}

export default function expect(actual: any): Expect {
  return new Expect(actual);
}

export function addMatcher(name: String, matcher: Function): void {
  const obj = {};
  obj[name] = matcher;
  Object.assign(global[GLOBAL_SYMBOL], obj);
}

addMatcher('toBe', toBe);
addMatcher('toEqual', toEqual);
addMatcher('toThrowError', toThrowError);
