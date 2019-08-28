module.exports = {
  parser:  '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "object-curly-spacing": "off",
    "arrow-parens": ["error", "as-needed"],
    "@typescript-eslint/no-use-before-define": "off",
    "jsx-quotes": ["error", "prefer-single"],
    "comma-dangle": ["error", "never"],
    "object-curly-newline": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-filename-extension": ["error", { "extensions": [".tsx"] }],
    "import/no-unresolved": "off",
    "react/sort-comp": ["off"]
  },
  settings:  {
    react:  {
      version:  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
