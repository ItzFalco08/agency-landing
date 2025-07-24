module.exports = {
  env: {
    node: true,
    es2021: true,
    commonjs: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'script', // Use 'script' for CommonJS
  },
  rules: {
    // Allow CommonJS require statements
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    
    // Node.js specific rules
    'no-console': 'off', // Allow console.log in server code
    'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    
    // Security and best practices
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'strict': ['error', 'global'],
  },
  globals: {
    process: 'readonly',
    Buffer: 'readonly',
    __dirname: 'readonly',
    __filename: 'readonly',
    module: 'readonly',
    require: 'readonly',
    exports: 'readonly',
  },
};
