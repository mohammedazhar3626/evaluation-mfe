const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    mode: "development",
    entry: "./src/main.tsx",
    devServer: {
        port: 3003,
        historyApiFallback: true,
    },

    output: {
        publicPath: "http://localhost:3003/",
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ],
    },

    plugins: [
        new ModuleFederationPlugin({
            name: "evaluation",
            filename: "remoteEntry.js",
            exposes: {
                "./Evaluation": "./src/App",
            },
            remotes: {
                shell: "shell@http://localhost:3000/remoteEntry.js"
            },
            shared: {
                react: { singleton: true, requiredVersion: false },
                "react-dom": { singleton: true, requiredVersion: false },
                zustand: { singleton: true, requiredVersion: false },
            },
        }),

        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};