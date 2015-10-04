module.exports = {
  entry: "./src/main.js",
  output: {
    path: './build',
    filename: "build.js"
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: "vue-loader" },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
    ]
  },
  devtool: '#source-map',
  watchOptions:{
     aggregateTimeout: 300, // wait so long for more changes
    poll: true 
  }
};