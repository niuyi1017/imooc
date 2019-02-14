<template>
  <div id="app">
    <m-header></m-header>
  </div>
</template>

<script>

import MHeader from './components/m-header/m-header'
export default {
  name: 'app',
  components: {
    MHeader
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/common/stylus/variable";

</style>


