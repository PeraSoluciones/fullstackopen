import tsPlugin from '@typescript-eslint/eslint-plugin';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  tseslint.configs.recommendedTypeChecked,
  { ignores: ['build/**', 'eslint.config.mjs'] },
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es6,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      //   '@typescript-eslint/semi': ['error'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explcit-module-boundary-types': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'no-case-declarations': 'off',
    },
  }
);
