module.exports = {
    publicPath: './', // 根域上下文目录
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
    outputDir: process.env.outputDir,
    css: {
      loaderOptions: {
        // 给 sass-loader 传递选项
        sass: {
          // @/ 是 src/ 的别名
          // 所以这里假设你有 `src/variables.scss` 这个文件
          // data: `@import "./src/lib/hotcss/px2rem.scss";`
          data: `@import "./src/assets/style/main.scss";`
        }
      }
    },
    devServer: {
        // 设置主机地址
        host: 'localhost',
        // 设置默认端口
        port: 8080,
        // 设置代理
        open:true,
        proxy: {
            '/api': {
                // 目标 API 地址
                target: 'http://192.168.0.129:9090/',
                // 如果要代理 websockets
                ws: true,
                // 将主机标头的原点更改为目标URL
                changeOrigin: true,
                pathRewrite: {
                  '^/api': ''
                }
            }
        }
    }
  };
  