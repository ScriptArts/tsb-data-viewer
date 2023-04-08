import { defineFlatConfig } from 'eslint-define-config';
import typescriptParser from '@typescript-eslint/parser';
import typescript from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default defineFlatConfig([
    {
        files: [
            '**/*.{ts,tsx}',
        ],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        plugins: {
            '@typescript-eslint': typescript,
            react,
            'react-hooks': reactHooks,
        },
        rules: {
            ...typescript.configs['recommended'].rules,
            ...typescript.configs['eslint-recommended'].rules,
            ...react.configs['recommended'].rules,
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'react-hooks/exhaustive-deps': 'warn',
        },
    },
    {
        rules: {
            quotes: ['warn', 'single'],
            'comma-dangle': ['warn', 'always-multiline'],
            semi: ['error'],
        },
    },
]);
