<template>
  <div class="checkedListings">
    <div class="row"  v-if="listings.length > 0">
      <div class="col-6" v-for="(listing, index) in listings" :key="index">
        <app-list parent="checkedListings" :list="listing" :index="index"></app-list>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-6 offset-3">
        <div class="alert alert-warning">
          Es sind aktuell keine zu genehmigten Listen vorhanden.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import List from '@/components/List'

export default {
  name: 'CheckedListings',
  components: {
    'app-list': List
  },
  computed: {
    listings () {
      return this.$store.getters.getChecked
    }
  },
  created () {
    this.$store.dispatch('fetchChecked')
  }
}
</script>

<style scoped>

</style>
