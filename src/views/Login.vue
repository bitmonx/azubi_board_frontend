<template>
    <div class="login-wrapper">
      <div class="login">
        <div class="logo">
        </div>
        <div class="form-input">
          <h1>Login</h1>
          <div class="alert alert-danger" v-if="loginError">
            Benutzername oder Passwort sind nicht korrekt.
          </div>
          <form v-on:submit.prevent="login">
            <input
              type="text"
              class="form-control"
              name="username"
              v-model="username"
              placeholder="Benutzername"
            >
            <input
              type="password"
              class="form-control"
              name="password"
              v-model="password"
              placeholder="Passwort"
            >
            <button
              type="submit"
              class="btn btn-outline-custom-white"
              :disabled="!loginEnabled"
            >Login</button>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    loginEnabled () {
      return (this.password.length > 0 && this.username.length > 0)
    },
    loginError () {
      return this.$store.getters.getLoginError
    }
  },
  methods: {
    login () {
      const formData = new FormData()
      formData.append('username', this.username)
      formData.append('password', this.password)
      this.$store.dispatch('login', formData)
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .login {
    background-color: white;
    width: 600px;
    height: 350px;
    display: flex;
    flex-direction: row;
    -webkit-box-shadow: 13px 13px 16px -2px rgba(133,133,133,0.48);
    -moz-box-shadow: 13px 13px 16px -2px rgba(133,133,133,0.48);
    box-shadow: 13px 13px 16px -2px rgba(133,133,133,0.48);
    * {
      width: 100%;
    }
    .form-input {
      padding: 25px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      background-color: #003865;
      color: white;
      form * {
        margin: 0.8rem 0;
      }
    }
    .logo {
      background-image: url("../assets/img/ab_login.jpg");
    }
  }
}
</style>
