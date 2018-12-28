<template>
  <div>
    <city-header/>
    <city-search/>
    <city-list
      :cities="cities"
      :hotCities="hotCities"/>
    <city-alphabet/>
  </div>
  
</template>
<script>
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
        cities:[],
        hotCities:[]
      }
    },
    methods: {
      getCityInfo() {
        axios.get('/mock/city.json')
          .then(this.handleGetCityInfoSucc)
      },
      handleGetCityInfoSucc (res) {
        res = res.data
        if (res.ret && res.data){
          const data = res.data
          this.cities = data.cities 
          this.hotCities = data.hotCities
        }
      }
    },
    mounted() {
      this.getCityInfo()
    },
}
</script>