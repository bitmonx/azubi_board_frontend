<template>
    <div class="trigger" @click="triggerAlert">
      <div class="button btn" :class="{'btn-danger': !triggered, 'btn-success': triggered}">
        <div class="icon">
          <fa-icon :icon="icon" :class="{spin: isLoading}"></fa-icon>
        </div>
        <div class="text">
          {{ trigger.text }}
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'AlertTrigger',
  data () {
    return {
      icon: '',
      triggered: false,
      isLoading: false
    }
  },
  props: {
    trigger: {
      type: Object,
      required: true
    }
  },
  methods: {
    triggerAlert () {
      this.icon = 'spinner'
      this.isLoading = true
      this.$store.dispatch('triggerAlert', this.trigger.alert)
        .then((res) => {
          if (res && res.status === 204) {
            this.icon = this.trigger.icon
            this.triggered = true
            this.isLoading = false
            setTimeout(() => {
              this.triggered = false
            }, 3000)
          }
        })
    }
  },
  created () {
    this.icon = this.trigger.icon
  }
}
</script>

<style lang="scss" scoped>
.trigger {
  display: flex;
  flex-direction: row;
  min-width: 63px;
  .button {
    display: flex;
    flex-direction: row;
    font-size: 1.3rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    min-width: 63px;
    .icon {
      margin: 0 0.5rem;
    }
  }
  transition: all 1s ease-out;
  .text {
    max-width: 0;
    -webkit-transition: max-width 1s;
    transition: max-width 1s;
    display: inline-block;
    vertical-align: top;
    white-space: nowrap;
    overflow: hidden;
  }
  &:hover .text{
    max-width: 12rem;
  }
}

.spin {
  animation-name: spin;
  animation-duration: 1500ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
