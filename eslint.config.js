const antfu = require('@antfu/eslint-config').default;

module.exports = antfu({
  stylistic: true,
  typescript: true,
  jsonc: false,
  yaml: false,
  ignores: ['./node_modules', './build', './dist'],
  rules: {
    'semi': ['error', 'always'],
    'curly': ['error', 'all'],
    'new-cap': 'off',
    'no-console': 'warn',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'max-len': ['error', { code: 120 }],
    'no-unused-private-class-members': 'error',
    'no-eq-null': 'error',
    'no-empty': 'error',
    'max-classes-per-file': ['error', 1],
    'no-unneeded-ternary': 'error',
    'no-undefined': 'warn',
    'yoda': 'error',
    'require-await': 'warn',
    'no-async-promise-executor': 'error',
    'require-atomic-updates': 'error',
    'style/semi': ['error', 'always'],
    'style/brace-style': ['error', '1tbs'],
    'style/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'comma',
          requireLast: true,
        },
        overrides: {
          interface: {
            multiline: {
              delimiter: 'semi',
              requireLast: true,
            },
          },
        },
      },
    ],
    'ts/no-namespace': 'off',
    'ts/consistent-type-imports': 'off',
    'ts/consistent-type-definitions': 'off',
    'test/prefer-lowercase-title': 'off',
  },

});
