<template>
  <div class="edit-item">
    <fa-icon icon="arrow-left" class="back-btn" @click="$router.push('/')"></fa-icon>
    <h1 class="text-center font-weight-bold text-danger">... Item bearbeiten</h1>
    <form @submit.prevent="editItem">
      <textarea
        class="form-control"
        placeholder="Was zu erledigen ist..."
        v-model="description"/>
      <datepicker
        :language="de"
        input-class="form-control bg-white datepicker-input"
        placeholder="Zu erledigen bis"
        v-model="deadline">
      </datepicker>
      <button
        type="submit"
        class="btn btn-primary btn-block"
        :disabled="!submitEnabled"
      >Änderungen speichern</button>
    </form>
  </div>
</template>

<script>
import { de } from 'vuejs-datepicker/dist/locale'

export default {
  name: 'EditItem',
  data () {
    return {
      de,
      description: '',
      deadline: null
    }
  },
  computed: {
    submitEnabled () {
      return this.description.length > 0
    }
  },
  methods: {
    editItem () {
      const data = {
        description: this.description,
        deadline: this.deadline,
        itemId: this.$route.params.id
      }
      this.$store.dispatch('editItem', data)
      if (this.isUrgent(data.deadline)) {
        this.$store.dispatch('triggerAlert', 'approving')
      }
    },
    isUrgent (date) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      return date <= tomorrow
    }
  },
  created () {
    this.description = this.$store.getters.getItemById(this.$route.params.id).description
    this.deadline = this.$store.getters.getItemById(this.$route.params.id).deadline
  }
}
</script>

<style lang="scss" scoped>
.edit-item {
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
  .back-btn {
    cursor: pointer;
    font-size: 1.5rem;
    position: absolute;
    color: #706f6f;
    transition: color 0.3s ease-out;
    &:hover {
      color: #003765;
    }
  }
}
</style>
