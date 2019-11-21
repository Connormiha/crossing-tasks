module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions:  {
        ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
        project: 'tsconfig.json',
        sourceType:  'module',  // Allows for the use of imports
        tsconfigRootDir: '.'
    },
    env: {
        browser: true,
        jest: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:sonarjs/recommended'
    ],
    plugins: [
        'jest'
    ],
    rules: {
        '@typescript-eslint/interface-name-prefix': ['error', {
            prefixWithI: 'always'
        }],
        // 'jsx-no-multiline-js': 'off',
        // 'eslint-plugin-react/jsx-wrap-multiline': 'error',
        // 'react/jsx-boolean-value': 'error',
        // '@typescript-eslint/class-name-casing': 'error',
        // 'no-implicit-dependencies': 'off',
        // curly: 'error',
        // eofline: 'error',
        // forin: 'error',
        // 'interface-name': 'off',
        // 'label-position': 'error',
        // 'max-line': ['error', {
        //     code: 140,
        //     tabWidth: 4
        // }],
        // 'member-access': 'off',
        // 'no-arg': 'error',
        // 'no-bitwise': 'error',
        // 'no-console': 'error',
        // 'no-useless-constructor': 'error',
        // 'no-debugger': 'error',
        // 'no-redeclare': 'error',
        // 'no-empty': 'error',
        // 'no-eval': 'error',
        // 'no-inferrable-types': 'off',
        // 'no-shadow': 'error',
        // 'no-string-literal': 'error',
        // 'no-submodule-imports': 'off',
        // 'no-switch-case-fall-through': 'error',
        // 'no-trailing-whitespace': 'error',
        // 'no-unused-expressions': 'error',
        // 'no-use-before-declare': 'off',
        // 'no-var': 'error',
        // '@typescript-eslint/no-var-requires': 'error',
        // 'object-literal-sort-keys': 'off',
        // 'one-line': [
        //     'error',
        //     {
        //         options: [
        //             'check-open-brace',
        //             'check-catch',
        //             'check-else',
        //             'check-whitespace'
        //         ]
        //     }
        // ],
        // 'one-variable-per-declaration': 'off',
        // 'ordered-imports': 'off',
        // 'prefer-const': 'off',
        // quotes: ['error', 'single'],
        // radix: 'error',
        // semi: ['error', 'always'],
        // 'switch-default': 'off',
        // 'comma-dangle': ['error', 'never'],
        // 'eqeqeq': ['error', 'always'],
        // 'variable-name': 'off',
        // whitespace: ['error', {
        //     options: [
        //         'check-branch',
        //         'check-decl',
        //         'check-operator',
        //         'check-separator',
        //         'check-type'
        //     ]
        // }]
    }
};
