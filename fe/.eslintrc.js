module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['module-resolver', '@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    'module-resolver/use-alias': 2,
    'prettier/prettier': 0,
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 0,
  },
};
