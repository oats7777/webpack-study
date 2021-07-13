const path = require('path');
const webpack = require('webpack');
const baaner = require('./banner');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/, // js로 끝나는 파일
        use: [path.resolve('./myloader.js')],
      },
      {
        test: /\.css$/, // .css 확장자로 끝나는 모든 파일
        use: ['style-loader', 'css-loader'], // css-loader를 적용한다
      },
      {
        test: /\.jpeg$/,
        use: {
          loader: 'url-loader', // url 로더를 설정한다
          options: {
            publicPath: './dist/', // file-loader와 동일
            name: '[name].[ext]?[hash]', // file-loader와 동일
            limit: 5000, // 5kb 미만 파일만 data url로 처리
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin(baaner),
    new webpack.DefinePlugin({
      TWO: '1+1',
      VERSION: JSON.stringify('v.1.2.3'),
      PRODUCTION: JSON.stringify(false),
      MAX_COUNT: JSON.stringify(999),
      'api.domain': JSON.stringify('http://dev.api.domain.com'),
    }),
  ],
};
