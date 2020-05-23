/*
 * @Author: Wind Rises
 * @Date: 2020-05-23 20:02:25
 * @Last Modified by: Wind Rises
 * @Last Modified time: 2020-05-23 20:29:01
 */
<template>
    <ok-pageLayout>
        <div slot="header" class="page-header fcc shadow-box relative">
            Header
        </div>
        <div slot="content" class="page-content fcc">
            <ok-loading />
        </div>
        <div slot="footer" class="page-header fcc shadow-box relative">
            Footer
        </div>
    </ok-pageLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HomePage extends Vue {}
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
