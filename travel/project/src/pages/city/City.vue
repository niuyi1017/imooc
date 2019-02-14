<template>
  <div>
    <city-header/>
    <city-search
      :cities="cities"/>
    <city-list
      :cities="cities"
      :hotCities="hotCities"
      :letter="letter"/>
    <city-alphabet
      :cities="cities"
      @change="handleLetterChange"/>
  </div>
  
</template>
<script>
/* eslint-disable */ 
import axios from 'axios'
import CityHeader from '@/pages/city/components/CityHeader'
import CitySearch from './components/Search'
import CityList from './components/CityList'
import CityAlphabet from './components/CityAlphabet'
export default {
    name: 'City',
    components: {
      CityHeader,
      CitySearch,
      CityList,
      CityAlphabet
    },
    data () {
      return {
        cities:{},
        hotCities:[],
        letter: ''
      }
    },
    methods: {
      getCityInfo() {
        axios.get('https://niuyi1017.github.io/imooc/travel/project/dist/mock/city.json')
          .then(this.handleGetCityInfoSucc)
      },
      handleGetCityInfoSucc (res) {
        res = res.data
        if (res.ret && res.data){
          const data = res.data
          this.cities = data.cities 
          this.hotCities = data.hotCities
        }
      },
      handleLetterChange (key) {
        this.letter = key
      }
    },
    mounted() {
      this.getCityInfo()
    },
}
</script>