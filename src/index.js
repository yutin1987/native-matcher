import toBe from './matchers/toBe';
import toEqual from './matchers/toEqual';
import toThrowError from './matchers/toThrowError';

if (!global.NATIVE_MATCHER) {
  global.NATIVE_MATCHER = {};
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

    const allMatchers = global.NATIVE_MATCHER;
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
  global.NATIVE_MATCHER[name] = matcher;
}

addMatcher('toBe', toBe);
addMatcher('toEqual', toEqual);
addMatcher('toThrowError', toThrowError);
