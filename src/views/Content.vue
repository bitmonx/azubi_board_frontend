<template>
  <div class="content">
    <div class="container">
      <app-header></app-header>
      <router-view></router-view>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Content',
  components: {
    'app-header': Header,
    'app-footer': Footer
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100vh;
  background-color: #fff;
}
</style>
