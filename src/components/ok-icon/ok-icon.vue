/*
 * @Author: Wind Rises
 * @Date: 2020-05-23 20:02:25
 * @Last Modified by:   Wind Rises
 * @Last Modified time: 2020-05-23 20:02:25
 */
<template>
    <div
        class="ok-icon"
        :class="[
            labelPos == 'bottom'
                ? 'ok-flex-col ok-row-center'
                : 'ok-flex ok-col-center'
        ]"
    >
        <span
            class="ok-icon__icon"
            :class="customClass"
            :style="[iconStyle]"
            @tap="click"
            :hover-class="hoverClass"
            @touchstart="touchstart"
        ></span>
        <span
            v-if="label"
            class="ok-icon__label"
            :style="{
                color: labelColor,
                fontSize: labelSize + 'rpx',
                marginLeft: labelPos == 'right' ? marginLeft + 'rpx' : 0,
                marginTop: labelPos == 'bottom' ? marginTop + 'rpx' : 0
            }"
            >{{ label }}</span
        >
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class OkIcon extends Vue {
    // 图标类名
    @Prop({ type: String, default: '' })
    name

    // 图标颜色
    @Prop({ type: String, default: '' })
    color

    // 字体大小，单位rpx
    @Prop({ type: String, default: 'inherit' })
    size

    // 是否显示粗体
    @Prop({ type: Boolean, default: false })
    bold

    // 自定义扩展前缀，方便用户扩展自己的图标库
    @Prop({ type: String, default: 'icon' })
    customPrefix

    // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
    @Prop({ type: [Number, String], default: '' })
    index

    // 触摸图标时的类名
    @Prop({ type: String, default: '' })
    hoverClass

    // 图标右边或者下面的文字
    @Prop({ type: String, default: '' })
    label

    // label的位置，只能右边或者下边
    @Prop({ type: String, default: '' })
    labelPos

    // label的大小
    @Prop({ type: [String, Number], default: '28' })
    labelSize

    // label的颜色
    @Prop({ type: String, default: '#606266' })
    labelColor

    // label的颜色
    @Prop({ type: [String, Number], default: '6' })
    marginLeft

    // label的颜色
    @Prop({ type: [String, Number], default: '12' })
    marginTop

    get customClass() {
        let classes: string[] | string = []
        classes.push(this.customPrefix + '-' + this.name)
        // uView的自定义图标类名为ok-iconfont
        if (this.customPrefix === 'icon') classes.push('ok-iconfont')
        else classes.push(this.customPrefix)
        // #ifdef MP-ALIPAY
        classes = classes.join(' ')
        // #endif
        return classes
    }

    get iconStyle() {
        let style: any = {}
        style = {
            fontSize: this.size === 'inherit' ? 'inherit' : this.size + 'rpx',
            fontWeight: this.bold ? 'bold' : 'normal'
        }
        if (this.color) style.color = this.color
        return style
    }

    click() {
        this.$emit('click', this.index)
    }

    touchstart() {
        this.$emit('touchstart', this.index)
    }
}
</script>

<style lang='stylus' scoped>
@import './index.styl'
</style>
