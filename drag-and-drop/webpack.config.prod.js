const path = require('path');
const cleanDist = require('clean-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),//since webpack wants absolute paths so './dist' wont work.
    },
    devtool: 'none',
    module: {//this is how you teach webpack to be more than a bundler
        rules: [
            { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new cleanDist.CleanWebpackPlugin()
    ]
};