const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry:"./src/index.js",
    output:{
        path: path.join(__dirname, '/build'),
        filename : 'index_bundle.js'
    },  
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            // {
            //     test: /\.css$/,
            //     use: ["style-loader", "css-loader"]
            // },
            {
                test: /\.s[ac]ss$/i,
                use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
                ],
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                  loader: 'url-loader',
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
        })
    ],
    devServer: {
        historyApiFallback: true,
    }
};