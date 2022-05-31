export default {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  setupFilesAfterEnv: ['<rootDir>/src/setup-tests.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
