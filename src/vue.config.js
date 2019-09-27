module.exports = {
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json', '.css'],
            alias: {
                'components': '@/components',
                'assets': '@/assets',
                'network': '@/network',
                'views': '@/views',
                'common': '@/common'
            }
        }
    }
    // chainWebpack: config => {

    //     config.resolve.alias
    //         .set('@', resolve('src'))
    //         .set('assets', resolve('src/assets'))
    //         .set('components', resolve('src/components'))
    //         .set('network', resolve('src/network'))
    //         .set('views', resolve('src/views'))
    //         .set('content', resolve('src/components/content'))
    //         .set('common', resolve('src/components/common'))
    // }
}