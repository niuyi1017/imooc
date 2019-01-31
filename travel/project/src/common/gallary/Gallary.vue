<template>
  <div class="container" @click="handleGallaryClick">
    <div class="wrapper">
      <swiper :options="swiperOption" >
      <swiper-slide v-for="(img, index) in imgs" :key="index" >
        <img class="gallary-img" :src="img">
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gallry',
  data() {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationType: "fraction",
        observeParents: true,
        observer: true
      },
    }
  },
  props: {
    imgs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    handleGallaryClick () {
      this.$emit('close')
    }
  },
}
</script>
<style lang="stylus" scoped>
.container >>> .swiper-container
  overflow inherit
.container
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background #000
  z-index 99
  display flex
  justify-content center
  flex-direction column
  .wrapper
    width 100%
    height 0
    padding-bottom 100%
    .gallary-img{
      width 100%
    }
    .swiper-pagination{
      color #ffffff
      bottom -1rem
    }
</style>
