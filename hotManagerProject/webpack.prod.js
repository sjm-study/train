const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = function (env, argv) {
    const isEnvDevelopment = argv.mode === 'development' || !argv.mode;
    const isEnvProduction = argv.mode === 'production';

    return {
        mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
        devtool: isEnvDevelopment ? 'source-map' : isEnvDevelopment && 'cheap-module-source-map',
        entry: './src/index.js',
        output: {
            filename: '[name].[hash:8].js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                }, {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    enforce: 'pre',
                    use: 'eslint-loader'
                }, {
                    test: /\.css$/,
                    include: [path.resolve(__dirname, 'src/styles'), /node_modules/],
                    use: [MiniCssExtractPlugin.loader, 'css-loader']
                }, {
                    test: /\.css$/,
                    exclude: [path.resolve(__dirname, 'src/styles'), /node_modules/],
                    use: [
                        MiniCssExtractPlugin.loader,
                        // 'style-loader',
                        'css-loader?modules'
                    ]
                }, {
                    test: /\.less$/,
                    include: [path.resolve(__dirname, 'src/styles'), /node_modules/],
                    use: ['style-loader', 'css-loader', 'less-loader']
                }, {
                    test: /\.less$/,
                    exclude: [path.resolve(__dirname, 'src/styles'), /node_modules/],
                    use: [
                        'style-loader',
                        'css-loader?modules',
                        'less-loader'
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        {
                            loader: "file-loader"
                        }
                    ]
                },
                {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 10000
                            }
                        }
                    ]
                }
            ]
        },
        // devServer配置
        devServer: {
            contentBase: './dist',
            hot: true
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin(),
                new OptimizeCssAssetsPlugin()
            ],
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        reuseExistingChunk: true,
                        name: 'vendor'
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                        name: 'bundle'
                    }
                }
            }
        },

        // 插件
        plugins: [
            new HtmlWebpackPlugin({
                template: 'index.html',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                },
            }),
            new webpack.NamedChunksPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash:8].css',
                chunkFilename: '[name].[contenthash:8].css'
            }),
            // new OptimizeCssAssetsPlugin()
        ],
        resolve: {
            alias: {
                '@': path.resolve('src')
            }
        }
    };
};