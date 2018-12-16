<template>
  <div class="header">
    <div class="header-left">
      <div class="iconfont icon-back">&#xe624;</div>
    </div>
    <div class="header-input">
      <span class="iconfont icon-search">&#xe632;</span>
      输入城市/景点/游玩主题</div>
    <div class="header-right">
      {{city}}<span class="iconfont icon-arrow">&#xe6aa;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
  props: {
    city: String
  }
}
</script>
<style lang="stylus" scoped>
  @import '~@/assets/styles/varible.styl'
  .header
    height: .86rem
    line-height .86rem
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
      width: 1.24rem
      float: right
      text-align : center
      .icon-arrow
        font-size :.28rem
</style>
