/*
 * @Author: Wind Rises
 * @Date: 2020-05-23 20:02:25
 * @Last Modified by: Wind Rises
 * @Last Modified time: 2020-05-23 20:04:04
 */

type cb = (result: any) => void

export interface PushToOptions {
    /**
     * 路由参数
     */
    query?: object
    /**
     * 接口调用成功的回调函数
     */
    success?: cb
    /**
     * 接口调用失败的回调函数
     */
    fail?: cb
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: cb
}

export interface ReplaceToOptions {
    /**
     * 路由参数
     */
    query?: object
    /**
     * 接口调用成功的回调函数
     */
    success?: cb
    /**
     * 接口调用失败的回调函数
     */
    fail?: cb
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: cb
}

export interface ReLaunchToOptions {
    /**
     * 路由参数
     */
    query?: object
    /**
     * 接口调用成功的回调函数
     */
    success?: cb
    /**
     * 接口调用失败的回调函数
     */
    fail?: cb
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: cb
}

function stringifyPrimitive(v: any) {
    switch (typeof v) {
        case 'string':
            return v
        case 'boolean':
            return v ? 'true' : 'false'
        case 'number':
            return isFinite(v) ? v : ''
        default:
            return ''
    }
}

// not support nested objects
function stringify(obj: object, sep = '&', eq = '=') {
    if (typeof obj === 'object') {
        return Object.keys(obj)
            .map((k) => {
                var ks = stringifyPrimitive(k) + eq
                if (Array.isArray(obj[k])) {
                    return obj[k]
                        .map((v: any) => ks + stringifyPrimitive(v))
                        .join(sep)
                } else {
                    return ks + stringifyPrimitive(obj[k])
                }
            })
            .filter(Boolean)
            .join(sep)
    }
    return ''
}

/**
 * 拼装 URL
 * @param url
 * @param query
 */
function parseUrl(url: string, query: object) {
    const queryStr = stringify(query)
    return queryStr ? `${url}?${queryStr}` : url
}

/**
 * 保留当前页面，跳转到应用内的某个页面
 * @param url
 * @param options
 * @param isTab
 */
export function push(
    url: string,
    options?: PushToOptions,
    isTab: boolean = false
) {
    let params = options
        ? {
              url: options.query ? parseUrl(url, options.query) : url,
              complete: options.complete,
              fail: options.fail,
              success: options.success
          }
        : { url }
    isTab ? uni.switchTab(params) : uni.navigateTo(params)
}

/**
 * 关闭当前页面，跳转到应用内的某个页面
 * @param url
 * @param options
 * @param isTab
 */
export function replace(
    url: string,
    options?: ReplaceToOptions,
    isTab: boolean = false
) {
    let params = options
        ? {
              url: options.query ? parseUrl(url, options.query) : url,
              complete: options.complete,
              fail: options.fail,
              success: options.success
          }
        : { url }
    isTab ? uni.switchTab(params) : uni.redirectTo(params)
}

/**
 * 关闭所有页面，打开到应用内的某个页面
 * @param url
 * @param options
 * @param isTab
 */
export function reLaunch(
    url: string,
    options?: ReLaunchToOptions,
    isTab: boolean = false
) {
    let params = options
        ? {
              url: options.query ? parseUrl(url, options.query) : url,
              complete: options.complete,
              fail: options.fail,
              success: options.success
          }
        : { url }
    isTab ? uni.switchTab(params) : uni.reLaunch(params)
}

/**
 * 关闭当前页面，返回上一页面或多级页面
 * 返回的页面数，如果 delta 大于现有页面数，则返回到首页
 * @param delta
 */
export function go(delta: number) {
    uni.navigateBack({ delta })
}

/**
 * 关闭当前页面，返回上一页面或多级页面
 */
export function back() {
    uni.navigateBack()
}

export interface iNavigator {
    /**
     * 关闭当前页面，跳转到应用内的某个页面
     * @param url
     * @param options
     * @param isTab
     */
    push(url: string, options?: PushToOptions, isTab?: boolean): void

    /**
     * 关闭当前页面，跳转到应用内的某个页面
     * @param url
     * @param options
     * @param isTab
     */
    replace(url: string, options?: PushToOptions, isTab?: boolean): void

    /**
     * 关闭所有页面，打开到应用内的某个页面
     * @param url
     * @param options
     * @param isTab
     */
    reLaunch(url: string, options?: PushToOptions, isTab?: boolean): void

    /**
     * 关闭当前页面，返回上一页面或多级页面
     * 返回的页面数，如果 delta 大于现有页面数，则返回到首页
     * @param delta
     */
    go(delta: number): void

    /**
     * 关闭当前页面，返回上一页面或多级页面
     */
    back(): void
}

const navigator: iNavigator = {
    push,
    replace,
    reLaunch,
    go,
    back
}

export default {
    install(Vue: any) {
        if (Vue) {
            Vue.prototype.$navigator = navigator
        }
    }
}
