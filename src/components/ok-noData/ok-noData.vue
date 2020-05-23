/*
 * @Author: Wind Rises
 * @Date: 2020-05-23 20:02:25
 * @Last Modified by: Wind Rises
 * @Last Modified time: 2020-05-23 20:20:51
 */
<template>
    <div class="ok-no-data dir-top fcc">
        <image src="https://pic.hi-books.com/bookshelf-none-status.png" />
        <span class="text">
            {{ text }}
        </span>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class NoData extends Vue {
    @Prop({ type: String, default: '还没有数据哦~' }) text
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
