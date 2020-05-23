import Vue from 'vue'
import Request from '@/utils/request'
import { iNavigator } from '@/plugins/router-patch'
declare module '*.vue' {
    export default Vue
}

declare module 'vue/types/vue' {
    interface Vue {
        $http: Request
        $scan: () => Promise<string>
        $navigator: iNavigator
    }
}

declare global {
    const wx: any
    const my: any
}
