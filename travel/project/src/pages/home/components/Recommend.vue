<template>
  <div>
    <div class="recommend-title">热销推荐</div>
    <ul>
      <li class="item border-bottom" v-for="item of recommendList" :key="item.id">
        <img :src="item.imgUrl" alt="" class="item-img">
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <p class="item-desc">{{item.desc}}</p>
          <button class="item-button">查看详情</button>
        </div>
        
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: "HomeRecommend",
    data () {
      return {
        recommendList: [
          {
            id: '0001',
            imgUrl: 'http://img1.qunarzz.com/sight/p0/1705/e9/e993699e058a65a6a3.water.jpg_200x200_64b651df.jpg',
            title: '济南宽厚里',
            desc: '一提起宽厚里，很多老济南的记忆就复苏了'
          },
          {
            id: '0002',
            imgUrl: 'http://img1.qunarzz.com/sight/p0/1607/c8/c8fa052a53e569c3b4.img.jpg_200x200_6a28d20a.jpg',
            title: '济南方特东方神画',
            desc: '一提起宽厚里，很多老济南的记忆就复苏了'
          },
          {
            id: '0003',
            imgUrl: 'http://img1.qunarzz.com/sight/p0/1705/e9/e993699e058a65a6a3.water.jpg_200x200_64b651df.jpg',
            title: '济南宽厚里',
            desc: '一提起宽厚里，很多老济南的记忆就复苏了'
          },
          {
            id: '0004',
            imgUrl: 'http://img1.qunarzz.com/sight/p0/1607/c8/c8fa052a53e569c3b4.img.jpg_200x200_6a28d20a.jpg',
            title: '济南方特东方神画',
            desc: '一提起宽厚里，很多老济南的记忆就复苏了'
          },
          {
            id: '0005',
            imgUrl: 'http://img1.qunarzz.com/sight/p0/1705/e9/e993699e058a65a6a3.water.jpg_200x200_64b651df.jpg',
            title: '济南宽厚里',
            desc: '一提起宽厚里，很多老济南的记忆就复苏了'
          },
          {
            id: '0006',
            imgUrl: 'http://img1.qunarzz.com/sight/p0/1607/c8/c8fa052a53e569c3b4.img.jpg_200x200_6a28d20a.jpg',
            title: '济南方特东方神画',
            desc: '一提起宽厚里，很多老济南的记忆就复苏了'
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
.item
  overflow hidden
  display flex
  height 1.9rem
  padding .1rem
  .item-img
    height 1.7rem
    width 1.7rem
    padding .1rem
  .item-info
    flex 1
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
    .item-button
      line-height .40rem
      height .40rem
      margin-top .16rem
      font-size .24rem
      background #ff9300
      padding 0 .2rem
      border-radius .06rem
      color #fff


</style>
