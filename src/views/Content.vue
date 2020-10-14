<template>
  <div class="content">
    <div class="triggerBar">
      <app-alert-trigger
        v-for="trigger in triggers"
        :key="trigger.icon"
        :trigger="trigger"
      ></app-alert-trigger>
    </div>
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
import AlertTrigger from '@/components/AlertTrigger'

export default {
  name: 'Content',
  data () {
    return {
      triggers: [
        {
          icon: 'utensils',
          text: 'Küchen-Alarm',
          alert: 'kitchen'
        },
        {
          icon: 'wine-bottle',
          text: 'Kühlschrank-Alarm',
          alert: 'drinks'
        }
      ]
    }
  },
  components: {
    'app-header': Header,
    'app-footer': Footer,
    'app-alert-trigger': AlertTrigger
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  .triggerBar {
    position: absolute;
    top: 200px;
    left: 0;
    display: flex;
    flex-direction: column;
    >* {
      margin: 10px 0;
    }
  }
}
</style>
