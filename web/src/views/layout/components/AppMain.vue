<template>
  <section :class="path_arr.includes($route.name)? 'home_app_main' : 'app-main'">
    <transition name="fade" mode="out-in">
      <keep-alive :include="[]">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      path_arr: ['home']
    }
  }
}
</script>
<style lang="scss">
.main-container {
  flex: 1;
}
.app-main {
  // min-height: calc(100vh - 80px);
  min-height: calc(100vh - 60px);
  // background: #070910;
  background: #16181A;
  overflow: auto;
  padding: 0 110px;
}
.home_app_main {
  min-height: calc(100vh);
  overflow: auto;
}
.fade-enter,
.fade-leave-to {
  visibility: hidden;
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity .01s ease;
}
.fade-enter-to,
.fade-leave {
  visibility: hidden;
  opacity: 1;
}
</style>
