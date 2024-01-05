module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  // env: {
  //   production: {
  //     plugins: ['react-native-paper/babel'],
  //   },
  // },
  // plugins: [
  //   [
  //     require.resolve('babel-plugin-module-resolver'),
  //     {
  //       root: ["./src"],
  //       include: ["./src"],
  //       extensions: ['.js', '.jsx', '.es', '.es6', '.mjs', '.ts', '.tsx'],
  //     }
  //   ],
  // ]
   plugins: ['react-native-reanimated/plugin'],
};
