module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'google',
      'plugin:prettier/recommended',
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'warn',
      'eqeqeq': 'error',
      'no-console': 'warn',
      'curly': 'error',
      'no-var': 'error',
      'prefer-const': 'warn',
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'prettier/prettier': 'error',
    },
  };
  