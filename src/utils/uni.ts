/*
 * @Author: Wind Rises
 * @Date: 2020-05-23 20:02:25
 * @Last Modified by: Wind Rises
 * @Last Modified time: 2020-05-23 20:05:11
 */
// 是否已授权获取用户信息
export function getAuthSetting(scope: string) {
    return new Promise((resolve, reject) => {
        uni.getSetting({
            success: (res?) =>
                res.authSetting[scope] ? resolve(true) : resolve(false),
            fail: () => reject(false)
        })
    })
}

// 获取微信登录code
export function getLoginCode() {
    return new Promise((resolve, reject) => {
        uni.login({
            success: (res) => {
                return resolve(res.code)
            },
            fail: () => reject()
        })
    })
}

// 获取微信用户信息
export function getUserInfo() {
    return new Promise((resolve, reject) => {
        uni.getUserInfo({
            success: (res) => resolve(res),
            fail: () => reject()
        })
    })
}

// 扫描二维码
export function scan() {
    return new Promise((resolve, reject) => {
        uni.scanCode({
            onlyFromCamera: true,
            scanType: ['barCode'],
            success: ({ result }) => resolve(result?.trim()),
            fail: (res) => reject(res)
        })
    })
}
