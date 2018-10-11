<template>
  <transition name="slide-right">
    <div class="content">
      <div class="content-wrapper" v-if="bookAvailable">
        <div class="content-item" v-for="(item, index) in navigation.toc" :key="index" @click="jumpTo(item.href)">
          <span class="text">{{item.label}}</span>
        </div>
      </div>
      <div class="empty" v-else>loading...</div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    ifShowContet: Boolean,
    navigation: Object,
    bookAvailable: Boolean
  },
  methods: {
    jumpTo (target) {
      this.$emit('jumpTo', target)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/styles/global";
.content {
  position: absolute;
  top:0;
  left:0;
  z-index: 102;
  width: 80%;
  height: 100%;
  background: #fff;
  .content-wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
    .content-item {
      padding: px2rem(20) px2rem(15);
      border-bottom: px2rem(1) solid #f4f4f4;
      .text {
        font-size: px2rem(14);
        color: #333;
      }
    }
  }
  .empty {
    width: 100%;
    height: 100%;
    @include center;
    font-size: px2rem(16);
    color: #333;
  }
}
</style>
