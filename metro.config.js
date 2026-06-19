const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const projectRoot = path.resolve(__dirname);

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  projectRoot,
  watchFolders: [projectRoot],
  resolver: {
    // Evita resolver node_modules pelo drive virtual S: (subst)
    nodeModulesPaths: [path.resolve(projectRoot, 'node_modules')],
    // Moti/framer-motion trazem React duplicado — força uma única instância
    extraNodeModules: {
      react: path.resolve(projectRoot, 'node_modules/react'),
      'react-dom': path.resolve(projectRoot, 'node_modules/react-dom'),
    },
  },
  watcher: {
    healthCheck: {
      enabled: true,
      interval: 30000,
      timeout: 5000,
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
