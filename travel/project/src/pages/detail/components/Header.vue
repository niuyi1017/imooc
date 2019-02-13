<template>
  <div>
    <router-link 
        to="/" 
        tag="div" 
        class="header-abs"
        v-show="showAbs"
        :style="opacityStyleAbs"
        >
      <div class="iconfont header-abs-back">&#xe624;</div>
    </router-link>
    <div 
        class="header-fixed" 
        v-show="!showAbs"
        :style="opacityStyle">
      {{sightName}}
      <router-link to="/">
        <div class="iconfont header-fixed-back">&#xe624;</div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
/* eslint-disable */ 
  name: "DetailHeader",
  props: {
    sightName: String
  },
  data() {
    return {
      showAbs: true,
      opacityStyle: {
        opacity: 0
      },
      opacityStyleAbs: {
        opacity: 1
      }
    }
  },
  methods: {
    handleScroll () {
      const top = document.documentElement.scrollTop
      if(top < 60){
        let opacityAbs = 1 - (top/140)
        this.opacityStyleAbs = {opacity: opacityAbs }
      }
      if ( top > 60){
        let opacity = top / 140 
        opacity = opacity > 1 ? 1 : opacity
        this.opacityStyle = { opacity }
        this.showAbs = false
      }else{
        this.showAbs = true
      }
    }
  },
  mounted()  {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/varible.styl'
.header-abs
  position fixed
  left .2rem
  top .15rem
  height .8rem
  width .8rem
  border-radius .4rem
  text-align center
  background rgba(0,0,0,.7)
  .header-abs-back
    color #fff
    height .8rem
    line-height .8rem
.header-fixed
  position fixed
  top 0
  left 0
  right 0
  z-index 2
  height $headerHeight
  line-height $headerHeight
  color #ffffff
  background $bgColor
  text-align center
  font-size .32rem
  .header-fixed-back
    position absolute
    text-align center
    height .8rem
    width .64rem
    font-size .40rem
    top 0
    left 0
    color #fff

</style>
