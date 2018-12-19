<template>
  <div>
    <city-header/>
    <search/>
  </div>
  
</template>
<script>
import CityHeader from '@/pages/city/components/CityHeader'
import Search from './components/Search'
export default {
    name: 'City',
    components: {
      CityHeader,
      Search
    }
}
</script>