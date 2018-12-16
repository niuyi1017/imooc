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
    data () {
      return {
        swiperOption: {
          autoplay: 0
        },
        iconList: [
          {
            id: '001',
            imgUrl: "http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png",
            desc: '景点门票'
          },
          {
            id: '002',
            imgUrl: "http://img1.qunarzz.com/piao/fusion/1804/ff/fdf170ee89594b02.png",
            desc: '济南必游'
          },
          {
            id: '003',
            imgUrl: "http://img1.qunarzz.com/piao/fusion/1803/96/c70f1e85ae4a4f02.png",
            desc: '自然风光'
          },
          {
            id: '004',
            imgUrl: "http://img1.qunarzz.com/piao/fusion/1804/5a/13ceb38dcf262f02.png",
            desc: '一日游'
          },
          {
            id: '005',
            imgUrl: "http://img1.qunarzz.com/piao/fusion/1803/ab/6f7d6e44963c9302.png",
            desc: '泡温泉'
          },
          {
            id: '006',
            imgUrl: "http://img1.qunarzz.com/piao/fusion/1811/f6/e54fad3ea337b02.gif",
            desc: '立减30'
          },
          {
            id: '007',
            imgUrl: "http://img1.qunarzz.com/piao/fusion/1803/20/831d62d2e1c7be02.png",
            desc: '名胜古迹'
          },
          {
            id: '008',
            imgUrl: "http://img1.qunarzz.com/piao/fusion/1803/20/831d62d2e1c7be02.png",
            desc: '趵突泉'
          },
          {
            id: '009',
            imgUrl: "http://img1.qunarzz.com/piao/fusion/1803/47/c2b659e048b11602.png",
            desc: '济南动物园'
          },
          {
            id: '010',
            imgUrl: "http://img1.qunarzz.com/piao/fusion/1803/80/416c6ab3368d1f02.png",
            desc: '全部玩乐'
          }
        ]
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
