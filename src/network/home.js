import { request } from './request'

export function getHomeMultidata() {
    return request({
        url: '/home/multidata',
    })
}

export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        // 专门针对get请求的参数拼接
        params: {
            type,
            page
        }
    })
}