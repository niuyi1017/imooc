<template>
  <div id="app">
    <m-header></m-header>
    <tab/>
    <router-view>

    </router-view>
  </div>
</template>

<script>

import MHeader from './components/m-header/m-header'
import Tab from './components/tab/tab'
export default {
  name: 'app',
  components: {
    MHeader,
    Tab
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/common/stylus/variable";

</style>


