module.exports = {
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  errorOnDeprecated: true,
  rootDir: './',
  testEnvironment: 'node',
  testURL: 'http://localhost:5000',
  watchman: true
};
