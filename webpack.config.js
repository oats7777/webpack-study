const path = require('path');

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
    ],
  },
};
