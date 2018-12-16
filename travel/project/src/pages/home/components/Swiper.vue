<template>
  <div class="wrapper">
    <swiper :options="swiperOption">
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
    data () {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          loop: true
        },
        swiperList: [
          {
            id: '0001',
            imgUrl: 'http://img1.qunarzz.com/piao/fusion/1812/47/a51fe403715df102.jpg_750x200_085792b6.jpg'
          },
          {
            id: '0002',
            imgUrl: 'http://img1.qunarzz.com/piao/fusion/1812/2f/49f6152a86eb4502.jpg_750x200_f4841fa3.jpg'
          }
        ]
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
