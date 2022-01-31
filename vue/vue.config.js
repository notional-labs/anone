const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const lambda = process.env.LAMBDA || 'http://localhost:8080/api/testing/attest'

module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        vue$: path.resolve('./node_modules/vue/dist/vue.esm-bundler.js'),
      },
    },
    plugins: [
      new NodePolyfillPlugin(),
      new webpack.DefinePlugin({
        __lambda__: lambda,
      }),
    ],
  },
}
