<template>
  <div id="app">
    <m-header></m-header>
    <tab/>
    <keep-alive>
      <router-view>
      </router-view>
    </keep-alive>
   <player/>
  </div>
</template>
<script>
import MHeader from './components/m-header/m-header'
import Tab from './components/tab/tab'
import Player from './components/player/player'
export default {
  name: 'app',
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/common/stylus/variable";

</style>


