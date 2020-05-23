/*
 * @Author: Wind Rises
 * @Date: 2020-05-23 20:02:25
 * @Last Modified by: Wind Rises
 * @Last Modified time: 2020-05-23 20:05:06
 */
import Request, { RequestConfig, Response } from '@/libs/request'
import { AppModule } from '@/store/modules/app'

const service = new Request()

service.setConfig((config: RequestConfig) => {
    /* 设置全局配置 */
    config.host = process.env.VUE_APP_API
    return config
})

service.interceptor.request((config, cancel) => {
    /* 请求之前拦截器 */
    if (config.header) {
        config.header.Authorization = AppModule.token
    }
    // if ()
    return config
})

service.setValidateFn((response: Response) => {
    // 自定义验证器
    // 决定请求之后 promise 额状态
    return response.statusCode === 200 && response.data.code === 0
})

service.interceptor.response(
    (response: Response) => {
        /* 请求之后拦截器 */
        return response.data.data
    },
    (response: Response) => {
        /* 对响应错误做点什么 */
        let errorMsg = ''
        // 可以在这里对收到的响应数据对象进行加工处理
        switch (response.statusCode) {
            case 200:
                errorMsg = [1000, 2000].includes(response.data.code)
                    ? '服务器开小差啦，请稍后重试'
                    : response.data.msg
                break
            case 401:
                if (!AppModule.handling401) {
                    AppModule.SET_HANDLING401(true)
                    AppModule.SET_TOKEN('')
                    // #ifdef MP
                    uni.navigateTo({ url: '/pages/login/index?goBack=true' })
                    // #endif
                }
                break
            case 403:
                uni.showModal({
                    title: '警告',
                    content: '无权请联系管理员',
                    confirmText: '我知道了',
                    showCancel: false
                })
                break
            case 404:
                errorMsg = `${response.statusCode} 接口未找到`
                break
            case 500:
            case 502:
                errorMsg = `${response.statusCode} 呃～服务器开小差了`
                break
            case 503:
                errorMsg = `${response.statusCode} 哦豁～服务器睡着了`
                break
            default:
                errorMsg = `${response.statusCode} 其它错误`
        }
        if (errorMsg.length > 0) {
            uni.showToast({
                title: errorMsg,
                icon: 'none'
            })
        }
        return response
    }
)

export default service
