const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port:8081,
    proxy: {
        '^/api': {
          target: "http://localhost:3001", //这里后台的地址模拟的;应该填写你们真实的后台接口 
            ws:true,//代理websocked
            changeOrigin:true,//虚拟的站点需要更管origin
            pathRewrite:{
                '^/api':''//重写路径
            }
        }
    }
}

})
 