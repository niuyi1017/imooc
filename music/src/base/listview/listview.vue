<template>
  <scroll 
          :data="data" 
          class="listview" 
          ref="listview"
          :listenScroll="listenScroll"
          @scroll="scroll"
          :probeType="probeType"
          >
    <ul>
      <li v-for="(group,index) in data" class="list-group" ref="listGroup" :key="index">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li 
              @click="selectItem(item)" 
              v-for="(item,index) in group.items"  
              class="list-group-item" 
              :key="index"
              >
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove"
         @touchend.stop>
      <ul>
        <li 
            class="item" 
            v-for="(item, index) in shortcut" 
            :key="index" 
            :data-index="index"
            :class="{'current': currentIndex==index}">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading/>
    </div>

  </scroll>
</template>
<script>
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading'
import { getData } from '@/common/js/dom'
const ANCHOR_HEIGHT = 18
const TITLT_HEIGHT = 28
export default {
  name: 'ListView',
  components: {
    Scroll,
    Loading
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    shortcut () {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    },
    fixedTitle () {
      if(this.scrollY > 0){
        return ''
      }
      return this.data[this.currentIndex]?this.data[this.currentIndex].title:''
    }
  },
  created() {
    this.touch = {},
    this.listenScroll = true,
    this.listHeight = [],
    this.probeType = 3
  },
  methods: {
    onShortcutTouchStart (e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove (e){
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex)  + delta
      this._scrollTo(anchorIndex)
    },
    refresh() {
      this.$refs.listview.refresh()
    },
    selectItem(item){
      this.$emit('select', item)
    },
    scroll(pos){
      this.scrollY = pos.y
    },
    _scrollTo (index) {
      if(!index && index !== 0){
        return
      }
      if(index < 0){
        index = 0
      }else if( index > this.listHeight.length-2){
        index = this.listHeight.length-2
      }
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      this.scrollY = -this.listHeight[index]
    },
    _calculateHeight () {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0;
      this.listHeight.push(height)
      for(let i = 0; i<list.length; i++){
        height += list[i].clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20);
    },
    scrollY (newY) {
      const listHeight = this.listHeight
      if (newY > 0){
        this.currentIndex = 0
        return 
      }
      for( let i = 0; i < listHeight.length-1; i++){
        let height1 = listHeight[i]
        let height2 = listHeight[i+1]
        if ( -newY >= height1 && -newY < height2 ){
          this.currentIndex = i
          this.diff = height2 + newY
          return 
        }
      }
      this.currentIndex = listHeight.length-2
    },
    diff (newVal) {
      let fixedTop = (newVal > 0 && newVal < TITLT_HEIGHT ) ? newVal - TITLT_HEIGHT : 0
      if(this.fixedTop === fixedTop){
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)` 
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@/common/stylus/variable"
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: -1px
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>