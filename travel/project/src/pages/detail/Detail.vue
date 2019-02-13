<template>
  <div>
    <detail-banner
            :bannerImg="bannerImg"
            :gallaryImgs="gallaryImgs"
            :sightName="sightName"/>
    <detail-header :sightName="sightName"></detail-header>
    <div class="content">
      <detail-list :list="list"></detail-list>
    </div>
  </div>
</template>
<script>
import DetailBanner from './components/Banner'
import DetailHeader from './components/Header'
import DetailList from './components/List'
import axios from 'axios'
export default {
  name: "Detail",
  components:{
    DetailBanner,
    DetailHeader,
    DetailList
  },
  data() {
    return {
      sightName: '',
      bannerImg: '',
      gallaryImgs: [],
      list: []
    }
  },
  methods: {
    getDetailInfo () {
      axios.get('https://niuyi1017.github.io/imooc/travel/project/dist/mock/detail.json', {
      params: {
        id: this.$route.params.id
      }
    }).then(this.handleGetDataSucc)
    },
    handleGetDataSucc(res) {
      res = res.data
      if (res.ret && res.data){
        const data = res.data
        this.sightName = data.sightName
        this.bannerImg = data.bannerImg
        this.gallaryImgs = data.gallaryImgs
        this.list = data.categoryList
      } 
    }
  },
  mounted() {
    this.getDetailInfo()
  },
}
</script>
<style lang="stylus" scoped>
.content
  height: 50rem
</style>
