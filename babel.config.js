const path = require('path')
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        resolvePath(sourcePath, currentFile) {
          if (
            sourcePath === 'react-native' &&
            currentFile.includes('react-native-camera/src/RNCamera.js')
          ) {
            console.log('resolver', sourcePath, currentFile)
            return path.resolve(__dirname, 'resolver/react-native')
          }
        },
      },
    ],
  ],
};
