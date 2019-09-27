import axios from 'axios'

export function request(config) {
    //1.创建实例
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000/api/v1',
        timeout: 5000
    })

    //2.axios的拦截器
    //2.1请求拦截的作用
    instance.interceptors.request.use(config => {
            return config; //返回
        }, err => {
            console.log(err);
        })
        //2.2响应拦截
    instance.interceptors.response.use(res => {
        // console.log(res);
        return res.data;
    }, err => {
        console.log(err)
    })

    //3.发送真正的网络请求
    //这里返回的是一个Promise,所以其他地方可以直接.then进行使用
    return instance(config)
        // })
}