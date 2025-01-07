import googleConfig from 'eslint-config-google';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const googleRules = { ...googleConfig.rules };
delete googleRules['valid-jsdoc'];
delete googleRules['require-jsdoc'];

/** @type {import('eslint').Linter.FlatConfig} */
const config = [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...googleRules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
  },
];

export default config;
