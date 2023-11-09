<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script>
  export default {
    name: 'App',
    provide() {
      return {
        reload: this.reload,
        chnageVisible: this.chnageVisible
      }
    },
    data() {
      return {
        isRouterAlive: true,
        visible: false
      }
    },
    mounted() {
      if (navigator.userAgent.toLowerCase().split('mac').length === 1) {
        document.querySelector('#ve_html').className += ' win'
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(() => {
          this.isRouterAlive = true
        })
      },
      chnageVisible(isOpen) {
        // console.log(isOpen, '99999')
        this.visible = isOpen
      },
      ClickVisiable() {
        // this.visible = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .Obscuration {
    width: 100vw;
    min-height: 830px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 96px;
    background: rgba(0,0,0,1);
    z-index: 2;
  }
</style>

