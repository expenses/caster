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
    // We're not coding in C anymore
    "@typescript-eslint/no-use-before-define": "off",

    // Clarify styling
    "jsx-quotes": ["warn", "prefer-single"],
    "comma-dangle": ["warn", "never"],
    "arrow-parens": ["warn", "as-needed"],

    "react/jsx-filename-extension": ["error", { "extensions": [".tsx"] }],
    // Allow {...props} for custom components but not regular html ones
    "react/jsx-props-no-spreading": ["error", {"html": "enforce", "custom": "ignore"}],

    // Annoying
    "max-len": "off",
    "react/sort-comp": "off",
    "react/jsx-one-expression-per-line": "off",
    "object-curly-newline": "off",
    "react/destructuring-assignment": "off",
    "no-multi-spaces": "off",
    // This doesn't pickup that './Module' is './Module.tsx'
    "import/no-unresolved": "off",
    // I'd like to turn this on but exclude 'render' functions
    "@typescript-eslint/explicit-function-return-type": "off",

    // I don't know what these mean
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/label-has-associated-control": "off",

    // These might be a good reason to enable these in the future
    "react/no-danger": "off",
    "no-console": "off"
  },
  settings:  {
    react:  {
      version:  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
