const path = require('path');
const webpack = require('webpack');

module.exports = {
    "mode": "development",

    entry: {
        'edit-profile-page': './kuma/users/jsx/edit-profile-page/index.jsx',
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'static/js/webpacks/')
    },

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },

    devServer: {
        hot: true,
    },

    plugins: [ new webpack.HotModuleReplacementPlugin() ],

    "devtool": "source-map",
    "module": {
        "rules": [
            {
                "test": /\.(js|jsx)$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "babel-loader",
                    "options": {
                        "presets": [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-flow",
                        ]
                    }
                }
            },
            {
                "test": /\.scss$/,
                "use": [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    }
}
