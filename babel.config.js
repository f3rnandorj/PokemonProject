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
          '@hooks': './src/hooks',
          '@routes': './src/routes',
          '@domain': './src/domain',
          '@api': './src/api',
          '@utils': './src/utils',
          '@infra': './src/infra',
          '@types': './src/types',
          '@test': './src/test',
          '@services': './src/services',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
