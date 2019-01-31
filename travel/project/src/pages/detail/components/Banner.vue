<template>
  <div class="banner">
    <img class="banner-img" src="//img1.qunarzz.com/sight/p0/1705/e9/e993699e058a65a6a3.water.jpg_600x330_58c75a46.jpg">
    <div class="banner-info">
      <div class="banner-title">济南世贸宽</div>
      <div class="banner-number"><span class="iconfont icon-banner">&#xe631;</span>39</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailBanner"
}
</script>
<style lang="stylus" scoped>
.banner
  overflow hidden
  height 0
  padding-bottom 50%
  position relative
  .banner-img
    width 100%
  .banner-info
    position absolute
    bottom 0
    left 0
    right 0
    display flex
    height .6rem
    line-height .6rem
    background-image linear-gradient(top, rgba(0,0,0,0),rgba(0,0,0,0.8))
    .banner-title
      flex 1
      color #fff
      font-size .32rem
      padding 0 .2rem
    .banner-number 
      padding 0 .4rem
      height  .32rem
      line-height .32rem
      border-radius .2rem
      background rgba(0, 0, 0, .8)
      color #fff
      font-size .24rem
      margin-right .2rem
      margin-top .14rem
      .icon-banner
        font-size .24rem
        margin-right  .1rem
</style>
