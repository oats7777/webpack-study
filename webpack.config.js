const path = require('path');
const webpack = require('webpack');
const baaner = require('./banner');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
            publicPath: './', // file-loader와 동일
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
    new HtmlWebpackPlugin({
      template: './src/index.html', // 템플릿 경로를 지정
      hash: true, // 정적 파일을 불러올때 쿼리문자열에 웹팩 해쉬값을 추가한다
      minify:
        process.env.NODE_ENV === 'production'
          ? {
              collapseWhitespace: true, // 빈칸 제거
              removeComments: true, // 주석 제거
            }
          : false,
      templateParameters: {
        // 템플릿에 주입할 파라매터 변수 지정
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
      },
    }),
  ],
};
