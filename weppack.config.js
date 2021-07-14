/**
 * Webpackの設定ファイル
 */

// モジュールを読み込む
const path = require('path');

module.exports = {
    // ビルドするファイル
    entry: path.join(__dirname, 'src/index.js'),
    // 出力するファイル
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /.js$/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
            }
        }]
    }
}