import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },  // Ignore built files in the dist folder
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],  // Use recommended ESLint and TypeScript rules
    files: ['**/*.{ts,tsx}'],  // Lint all TypeScript and TSX (React) files
    languageOptions: {
      ecmaVersion: 2020,  // Use ECMAScript 2020 features
      globals: globals.browser,  // Add browser global variables like window and document
    },
    plugins: {
      'react-hooks': reactHooks,  // Add React hooks plugin to enforce hooks best practices
    },
    rules: {
      ...reactHooks.configs.recommended.rules,  // Use recommended React hooks rules
      '@typescript-eslint/no-unused-vars': 'warn',  // Warn on unused variables
      '@typescript-eslint/explicit-module-boundary-types': 'off',  // Allow implicit return types in functions
    },
  },
)