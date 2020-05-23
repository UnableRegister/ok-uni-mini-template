/*
 * @Author: Wind Rises
 * @Date: 2020-05-23 20:02:25
 * @Last Modified by: Wind Rises
 * @Last Modified time: 2020-05-23 20:03:47
 */

interface RequestOptions {
    /**
     * 资源url
     */
    url?: string
    /**
     * 请求的参数
     */
    data?: string | object | ArrayBuffer
    /**
     * 设置请求的 header，header 中不能设置 Referer。
     */
    header?: RequestHeader
    /**
     * 默认为 GET
     * 可以是：OPTIONS，GET，HEAD，POST，PUT，DELETE，TRACE，CONNECT
     */
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    // | 'TRACE'
    // | 'CONNECT'
    // | 'OPTIONS'
    // | 'HEAD'
    /**
     * 如果设为json，会尝试对返回的数据做一次 JSON.parse
     */
    dataType?: string
    /**
     * 设置响应的数据类型。合法值：text、arraybuffer
     */
    responseType?: string
    /**
     * 超时时间，单位 ms
     */
    timeout?: number
    complete?: Function
}

// 请求头
interface RequestHeader {
    'content-type'?: string
    [index: string]: string | number | undefined
}

// 请求配置
interface RequestConfig {
    host: string
    header: RequestHeader
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    // | 'TRACE'
    // | 'CONNECT'
    // | 'OPTIONS'
    // | 'HEAD'
    dataType: string
    timeout: number
}

// 响应体
interface Response {
    statusCode?: number
    config: object
    errMsg: string
    [index: string]: any
}

type InterceptorRequest = (
    config: RequestOptions,
    cancel: (config: RequestOptions) => void
) => RequestOptions
type InterceptorResponseCb = (response: Response) => Response
type InterceptorResponseFailCb = (response: Response) => Response

// init 拦截器接口
interface Interceptor {
    request: (
        fn: InterceptorRequest
        // cancel: (config: RequestConfig) => void
    ) => void
    response: (
        cb: InterceptorResponseCb,
        errCb: InterceptorResponseFailCb
    ) => void
}

export default class Request {
    config: RequestConfig = {
        host: '',
        header: {
            'content-type': 'application/json;charset=UTF-8'
        },

        method: 'GET',
        dataType: 'json',
        timeout: 30000
    }

    interceptor: Interceptor = {
        request: (fn: InterceptorRequest) => {
            this.requestBeforeFn = fn
        },
        response: (
            cb: InterceptorResponseCb,
            failCb: InterceptorResponseFailCb
        ) => {
            this.requestComFn = cb
            this.requestComFail = failCb
        }
    }

    setConfig(fn: (config: RequestConfig) => RequestConfig) {
        this.config = fn(this.config)
    }

    private requestBeforeFn(
        config: RequestOptions,
        cancel: (config: RequestOptions) => void
    ): RequestOptions {
        return config
    }

    private requestComFn(response: Response): Response {
        return response
    }

    private requestComFail(response: Response): Response {
        return response
    }

    /**
     * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
     * @param statusCode
     */
    private validateStatus(response: Response): boolean {
        return response.statusCode === 200
    }

    setValidateFn(fn: (response: Response) => boolean) {
        this.validateStatus = fn
    }

    async request(options: RequestOptions) {
        return new Promise((resolve, reject) => {
            let next = true
            let _options: any = {
                url: options.url,
                data: options.data,
                header: options.header || this.config.header,
                method: options.method || this.config.method,
                dataType: options.dataType || this.config.dataType,
                timeout: options.timeout || this.config.timeout
            }

            _options = this.requestBeforeFn(
                _options,
                (config: RequestOptions) => {
                    reject({
                        errMsg: 'requestBeforeFn cancel',
                        config: config
                    })
                    next = false
                }
            )
            if (!next) return
            _options.complete = (response: Response) => {
                if (this.validateStatus(response)) {
                    // 成功
                    resolve(this.requestComFn(response))
                } else {
                    reject(this.requestComFail(response))
                }
            }
            if (
                !_options.url.startsWith('http://') &&
                !_options.url.startsWith('https://')
            ) {
                _options.url = this.config.host + _options.url
            }
            uni.request(_options)
        })
    }

    get(url: string, data: object = {}, options: RequestOptions = {}) {
        return this.request({
            url,
            data,
            method: 'GET',
            ...options
        })
    }

    post(url: string, data: object = {}, options: RequestOptions = {}) {
        return this.request({
            url,
            data,
            method: 'POST',
            ...options
        })
    }

    put(url: string, data: object = {}, options: RequestOptions = {}) {
        return this.request({
            url,
            data,
            method: 'PUT',
            ...options
        })
    }

    delete(url: string, data: object = {}, options: RequestOptions = {}) {
        return this.request({
            url,
            data,
            method: 'DELETE',
            ...options
        })
    }
}

export { RequestOptions, RequestConfig, Response, InterceptorRequest }
