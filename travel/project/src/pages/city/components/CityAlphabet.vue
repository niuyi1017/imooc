<template>
  <ul class="list">
    <li class="item needsclick"
      v-for="item of letters"
      :key="item"
      :ref="item"
      @click="handleLetterClick(item)"
      @touchstart.prevent="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd">{{item}}</li>
  </ul>
</template>
<script>
 /* eslint-disable */ 
  export default{
    name: 'CityAlphabet',
    data() {
      return {
        touchStatus: false,
        startY: 0,
        timer: null
      }
    },
    updated() {
      this.startY = this.$refs['A'][0].offsetTop
    },
    computed: {
      letters () {
        const letters = []
        for(let i in this.cities){
          letters.push(i)
        }
        return letters
      }
    },
    props:{
      cities: Object
    },
    methods: {
      handleLetterClick (key){
        this.$emit('change',key)
      },
      handleTouchStart () {
        this.touchStatus = true
      },
      handleTouchMove (e) {
        if(this.touchStatus){
          if(this.timer){
            clearTimeout(this.timer)
          }
          this.timer = setTimeout(() => {
            const touchY = e.touches[0].clientY -79
            const index = Math.floor((touchY-this.startY)/20)
            if(index >= 0 && index < this.letters.length){
              this.$emit('change', this.letters[index])
            }
          }, 16);
        }
      },
      handleTouchEnd () {
        this.touchStatus = false
      }
    },
  }

</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/varible.styl'
.list
  display flex
  flex-direction column
  justify-content center
  position: absolute
  top: 1.58rem
  right: 0
  bottom: 0
  width: .4rem
  .item
    line-height: .4rem
    text-align: center
    color: $bgColor
</style>
