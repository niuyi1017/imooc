<template>
<div class="menu-bar">
  <transition name="slide-up">
    <div class="menu-wrapper" v-show="ifTitleAndMenuShow" :class="{'hide-box-show':ifSettingShow||!ifTitleAndMenuShow}">
      <div class="icon-wrapper">
        <span class="icon-menu icon" @click="showSetting(3)"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-progress icon" @click="showSetting(2)"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-bright icon" @click="showSetting(1)"></span>
      </div>
      <div class="icon-wrapper icon">
        <span class="icon-a" @click="showSetting(0)">A</span>
      </div>
    </div>
  </transition>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="ifSettingShow">
      <div class="setting-font-size" v-if="showTag === 0">
        <div class="preview" :style="{fontSize: fontSizeList[0].fontSize+'px'}">A</div>
        <div class="select">
          <div class="select-wrapper"
          v-for="(item, index) in fontSizeList"
          :key="index"
          @click="setFontSize(item.fontSize)"
          >
            <div class="line"></div>
            <div class="point-wrapper">
              <div class="point" v-show="defaultFontSize=== item.fontSize">
                <div class="small-point"></div>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div class="preview" :style="{fontSize: fontSizeList[fontSizeList.length-1].fontSize+'px'}">A</div>
      </div>
      <div class="setting-theme" v-else-if="showTag === 1">
        <div class="setting-theme-item" v-for="(item, index) in themeList" :key="index" @click="setTheme(index)">
          <div class="preview" :style="{background: item.style.body.background}" :class="{'no-border': item.style.body.background !== '#fff'}"></div>
          <div class="text" :class="{'selected': index === defaultTheme}">{{item.name}}</div>
        </div>
      </div>
      <div class="setting-progress" v-else-if="showTag === 2">
        <div class="progress-wrapper">
          <input class="progress" type="range"
                                  max="100"
                                  min="0"
                                  step="1"
                                  @change="onProgressChange($event.target.value)"
                                  @input="onProgressInput($event.target.value)"
                                  :value="progress"
                                  :disabled="!bookAvailable"
                                  ref="progress">
        </div>
        <div class="text-wrapper">
          <span>{{bookAvailable ? progress + '%' : '加载中...'}}</span>
        </div>
      </div>
    </div>
  </transition>
  <content-view :ifShowContent="ifShowContent"
                v-show="ifShowContent"
                :navigation="navigation"
                :bookAvailable="bookAvailable"
                @jumpTo="jumpTo"></content-view>
  <transition name="fade">
    <div class="content-mask"
      v-show="ifShowContent"
      @click="hideContent">
    </div>
  </transition>
</div>
</template>
<script>
import ContentView from '@/components/Content'
export default {
  components: {
    ContentView
  },
  props: {
    ifTitleAndMenuShow: {
      type: Boolean,
      default: false
    },
    fontSizeList: Array,
    defaultFontSize: Number,
    themeList: Array,
    defaultTheme: Number,
    bookAvailable: Boolean,
    navigation: Object
  },
  data () {
    return {
      ifSettingShow: false,
      showTag: 0,
      progress: 0,
      ifShowContent: false
    }
  },
  methods: {
    jumpTo (target) {
      this.$emit('jumpTo', target)
    },
    hideContent () {
      this.ifShowContent = false
    },
    onProgressInput (progress) {
      this.progress = progress
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
    },
    onProgressChange (progress) {
      this.$emit('onProgressChange', progress)
    },
    setTheme (index) {
      this.$emit('setTheme', index)
    },
    showSetting (tag) {
      this.showTag = tag
      if (this.showTag === 3) {
        this.ifSettingShow = false
        this.ifShowContent = true
      } else {
        this.ifSettingShow = true
      }
    },
    hideSetting () {
      this.ifSettingShow = false
    },
    setFontSize (fontSize) {
      this.$emit('setFontSize', fontSize)
    }
  }
}
</script>
<style lang="scss" scoped>
 @import '../assets/styles/global';
.menu-bar {
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: px2rem(48);
    background: #ffffff;
    display: flex;
    z-index: 101;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    &.hide-box-show {
      box-shadow: none
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-progress {
        font-size:px2rem(24)
      }
      .icon-bright {
        font-size:px2rem(24)
      }
    }
  }
  .setting-wrapper {
    position: absolute;
    height: px2rem(60);
    bottom: px2rem(48);
    left: 0;
    background: #fff;
    width: 100%;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    z-index: 101;
    .setting-font-size {
      display: flex;
      height: 100%;
      .preview {
        flex: 0 0 px2rem(40);
        @include center
      }
      .select {
        flex: 1;
        display: flex;
        .select-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          &:first-child {
            .line {
              &:first-child {
                border-bottom: none
              }
            }
          }
          &:last-child {
            .line {
              &:last-child {
                border-bottom: none
              }
            }
          }
          .line {
            flex: 1;
            height: 0;
            border-bottom: px2rem(1) solid #ccc;
          }
          .point-wrapper {
            flex: 0 0 0;
            width: 0;
            height: px2rem(7);
            border-left: px2rem(1) solid #ccc;
            position: relative;
            .point {
              position: absolute;
              width: px2rem(18);
              height: px2rem(18);
              border: px2rem(1) solid #ccc;
              border-radius: 50%;
              box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, .15);
              top: px2rem(-6);
              left: px2rem(-10);
              @include center;
              .small-point {
                height: px2rem(8);
                width: px2rem(8);
                border-radius: 50%;
                background: #999;
              }
            }
          }
        }
      }
    }
    .setting-theme {
      height: 100%;
      display: flex;
      .setting-theme-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: px2rem(5);
        box-sizing: border-box;
        .preview {
          border: px2rem(1) solid #ccc;
          box-sizing: border-box;
          flex: 1;
          &.no-border {
            border: none;
          }
        }
        .text {
          flex: 0 0 px2rem(20);
          font-size: px2rem(14);
          color: #ccc;
          @include center;
          &.selected {
            color: #333;
          }
        }
      }
    }
    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      .progress-wrapper {
        width: 100%;
        height: 100%;
        @include center;
        padding: 0 px2rem(30);
        box-sizing: border-box;
        .progress {
          width: 100%;
          -webkit-appearance: none;
          height: px2rem(2);
          background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
          background-size: 0 100%;
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: px2rem(20);
            width: px2rem(20);
            border-radius: 50%;
            background: #fff;
            box-shadow: 0 px2rem(4) px2rem(4)  rgba(0, 0, 0, .15);
            border: px2rem(1) solid #ddd
          }
        }
      }
      .text-wrapper {
        position: absolute;
        // @include center;
        font-size: px2rem(12);
        bottom: px2rem(4);
        left: 47%;
      }
    }
  }
  .content-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 101;
    display: flex;
    background: rgba(51, 51, 51, 0.8)
  }
}
</style>
