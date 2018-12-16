<template>
  <div>
    <div class="recommend-title">周末去哪儿</div>
    <ul>
      <li class="item border-bottom" v-for="item of weekendList" :key="item.id">
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
    props:{
      weekendList: Array
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
