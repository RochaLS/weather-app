const path = require('path'); // We need the absolute path for the output

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js', // File created by webpack
    path: path.join(__dirname, 'build'), // Root dict + new dict name
  },
  devtool: 'inline-source-map', // Helps tracking the source of errors
  devServer: {
    contentBase: './build',
  },
  // Using babel below to transpile code
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
