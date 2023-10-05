// eslint-disable-next-line no-undef
const {getDefaultConfig} = require('metro-config');

// eslint-disable-next-line no-undef
module.exports = (async () => {
   const {
      resolver: {sourceExts, assetExts},
   } = await getDefaultConfig();
   return {
      transformer: {
         // eslint-disable-next-line no-undef
         babelTransformerPath: require.resolve('react-native-svg-transformer'),
      },
      resolver: {
         assetExts: assetExts.filter(ext => ext !== 'svg'),
         sourceExts: [...sourceExts, 'svg'],
      },
   };
})();
