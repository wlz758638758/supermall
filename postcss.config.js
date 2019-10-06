module.exports = {
    plugins: {
        autoprefixer: {},

        "postcss-px-to-viewport": {
            viewportWidth: 375, //视窗的宽度，对应的是设计稿的宽度，iphone6(750*1334)
            viewportHeight: 667, //视窗高度
            unitPrecision: 5, //指定‘px’转换成的视窗单位值的小数位数
            viewportUnit: 'vw', //指定需要转换成的视窗单位
            selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], //指定不需要转换的类
            minPixelValue: 1, //小于或等于1px不转换视窗单位
            mediaQuery: false, //允许在媒体查询中转换px
            exclude: [/TabBar/]
        },
    }
}