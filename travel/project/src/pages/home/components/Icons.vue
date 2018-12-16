<template>
  <div class="icons">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(page, index) of pages" :key="index">
        <div class="icon" v-for="item of page" :key="item.id">
          <div class="icon-img">
            <img class="icon-img-content" :src="item.imgUrl">
          </div>
          <p class="icon-desc">{{item.desc}}</p>
        </div>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
  export default {
    name: 'HomeIcons',
    props: {
      iconList: Array
    },
    data () {
      return {
        swiperOption: {
          autoplay: 0
        }
      }
    },
    computed: {
      pages () {
        const pages =[]
        this.iconList.forEach((item, index) => {
          const page = Math.floor(index/8)
          if(!pages[page]){
            pages[page]= []
          }
          pages[page].push(item)
        })
        return pages
      }
    }
  }
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/varible.styl'
.icons >>> .swiper-container
  height :0;
  padding-bottom :50%
.icons
  margin-top .1rem
  .icon
    position relative
    width 25%
    height 0
    padding-bottom 25%
    overflow hidden
    float left
    .icon-img
      position absolute
      top 0
      left 0
      right 0
      bottom .44rem
      // box-sizing border-box
      padding .1rem
      .icon-img-content
        height 100%
        display block
        margin 0 auto
    .icon-desc
      position absolute
      left 0
      right 0
      bottom 0
      height .44rem
      line-height .44rem
      color $darkText
      text-align center
</style>
