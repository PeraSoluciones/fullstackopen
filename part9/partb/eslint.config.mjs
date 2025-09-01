import tsPlugin from '@typescript-eslint/eslint-plugin';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    tseslint.configs.recommendedTypeChecked,
    {
        ignores: ['eslint.config.mjs'],
    },
    {
        languageOptions: {
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
    }
);
