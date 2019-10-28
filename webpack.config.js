const path = require('path')

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
        test: /\.(tsx|ts)$/,
        loader: 'ts-loader',
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
}