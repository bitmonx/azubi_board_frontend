<template>
    <div class="listing">
      <app-list parent="listing" :list="list"></app-list>
      <router-view :key="$route.fullPath"></router-view>
    </div>
</template>

<script>
import List from '@/components/List'

export default {
  name: 'Listing',
  components: {
    'app-list': List
  },
  computed: {
    list () {
      return this.$store.getters.getCurrent
    }
  },
  beforeCreate () {
    this.$store.dispatch('fetchCurrent')
  }
}
</script>

<style lang="scss" scoped>
.listing {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  div {
    width: 45%;
    min-width: 400px;
  }
}
</style>
