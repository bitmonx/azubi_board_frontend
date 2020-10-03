<!--Main component -->

<template>
  <div id="app">
    <div class="error" v-if="error">
      <h2>Es konnte leider keine Verbindung zum Server hergestellt werden.</h2>
    </div>
    <router-view v-else/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      error: false
    }
  },
  created () {
    axios.get('test')
      .then(res => {
        this.error = false
      })
      .catch(e => {
        this.error = true
      })
  }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
}
button[disabled] {
  cursor: not-allowed;
}
</style>
