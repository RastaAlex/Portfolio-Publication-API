'use strict';

module.exports = {
  rootDir: './',
  automock: false,
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  verbose: true,
  silent: false,
  maxWorkers: '50%',
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '__snapshots__'],
  testMatch: ['**/test/**/*.test.[jt]s'],
  moduleNameMapper: {
    '@auth/(.*)': '<rootDir>/src/auth/$1',
    '@image/(.*)': '<rootDir>/src/image/$1',
    '@portfolio/(.*)': '<rootDir>/src/portfolio/$1',
    '@user/(.*)': '<rootDir>/src/user/$1',
  },
};
