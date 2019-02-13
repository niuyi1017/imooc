<template>
  <div>
    <div class="banner" @click="handleBannerClick">
      <img class="banner-img" :src="bannerImg">
      <div class="banner-info">
        <div class="banner-title">{{this.sightName}}</div>
        <div class="banner-number"><span class="iconfont icon-banner">&#xe631;</span>{{this.gallaryImgs.length}}</div>
      </div>
    </div>
    <fade-animate>
      <gallary 
            :imgs="gallaryImgs" 
            v-show="showGallary"
            @close="handleClose"/>
    </fade-animate>
  </div>
  
</template>
<script>
import Gallary from '@/common/gallary/Gallary'
import FadeAnimate from '@/common/fade/Fade'
export default {
  name: "DetailBanner",
  components: {
    Gallary,
    FadeAnimate
  },
  props: {
    bannerImg: String,
    gallaryImgs: Array,
    sightName: String
  },
  data () {
    return{
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
