<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <div class="button-list">
          <div class="button-wrapper">
            <div class="button">{{this.currentCity}}</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list">
          <div class="button-wrapper" 
            v-for="item of hotCities"
            :key="item.id"
            @click="handleCityClick(item.name)">
            <div class="button">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="area"
        v-for="(item , key) of cities"
        :key="key"
        :ref="key">
        <div class="title border-topbottom">{{key}}</div>
        <div class="item-list needsclick"
          :key="innerItem.id"
          v-for="innerItem of item"
          @click="handleCityClick(innerItem.name)">
          <div class="item border-bottom">{{innerItem.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Bscroll from 'better-scroll'
import { mapState, mapMutations } from "vuex";
export default {
  name: 'CityList',
  props: {
    hotCities: Array,
    cities: Object,
    letter: String
  },
  computed: {
    ...mapState({
      currentCity: 'city'
    })
  },
  methods: {
    handleCityClick (city){
      this.changeCity(city)
      this.$router.push('/')
    },
    ...mapMutations(['changeCity'])
  },
  watch: {
    letter () {
      if(this.letter){
        const element = this.$refs[this.letter][0]
        this.scroll.scrollToElement(element)
      }
    }
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.wrapper)
  },
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/varible.styl'
  .border-topbottom
    &:before
      border-color: #ccc
    &:after
      border-color: #ccc
  .border-bottom
    &:before
      border-color: #ccc
.list
  position absolute
  top 1.78rem
  left 0
  right 0
  bottom 0
  overflow hidden
  .title
    height .54rem
    color #666
    line-height .54rem
    background #eee
    padding-left .2rem
  .button-list
    overflow hidden
    padding .1rem .6rem .1rem .1rem
    .button-wrapper
      width: 33.33%
      float left
    .button 
      margin .1rem
      padding .1rem 0
      text-align center
      border: .02rem solid #ccc
      border-radius: .06rem
  .item-list
    .item
      height .76rem
      line-height .76rem
      padding 0 .2rem
</style>
