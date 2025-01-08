import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  verbose: true,
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ["**/__tests__/**/*.spec.ts"],
  clearMocks: true,
  coverageDirectory: 'coverage',
};

export default config;