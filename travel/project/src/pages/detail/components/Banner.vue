<template>
  <div>
    <div class="banner" @click="handleBannerClick">
      <img class="banner-img" src="//img1.qunarzz.com/sight/p0/1705/e9/e993699e058a65a6a3.water.jpg_600x330_58c75a46.jpg">
      <div class="banner-info">
        <div class="banner-title">济南世贸宽</div>
        <div class="banner-number"><span class="iconfont icon-banner">&#xe631;</span>39</div>
      </div>
    </div>
    <gallary 
          :imgs="imgs" 
          v-show="showGallary"
          @close="handleClose"/>
  </div>
  
</template>
<script>
import Gallary from '@/common/gallary/Gallary'
export default {
  name: "DetailBanner",
  components: {
    Gallary
  },
  data () {
    return{
      imgs: ['//img1.qunarzz.com/sight/p0/1705/e9/e993699e058a65a6a3.water.jpg_600x330_58c75a46.jpg',
          '//img1.qunarzz.com/sight/p0/1408/20/1d9f6dd0750e74443f69434d616943fe.jpg_600x330_90e2a80c.jpg'
          ],
      showGallary: false
    }
  },
  methods: {
    handleBannerClick () {
      this.showGallary  = true
    },
    handleClose() {
      this.showGallary  = false
    }
  },
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
    background-image linear-gradient(to bottom, rgba(0,0,0,0),rgba(0,0,0,0.8))
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
