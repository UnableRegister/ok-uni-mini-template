/*
 * @Author: Wind Rises
 * @Date: 2020-05-23 20:02:25
 * @Last Modified by: Wind Rises
 * @Last Modified time: 2020-05-23 20:17:23
 */
<template>
    <div class="ok-input">
        <input
            v-model="inputValue"
            :type="type"
            :placeholder="placeholder"
            :maxlength="maxlength"
            @confirm="done"
            @keyup.enter="done"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Input extends Vue {
    inputValue = ''

    @Prop({ type: String, default: '' })
    value

    @Prop({ type: String, default: '' })
    placeholder

    @Prop({ type: String, default: 'text' })
    type

    @Prop({ type: Number, default: 20 })
    maxlength

    @Watch('value', { immediate: true })
    valueChange() {
        this.inputValue = this.value
    }

    @Watch('inputValue')
    inputValueChange() {
        this.$emit('input', this.inputValue)
    }

    done() {
        this.$emit('done', this.inputValue)
    }
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
