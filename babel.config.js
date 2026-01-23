module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // 👇 Must be LAST in the list
      'react-native-reanimated/plugin',
    ],
  };
};
