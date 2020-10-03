<template>
  <div class="list">
    <h1 class="text-center font-weight-bold text-danger">Einkaufsliste & TO DO's</h1>
    <transition-group name="items" type="animation">
      <app-item
        v-for="(item, index) in list.items"
        :index="index"
        :key="item.id"
        :item="item"></app-item>
    </transition-group>
    <div class="buttons">
      <button
        v-if="user.department === 'Softwareentwicklung' && list.items.length > 0"
        type="button"
        class="btn btn-primary btn-block"
        :disabled="list.checked_by !== null"
        @click="checkList"
      >Liste freigeben</button>
      <button
        v-if="user.isTrainee  && list.items.length > 0"
        type="button"
        class="btn btn-success btn-block"
        :disabled="list.checked_by === null"
        @click="finishList"
      >Liste abschließen</button>
    </div>
  </div>
</template>

<script>
import Item from '@/components/Item'

export default {
  name: 'List',
  computed: {
    list () {
      return this.$store.getters.getCurrent
    },
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    checkList () {
      this.$store.dispatch('checkList', {
        listId: this.list.id,
        user: this.user
      })
    },
    finishList () {
      this.$store.dispatch('finishList', {
        listId: this.list.id,
        user: this.user
      })
      this.$store.dispatch('fetchCurrent')
    }
  },
  components: {
    'app-item': Item
  }
}
</script>

<style lang="scss" scoped>
.list {
  border: 4px solid #ececec;
  padding: 1.5rem;
  h1 {
    text-transform: uppercase;
    margin-bottom: 3rem;
  }
  .buttons {
    margin: 2rem 0;
    transition: transform 1s;
  }
}
.items-enter {
  opacity: 0;
}
.items-enter-active {
  animation: slide-in 0.5s ease-out forwards;
  transition: opacity 0.5s ;
}
.items-leave {
}
.items-leave-active {
  animation: slide-out 0.5s ease-out forwards;
  transition: opacity 1s;
  opacity: 0;
  position: absolute;
}
.items-move {
  transition: transform 0.5s;
}

@keyframes slide-in {
  from {
    transform: translateX(20px);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes slide-out {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(20px);
  }
}
</style>
