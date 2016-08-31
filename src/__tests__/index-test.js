/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import faker from 'faker';
import expect from '../index';

faker.locale = 'zh_TW';

describe('Matcher Library', () => {
  it('toThrowError', () => {
    expect(() => { throw new Error('error'); }).toThrowError(Error);
    let noError;
    try {
      expect(() => {}).toThrowError(Error);
    } catch (e) {
      noError = e;
    }
    if (!(noError instanceof Error)) {
      throw new Error('.toThrowError should throw Error');
    }

    let throwError;
    try {
      expect(() => { throw new Error('error'); }).not.toThrowError(Error);
    } catch (e) {
      throwError = e;
    }
    if (!(throwError instanceof Error)) {
      throw new Error('.not.toThrowError should throw Error');
    }
    expect(() => {}).not.toThrowError(Error);
  });

  it('toBe with Boolean', () => {
    expect(true).toBe(true);
    expect(() => { expect(true).toBe(false); }).toThrowError(Error);
    expect(true).not.toBe(false);
    expect(() => { expect(true).not.toBe(true); }).toThrowError(Error);
  });

  it('toBe with Number', () => {
    expect(123).toBe(123);
    expect(() => { expect(123).toBe(456); }).toThrowError(Error);
    expect(123).not.toBe(456);
    expect(() => { expect(123).not.toBe(123); }).toThrowError(Error);
  });

  it('toEqual', () => {
    expect({ name: 'react-native' }).toEqual({ name: 'react-native' });
    expect({ name: 'react-native' }).not.toEqual({ mobile: 'react-native' });
  });
});
