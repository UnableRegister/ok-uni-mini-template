/*
 * @Author: Wind Rises
 * @Date: 2020-05-23 20:02:25
 * @Last Modified by: Wind Rises
 * @Last Modified time: 2020-05-23 20:04:09
 */

import Vue from 'vue'
import Vuex from 'vuex'
import { IAppState } from './modules/app'

Vue.use(Vuex)

export interface IRootState {
    app: IAppState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
