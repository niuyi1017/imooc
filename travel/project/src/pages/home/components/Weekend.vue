<template>
  <div>
    <div class="recommend-title">周末去哪儿</div>
    <ul>
      <li class="item border-bottom" v-for="item of recommendList" :key="item.id">
        <div class="item-img-wrapper">
          <img :src="item.imgUrl" alt="" class="item-img">
        </div>
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <p class="item-desc">{{item.desc}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: "HomeWeekend",
    data () {
      return {
        recommendList: [
          {
            id: '0001',
            imgUrl: 'http://img1.qunarzz.com/sight/source/1505/87/b46b43303b585c.jpg_r_640x214_af2aa659.jpg',
            title: '泉城泉景知多少',
            desc: '领略泉城的独特魅力，一座老城有山有水，暖暖的阳光滋润着大地，这么美好的画面啊'
          },
          {
            id: '0002',
            imgUrl: 'http://img1.qunarzz.com/sight/source/1505/94/f48c88a43966be.jpg_r_640x214_629e5387.jpg',
            title: '博物馆中认识青岛',
            desc: '想真正了解青岛，博物馆非去不可，寻访青岛啤酒发源地，体验到酿酒过程及工艺流程'
          },
          {
            id: '0003',
            imgUrl: 'http://img1.qunarzz.com/sight/source/1505/87/b46b43303b585c.jpg_r_640x214_af2aa659.jpg',
            title: '泉城泉景知多少',
            desc: '领略泉城的独特魅力，一座老城有山有水，暖暖的阳光滋润着大地，这么美好的画面啊'
          },
          {
            id: '0004',
            imgUrl: 'http://img1.qunarzz.com/sight/source/1505/94/f48c88a43966be.jpg_r_640x214_629e5387.jpg',
            title: '博物馆中认识青岛',
            desc: '想真正了解青岛，博物馆非去不可，寻访青岛啤酒发源地，体验到酿酒过程及工艺流程'
          }
        ]
      }
    }
  }
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/mixins.styl'
.recommend-title
  line-height .8rem
  height .8rem
  background #eee
  margin-top .2rem
  text-indent .2rem
.item-img-wrapper
  height 0
  overflow hidden
  padding-bottom 33.9%
  .item-img
    width 100%
.item-info
  padding .1rem
  min-width 0
  .item-title
    line-height .54rem
    font-size .32rem
    ellipsis()
  .item-desc
    line-height .54rem
    color #999
    ellipsis()
</style>
