module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    project: 'tsconfig.json',
    sourceType: 'module', // Allows for the use of imports
    tsconfigRootDir: '.',
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  plugins: ['jest'],
  rules: {
    indent: ['error', 2],
    '@typescript-eslint/interface-name-prefix': [
      'error',
      {
        prefixWithI: 'always',
      },
    ],
    'react/display-name': 'off',
    'react/prop-types': 'off',
  },
};
