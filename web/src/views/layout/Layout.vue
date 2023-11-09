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
    return {}
  }
}
</script>

