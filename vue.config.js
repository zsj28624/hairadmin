const path = require('path')
const chain = (config)=>{
    config.resolve.alias
    .set('@assets',path.join(__dirname,'./src/assets'))
    .set('@comp',path.join(__dirname,'./src/components'))
    .set('@img',path.join(__dirname,'./src/assets/img'))
    .set('@css',path.join(__dirname,'./src/assets/css'))
    .set('@views',path.join(__dirname,'./src/views'))
    .set('@lib',path.join(__dirname,'./src/lib'))

}

module.exports = {
    publicPath: '',
    chainWebpack:chain,
}