/*
 * @Author: Wind Rises
 * @Date: 2020-04-23 14:18:50
 * @Last Modified by: Wind Rises
 * @Last Modified time: 2020-05-23 20:21:25
 */
<template>
    <div class="ok-loadmore fcc">
        <span v-if="noMore" class="no-more">{{ text }}</span>
        <iLoading v-else-if="loading" />
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class LoadMore extends Vue {
    @Prop({ type: Boolean, default: false })
    loading

    @Prop({ type: Boolean, default: false })
    noMore

    @Prop({ type: String, default: '没有更多数据了' })
    text
}
</script>

<style lang='stylus' scoped>
@import './index.styl'
</style>
