/*
 * @Author: Wind Rises
 * @Date: 2020-05-23 20:02:25
 * @Last Modified by: Wind Rises
 * @Last Modified time: 2020-05-23 20:20:12
 */
<template>
    <button
        class="ok-btn"
        @click="click"
        :disabled="disabled"
        :class="{ disabled: disabled }"
    >
        {{ text }}
    </button>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component
export default class SubmitBtn extends Vue {
    @Prop({ type: String, default: '' })
    text

    @Prop({ type: Boolean, default: false })
    disabled

    @Emit('click')
    click() {}
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
