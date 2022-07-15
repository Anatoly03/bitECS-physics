const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: 'development',
    entry: "./main.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    devServer: {
        static: "./dist",
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: [{ loader: "ts-loader" }],
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
        })
    ],
};
