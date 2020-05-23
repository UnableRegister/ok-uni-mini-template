/*
 * @Author: Wind Rises
 * @Date: 2020-05-23 20:02:25
 * @Last Modified by: Wind Rises
 * @Last Modified time: 2020-05-23 20:27:19
 */
<template>
    <div class="page-layout">
        <div
            v-if="pageMode === 'init'"
            class="page-init fcc"
            :style="{ height: defaultHeight }"
        >
            <slot name="init">
                <iLoading />
            </slot>
        </div>

        <div
            v-if="pageMode === 'default'"
            class="page-default fcc"
            :style="{ height: defaultHeight }"
        >
            <slot name="default">
                <iNoData :text="defaultText" />
            </slot>
        </div>

        <!-- header -->
        <div v-if="pageMode === 'content'" class="page-header">
            <slot name="header" />
        </div>

        <!-- content -->
        <scroll-view
            v-if="pageMode === 'content' && scrollView"
            class="page-content f-box-1"
            scroll-y="true"
            :style="{
                'background-color': contentBgColor
            }"
            @scrolltolower="scrolltolower"
            @scroll="scroll"
        >
            <slot name="content" />
        </scroll-view>

        <div
            v-else-if="pageMode === 'content' && !scrollView"
            class="page-content box"
            :style="{
                height: contentHeight,
                'background-color': contentBgColor
            }"
        >
            <slot name="content" />
        </div>

        <!-- popup -->
        <!-- fix ios fixed -->
        <div class="popup-box">
            <slot name="popup" />
        </div>

        <!-- footer -->
        <div v-if="pageMode === 'content'" class="page-footer">
            <slot name="footer" />
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component
export default class PageLayout extends Vue {
    @Prop({ type: String, default: '还没有数据哦' })
    defaultText

    @Prop({ type: Boolean, default: true })
    scrollView

    @Prop({ type: String, default: '0rpx' })
    headerHeight

    @Prop({ type: String, default: '0rpx' })
    footerHeight

    // 页面模式 ['init' | 'default' | 'content']
    @Prop({ type: String, default: 'content' })
    pageMode

    // 内容区背景色
    @Prop({ type: String, default: '#FFF' })
    contentBgColor

    get contentHeight() {
        return `calc(100% - ${this.headerHeight} - ${this.footerHeight})`
    }

    get defaultHeight() {
        return '100%'
    }

    @Emit()
    scrolltolower() {}

    @Emit()
    scroll(e) {
        return e.detail.scrollTop
    }
}
</script>

<style lang='stylus' scoped>
@import './index.styl'
</style>
