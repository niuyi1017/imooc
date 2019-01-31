<template>
  <div>
    <div class="recommend-title">热销推荐</div>
    <ul>
      <router-link 
        tag="li"
        class="item border-bottom" 
        v-for="item of recommendList" 
        :key="item.id"
        :to="'/detail/'+ item.id">
        <img :src="item.imgUrl" alt="" class="item-img">
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <p class="item-desc">{{item.desc}}</p>
          <button class="item-button">查看详情</button>
        </div>
     </router-link>
    </ul>
  </div>
</template>
<script>
  export default {
    name: "HomeRecommend",
    props: {
      recommendList: Array
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
