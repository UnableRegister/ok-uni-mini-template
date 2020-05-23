/*
 * @Author: Wind Rises
 * @Date: 2020-05-23 20:02:25
 * @Last Modified by: Wind Rises
 * @Last Modified time: 2020-05-23 20:05:23
 */
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    mpType: 'app',
    onLaunch() {
        console.log('App Launch')
    }
})
</script>

<style lang="stylus">
/* 每个页面公共css */
@import './styles/index.styl'

page, div, p, view, text, scroll-view, img, image, i, span, textarea, input
    box-sizing border-box

label
    line-height 1

p, div
    color #1A1A1A

page
    button
        border-radius 0
        padding 0
        margin-left 0
        margin-right 0
        outline none

        &::after
            display none
</style>
