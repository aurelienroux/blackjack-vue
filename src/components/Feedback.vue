<template>
  <div class="feedback">
    <p v-if="loading">Loading...</p>
    <p v-if="!gamePlaying">{{ feedback }}</p>
  </div>
</template>

<script>
export default {
  name: 'Feedback',
  props: ['loading', 'gamePlaying', 'feedback']
}
</script>

<style lang="scss">
.feedback {
  align-items: center;
  display: flex;
  flex: 1;
  font-size: 1.25rem;
  justify-content: center;
  min-height: 4.5rem;
}
</style>
