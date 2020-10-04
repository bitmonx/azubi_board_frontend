<template>
  <nav class="navbar navbar-expand-lg">
    <a class="navbar-brand" href="https://mk.de">
      <img src="@/assets/img/mk_logo.png">
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto ml-5">
        <router-link to="/" tag="li" class="nav-item" active-class="active" exact>
          <a class="nav-link">Aufgaben</a>
        </router-link>
        <router-link to="/checked" tag="li" class="nav-item" active-class="active" exact v-if="checkedListings.length > 0">
          <a class="nav-link">Geprüfte Listen</a>
        </router-link>
      </ul>
      <div class="navbar-end">
        <router-link to="/" class="nav-link">
            <img src="@/assets/img/ab_logo.jpg">
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    checkedListings () {
      return this.$store.getters.getChecked
    }
  }
}
</script>

<style lang="scss" scoped>
ul.navbar-nav > li.nav-item {
  > a {
    font-size: 1.4rem;
    line-height: 120px;
    font-weight: 300;
    color: #777777;
    margin: auto;
    transition: color 0.3s ease-out;
  }
  :hover {
    color: #aaa;
  }
  &.active a {
    color: #103867;
  }
}
.navbar-brand img {
  width: 100px;
  height: auto;
}
.navbar-end img {
  height: 75px;
  width: auto;
}
</style>
