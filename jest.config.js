module.exports = {
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'json'
  ],
  transform: {
    '.+\\.(ts|tsx)$': '<rootDir>/__tests__/preprocessor-typescript.js',
    '.+\\.(css|styl)$': '<rootDir>/node_modules/jest-css-modules-transform',
    '.+\\.(mp3|opus)$': '<rootDir>/__tests__/preprocessor-file.js'
  },
  testRegex: '/__tests__/.*\\.spec\\.(ts|tsx)$',
  moduleDirectories: [
    'node_modules',
    'src'
  ],
  testURL: 'http://ya.ru',
  bail: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts'
  ],
  setupFiles: [
    '<rootDir>/__tests__/setup.ts'
  ]
};
