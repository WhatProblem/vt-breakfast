const merge = require('webpack-merge');
const tsImportPluginFactory = require('ts-import-plugin');
const autoprefixer = require('autoprefixer');
const pxtoviewport = require('postcss-px-to-viewport');
const path = require('path');

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
								// style: true,
								style: name => `${name}/style/less` // 1.定义自定义主题一
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
							plugins: [
								autoprefixer(),
								pxtoviewport({
									viewportWidth: 375
								})
							]
            },
            less: {
                modifyVars: {
									// 直接覆盖变量
									// red: '#03a9f4',
									// blue: '#3eaf7c',
									// orange: '#f08d49',
									// 'text-color': '#111333',
									// 或者可以通过less文件覆盖（文件路径为绝对路径）
									'hack': `true; @import "${path.join(__dirname, './src/style/vt.less')}";`
                }
            }
        }
    }
}