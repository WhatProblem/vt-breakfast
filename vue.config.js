const merge = require('webpack-merge');
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
    // publicPath: './', // hashRoute中可以静态打开
    outputDir: 'dist',
    devServer: { // 浏览器同时显示警告和错误
        // overlay: {
        //     warnings: true,
        //     errors: true
        // },
        // proxy: 'http://localhost:3000', // 配置跨域代理
    },
    lintOnSave: process.env.NODE_ENV !== 'production', // 构建生产环境时禁用tslint检测
    productionSourceMap: false, // 取消生产环境生成sourcemap文件
    chainWebpack: config => {
		config.module
			.rule('ts')
			.use('ts-loader')
			.tap(options => {
				options = merge(options, {
					transpileOnly: true,
					getCustomTransformers: () => ({
						before: [
							tsImportPluginFactory({
								libraryName: 'vant',
								libraryDirectory: 'es',
								style: true
							})
						]
					}),
					compilerOptions: {
						module: 'es2015'
					}
				});
				return options;
			});
	},
    css: {
        sourceMap: false, // 默认false,取消生成css sourceMap文件
        loaderOptions: {
            css: {
                // 这里的选项会传递给 css-loader
            },
            postcss: {
                // 这里的选项会传递给 postcss-loader
            }
        }
    }
}