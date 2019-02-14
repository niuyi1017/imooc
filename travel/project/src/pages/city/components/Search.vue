<template>
  <div>
    <div class="search">
      <input type="text" 
            v-model="keyword"
            class="input-search" 
            placeholder="输入城市名或拼音">
    </div>
    <div  class="search-content" 
          ref="search"
          v-show="keyword">
      <ul>
        <li 
          class="search-item border-bottom needsclick"
          v-for="item of list"
          :key="item.id"
          @click="handleCityClick(item.name)"
        >{{item.name}}
        </li>
        <li 
          class="search-item border-bottom"
          v-show="hasNoData"
          >没有找到匹配数据</li>
      </ul>
    </div>
  </div>
  
</template>
<script>
import Bscroll from 'better-scroll'
import { mapMutations } from 'vuex'
export default {
  name: 'Search',
  data() {
    return {
      keyword: "",
      list: [],
      timer: null
    }
  },
  methods: {
    handleCityClick (city){
      this.changeCity(city)
      this.$router.push('/')
    },
    ...mapMutations(['changeCity'])
  },
  watch: {
    keyword (){
      if(this.timer){
        clearTimeout(this.timer)
      }
      if(!this.keyword){
        this.list = []
        return
      }
      this.timer = setTimeout(() => {
        const result = []
        for (let i in this.cities){
          this.cities[i].forEach((value) => {
            if(value.spell.indexOf(this.keyword) > -1 ||
                value.name.indexOf(this.keyword) > -1){
                  result.push(value)
                }
          });
        }
        this.list = result
      }, 100);
    }
  },
  props:{
    cities: Object
  },
  computed: {
    hasNoData () {
      return !this.list.length
    }
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.search)
  },
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/varible.styl'
.search
  height .72rem
  line-height .72rem
  background $bgColor
  padding .1rem
  .input-search
    width 100%
    height .62rem
    line-height .62rem
    border-radius .1rem
    text-align center
    color #666
    padding .2rem
    box-sizing border-box
.search-content
  position absolute
  top 1.78rem
  left 0
  right 0
  bottom 0
  background #eee
  z-index 1
  overflow hidden
  .search-item
    line-height .62rem
    padding-left .2rem
    color #666
    background #fff

</style>
