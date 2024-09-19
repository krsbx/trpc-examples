import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import prettier from 'eslint-plugin-prettier';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import _import from 'eslint-plugin-import';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...fixupConfigRules(
    compat.extends(
      'airbnb-base',
      'eslint:recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'plugin:prettier/recommended'
    )
  ),
  {
    plugins: {
      prettier: fixupPluginRules(prettier),
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.d.ts', '.tsx'],
      },
      'import/extensions': ['.js', '.jsx', '.tsx', '.ts'],
      'import/resolver': {
        typescript: {
          moduleDirectory: ['node_modules', 'src/', 'bin/'],
          extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx'],
        },
        node: {
          moduleDirectory: ['node_modules', 'src/'],
          extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx'],
        },
      },
    },
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-shadow': 'warn',
      'import/extensions': 'off',
      'import/no-dynamic-require': 'off',
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
      'class-methods-use-this': 'off',
      'consistent-return': 'off',
      'lines-between-class-members': 'off',
      'import/no-cycle': 'warn',
      'no-param-reassign': 'warn',
      'global-require': 'off',
      'no-empty-function': 'off',
      'no-plusplus': 'off',
      'no-underscore-dangle': 'off',
      'no-useless-constructor': 'off',
      'no-console': 'off',
      'no-shadow': 'off',
      camelcase: 'warn',
      'no-return-await': 'off',
      'no-restricted-syntax': 'warn',
      'no-await-in-loop': 'off',
      'max-params': ['error', 3],
    },
  },
];
