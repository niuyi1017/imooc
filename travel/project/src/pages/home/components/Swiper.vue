<template>
  <div class="wrapper">
    <swiper :options="swiperOption" v-if="showSwiperList">
      <swiper-slide v-for="item of swiperList" :key="item.id">
        <img class="swiper-img" :src="item.imgUrl">
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
  export default{
    name: 'HomeSwiper',
    props:{
      swiperList: Array
    },
    data () {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          loop: true,
          autoplay: 3000
        }
      }
    },
    computed: {
      showSwiperList () {
        return this.swiperList.length
      }
    }
  }
</script>
<style lang="stylus" scoped>
.wrapper >>>.swiper-pagination-bullet-active
  background : #fff
.wrapper
  width: 100%
  height :0
  overflow hidden
  padding-bottom :26.79%
  background :#eee
  .swiper-img
    width : 100%
</style>
