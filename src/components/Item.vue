<template>
    <div class="item">
      <div class="row">
        <div class="col-9 description">{{ item.description }}</div>
        <div class="col-3 actionbar">
          <router-link :to="{
            name: 'editItem',
            params: {
              id: item.id
            }
          }"><fa-icon icon="edit"></fa-icon></router-link>
          <a @click.prevent="deleteItem" class="text-danger"><fa-icon icon="trash"></fa-icon></a>
        </div>
      </div>
      <div class="row m-0" :class="{
          red: daysLeft <= 1,
          yellow: daysLeft > 1 && daysLeft <= 3,
          green: daysLeft > 3
        }">
        <div class="col deadline">
          <small>Erledigen bis: {{ deadline | dateFormat }}</small>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Item',
  computed: {
    deadline () {
      return new Date(this.item.deadline)
    },
    daysLeft () {
      const today = new Date()
      // The number of milliseconds in one day
      const ONE_DAY = 1000 * 60 * 60 * 24
      // Calculate the difference in milliseconds
      const differenceMs = this.deadline - today

      // Convert back to days and return
      return Math.round(differenceMs / ONE_DAY)
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    deleteItem () {
      this.$store.dispatch('deleteItem', { id: this.item.id, index: this.index })
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  border-bottom: 2px solid #ececec;
  margin: 0.5rem 0;

  .row:first-child {
    margin-bottom: 0.75rem;
    padding-left: 0.75rem;
  }
  .row .deadline {
    line-height: 0.85rem;
    text-transform: uppercase;
  }
  .row .actionbar {
    color: #003765;
    >* {
      margin: 0 0.5rem;
      cursor: pointer;
    }
  }
}
.red {
  background-color: #ffdddd;
  color: #f81e1e;
}
.yellow {
  background-color: #feed9b;
  color: #c2a508;
}
.green {
  background-color: #d3fae3;
  color: #59ad7b
}
</style>
