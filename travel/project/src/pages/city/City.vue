<template>
  <div>
    <city-header/>
    <city-search/>
    <city-list/>
    <city-alphabet/>
  </div>
  
</template>
<script>
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
    }
}
</script>