import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default [
  // TypeScript + eslint 推奨セット
  ...tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
  ),

  // React / Hooks / import など
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      import: importPlugin,
      a11y: jsxA11y,
      tailwindcss,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: 'detect' } },
    rules: {
      'react/react-in-jsx-scope': 'off', // React18+
      'react/jsx-uses-react': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // Prettier と連携（フォーマット違反を warn に）
  {
    plugins: { prettier: prettierPlugin },
    rules: { 'prettier/prettier': 'warn' },
  },
];
