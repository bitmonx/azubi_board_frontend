<template>
  <div class="add-item">
    <h1 class="text-center font-weight-bold text-danger">... auf die Liste setzen</h1>
    <form @submit.prevent="addItem">
      <textarea
        class="form-control"
        placeholder="Was zu erledigen ist..."
        v-model="description"
      />
      <datepicker
        :language="de"
        input-class="form-control bg-white"
        calendar-class="calendar"
        placeholder="Zu erledigen bis: "
        v-model="deadline"
      ></datepicker>
      <button
        type="submit"
        class="btn btn-primary btn-block"
        :disabled="!submitEnabled"
      >Zur Liste hinzufügen</button>
    </form>
  </div>
</template>

<script>
import { de } from 'vuejs-datepicker/dist/locale'

export default {
  name: 'AddItem',
  data () {
    return {
      de,
      deadline: null,
      description: ''
    }
  },
  computed: {
    submitEnabled () {
      return (this.description.length > 0 && this.deadline !== null)
    },
    listing () {
      return this.$store.getters.getCurrent
    }
  },
  methods: {
    addItem () {
      const formData = new FormData()
      formData.append('description', this.description)
      formData.append('deadline', this.deadline.toISOString())
      formData.append('listing_id', this.listing.id)
      this.$store.dispatch('addItem', formData)
      if (this.isUrgent(this.deadline)) {
        this.$store.dispatch('triggerAlert', 'approving')
      }
      this.deadline = null
      this.description = ''
    },
    isUrgent (date) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      return date <= tomorrow
    }
  }
}
</script>

<style lang="scss" scoped>
.add-item {
  border: 4px solid #ececec;
  background-color: #ececec;
  padding: 1.5rem;
  h1 {
    text-transform: uppercase;
    margin-bottom: 3rem;
  }
  form >* {
    margin: 1rem 0;
  }
}
</style>
