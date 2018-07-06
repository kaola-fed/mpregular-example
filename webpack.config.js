const path = require( 'path' )
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' )
const webpack = require( 'webpack' )
const MPRegularPlugin = require( 'mpregular-loader/lib/plugin' )

function resolve(uri) {
  return path.resolve( __dirname,  uri);
}

module.exports = {
  entry: {
    'app': resolve( 'src/index.js' ),
    'pages/index/index': resolve( 'src/pages/index/index.js' ),
    'pages/counter/index': resolve( 'src/pages/counter/index.js' ),
    'pages/todomvc/index': resolve( 'src/pages/todomvc/index.js' ),
    'pages/list/index': resolve( 'src/pages/list/index.js' ),
  },
  // target: 'node',
  target: require('mpvue-webpack-target'),
  devtool: 'source-map',
  output: {
    path: resolve( 'dist/' ),
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[id].js'
  },
  resolve: {
    alias: {
      // 'regularjs': resolve('../mpregular/lib/index.js'),
      'regularjs': resolve( './node_modules/mpregular/lib/index.js' ),
      '@': resolve( './src' )
    }
  },
  module: {
    rules: [
      {
        test: /\.rgl$/,
        use: {
          loader: 'mpregular-loader',
          options: {
            loaders: {
              css: ExtractTextPlugin.extract( {
                use: 'css-loader',
                fallback: 'style-loader',
              } ),
              less: ExtractTextPlugin.extract( {
                use: [
                  'css-loader',
                  'less-loader'
                ],
                fallback: 'style-loader',
              } ),
            },
          }
        },
      },
      {
        test: /\.js$/,
        include: [ path.resolve( __dirname, 'src' ) ],
        use: [
          'babel-loader',
          {
            loader: 'mpregular-loader',
            options: {
              checkEntry: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: `static/img/[name].[ext]`
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin( 'static/css/' + '[name]' + '.wxss' ),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function ( module, count ) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf('node_modules') >= 0
        ) || count > 1
      }
    }),
    new MPRegularPlugin( {
      cssChunks: [ 'vendor' ]
    } )
  ]
}
