<template>
  <div class="app-wrapper">
    <app-main></app-main>
  </div>
</template>

<script>
import { AppMain } from './components'
import { mapGetters } from 'vuex'
export default {
  name: 'layout',
  components: {
    AppMain
  },
  computed: {
    ...mapGetters(['userAuth'])
  },
  data() {
    return {
      aiText: 'AI<br/>助手'
    }
  },
  methods: {
    // 点击上传情报
    async uploadIntell() {
      if (this.$store.state.global.dialogVisible) return false
      this.$store.dispatch('toggleUploadDrawer', true)
    },
    // 打开openAi
    opneAiClick() {
      if (this.$store.state.global.dialogAiVisible) return false
      this.$store.dispatch('toggleAiDrawer', true)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .main-container{
    position: relative;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .btn_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 999;
    .zhongbaoqingbao{
      width: 34px;
      height: 82px;
      text-align: center;
      border-radius: 18px;
      font-size: 14px;
      padding: 10px;
      color: #ffffff;
      cursor: pointer;
      &.btnStatusColor{
        background-color: #2d1517;
        &:hover{
          background-color: #6F1426;
        }
        &:active{
          background-color: #b72337;
        }
      }

    }
    .ai {
      width: 40px;
      height: 40px;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
      background: #2d1517;
      color: #FFF;
      margin-top: 20px;
      &:hover{
        background-color: #6F1426;
      }
      &:active{
        background-color: #b72337;
      }
    }
  }
</style>
