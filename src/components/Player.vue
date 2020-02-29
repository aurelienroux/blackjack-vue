<template>
  <div class="player">
    <p>Player: {{ playerScore }}</p>
    <div class="display">
      <div v-for="(card, index) in playerCards" :key="index">
        <img :src="card.image" alt="player card" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Player',
  props: ['playerScore', 'playerCards']
}
</script>

<style lang="scss">
.player {
  margin-bottom: 1rem;
  padding: 0 2rem;

  p {
    margin: 0.5rem 0 0.25rem;
  }
}

.display {
  display: flex;
  flex-wrap: wrap;
  min-height: 6.5rem;

  @include for-tablet-portrait-up {
    min-height: 8.5rem;
  }
}
</style>
