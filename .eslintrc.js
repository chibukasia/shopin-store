module.exports = {
  globals: {
    module: 'readonly',
    console: 'readonly',
    setTimeout: 'readonly',
    setInterval: 'readonly',
    process: 'readonly',
    expect: 'readonly',
    describe: 'readonly',
    it: 'readonly',
    jest: 'readonly',
  },
  env: {
    browser: false,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
    'next'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'module-resolver'],
  rules: {
    semi: 0,
    'module-resolver/use-alias': 2,
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'react/no-unescaped-entities': 'off',
    // TO BE Removed
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    'no-undef': 'off',
    'no-useless-escape': 'warn',
    'react/display-name': 'warn',
  },
}
