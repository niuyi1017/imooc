<template>
  <div class="header">
    <div class="header-left">
      <div class="iconfont icon-back">&#xe624;</div>
    </div>
    <div class="header-input">
      <span class="iconfont icon-search">&#xe632;</span>
      输入城市/景点/游玩主题</div>
   <router-link to="/city">
    <div class="header-right">
        {{this.city}}
        <span class="iconfont icon-arrow">&#xe6aa;</span>
    </div>
   </router-link>
   </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'HomeHeader',
  computed: {
    ...mapState(['city'])
  },
}
</script>
<style lang="stylus" scoped>
  @import '~@/assets/styles/varible.styl'
  .header
    height: $headerHeight
    line-height $headerHeight
    background: $bgColor
    color: #fff
    display: flex
    .header-left
      width: .64rem
      float: left
      .icon-back
        text-align :center
        font-size : .4rem
    .header-input
      flex: 1
      height: .64rem
      line-height : .64rem
      padding-left : .2rem
      margin-top : .12rem
      margin-left : .2rem
      border-radius : .1rem
      background :#fff
      color : #ccc
    .header-right
      min-width: 1.14rem
      padding 0 .1rem
      float: right
      text-align : center
      color #fff
      .icon-arrow
        font-size :.28rem
</style>
