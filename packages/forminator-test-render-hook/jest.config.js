export default {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
