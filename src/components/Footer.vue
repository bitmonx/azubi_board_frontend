<template>
  <footer class="footer">
    <fa-icon icon="user"></fa-icon>
    <span>Wer ist angemeldet?</span> {{ user.firstname }}
    <a @click="logout" class="text-danger float-right">Logout</a>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  border-bottom: 1px solid #c7c7c6;
  padding: 1rem 1rem;
  color: #003765;
  svg {
    margin-right: 0.5rem;
  }
  span {
    color: #706f6f;
  }
  a {
    cursor: pointer;
    &:hover {
      text-decoration: none;
    }
  }
}
</style>
