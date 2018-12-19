<template>
  <div class="search">
    <input type="text" class="input-search" placeholder="输入城市名或拼音">
  </div>
</template>
<script>
  export default {
    name: 'Search'
  }
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/varible.styl'
.search
  height .72rem
  line-height .72rem
  background $bgColor
  padding .1rem
  .input-search
    width 100%
    height .62rem
    line-height .62rem
    border-radius .1rem
    text-align center
    color #666
    padding .2rem
    box-sizing border-box
</style>
