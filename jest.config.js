module.exports = {
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [
    '/.circleci/', '/.github/', '/.stryker-tmp/', '/node_modules/', '/reports/'
  ],
  errorOnDeprecated: true,
  rootDir: './',
  testEnvironment: 'node',
  testURL: 'http://localhost:5000',
  watchman: true
};
