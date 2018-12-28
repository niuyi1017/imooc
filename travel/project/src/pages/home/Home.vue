<template>
  <div>
    <home-header :city="city"/>
    <home-swiper :swiperList="swiperList"/>
    <home-icons :iconList="iconList"/>
    <home-recommend :recommendList="recommendList" />
    <home-weekend :weekendList="weekendList"/> 
  </div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeSwiper from './components/Swiper'
import HomeIcons from './components/Icons'
import HomeRecommend from './components/Recommend'
import HomeWeekend from './components/Weekend'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend
  },
  data (){
    return {
     city: '',
     swiperList: [],
     iconList: [],
     recommendList: [],
     weekendList: [],
    }
  },
  methods: {
    getHomeInfo () {
      axios.get('/mock/index.json')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if(res.ret && res.data){
        const data = res.data
        this.city = data.city
        this.swiperList = data.swiperList
        this.iconList = data.iconList
        this.recommendList = data.recommendList
        this.weekendList = data.weekendList
      }
    }
  },
  mounted() {
    this.getHomeInfo()
  }
}
</script>
<style>

</style>
