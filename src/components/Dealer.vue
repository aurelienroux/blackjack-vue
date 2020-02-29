<template>
  <div class="dealer">
    <p v-if="gamePlaying">Dealer: ?</p>
    <p v-else>Dealer: {{ dealerScore }}</p>
    <div class="display">
      <div v-for="(card, index) in dealerCards" :key="index">
        <img v-if="index === 0 && gamePlaying" src="@/assets/card.png" alt="" />
        <img v-else-if="index === 0 && !gamePlaying" :src="card.image" alt="" />
        <img v-else :src="card.image" alt="dealer card" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dealer',
  props: ['gamePlaying', 'dealerScore', 'dealerCards']
}
</script>

<style lang="scss">
.dealer {
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
