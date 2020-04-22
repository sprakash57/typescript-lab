const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),//since webpack wants absolute paths so './dist' wont work.
        publicPath: 'dist'
    },
    devtool: 'inline-source-map',
    module: {//this is how you teach webpack to be more than a bundler
        rules: [
            { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};