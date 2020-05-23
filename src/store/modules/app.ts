/*
 * @Author: Wind Rises
 * @Date: 2020-05-23 20:02:25
 * @Last Modified by: Wind Rises
 * @Last Modified time: 2020-05-23 20:04:14
 */
import {
    VuexModule,
    Module,
    Mutation,
    Action,
    getModule
} from 'vuex-module-decorators'
import store from '@/store'
import { getLoginCode, getUserInfo, getAuthSetting } from '@/utils/uni'
import http from '@/utils/http'

export interface IAppState {
    token: string
    handling401: boolean
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
    public token = uni.getStorageSync('token') || ''
    public handling401 = false

    @Mutation
    public SET_TOKEN(token: string) {
        this.token = token
    }

    @Mutation
    public SET_HANDLING401(handling401: boolean) {
        this.handling401 = handling401
    }

    @Action
    public async Login(data: { username: string; password: string }) {
        return http.post('/passport/login', data).then((data: any) => {
            uni.setStorageSync('token', data.authorization)
            this.SET_TOKEN(data.authorization)
        })
    }
}

export const AppModule = getModule(App, store)
