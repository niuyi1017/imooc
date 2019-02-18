<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from '@/api/singer'
import {ERR_OK} from '@/api/config'
import { createSong,  processSongsUrl } from '@/common/js/song'
import MusicList from '@/components/music-list/music-list'
export default {
  name: 'SingerDetail',
  data() {
    return {
      songs: []
    }
  },
  components: {
    MusicList
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters(
      [
      'singer'
      ]
    )
  },
  methods: {
    _getDetail(){
      if(!this.singer.id){
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if(res.code === ERR_OK){
          processSongsUrl(this._normalizeSongs(res.data.list)).then((songs) => {
            this.songs = songs
            // console.log(this.songs)
          })
          
        }
      })
    },
    _normalizeSongs(list){
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        if(musicData.songid && musicData.albummid){
          ret.push(createSong(musicData))
        }
      })
      return ret
    }

  },
  created() {
    this._getDetail()
  },
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>