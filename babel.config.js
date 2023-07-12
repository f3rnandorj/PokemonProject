module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: '.',
        alias: {
          '@components': './src/components',
          '@theme': './src/theme',
          '@screens': './src/screens',
        },
      },
    ],
  ],
};
