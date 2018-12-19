<template>
  <div class="header">
    城市选择
    <router-link to="/">
      <div class="iconfont icon-back">&#xe624;</div>
    </router-link>
    
  </div>
</template>
<script>
  export default {
    name: 'CityHeader'
  }
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/varible.styl'
.header
  position relative
  height $headerHeight
  line-height $headerHeight
  color #ffffff
  background $bgColor
  text-align center
  font-size .32rem
  .icon-back
    position absolute
    text-align center
    height .8rem
    width .64rem
    font-size .40rem
    top 0
    left 0
    color #fff
</style>
