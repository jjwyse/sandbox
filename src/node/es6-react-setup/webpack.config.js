module.exports = {
  entry: './main.jsx',
  output: {
    path: './',
    filename: 'index.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    modulesDirectories: ['node_modules']
  },
  devServer: {
    inline: true,
    port: 3333
  },
  module: {
    loaders: [{
      test: /(\.js|\.jsx)$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
}
