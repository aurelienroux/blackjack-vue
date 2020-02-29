<template>
  <div class="controls">
    <button @click="getNewDeck">New deck</button>
    <button @click="newHand">New hand</button>
    <button @click="hitMe('player')" :disabled="!gamePlaying">Hit me</button>
    <button @click="dealerPlay" :disabled="!gamePlaying">Stay</button>
  </div>
</template>

<script>
export default {
  name: 'Controls',
  props: ['gamePlaying'],
  methods: {
    getNewDeck() {
      this.$emit('getNewDeck')
    },
    newHand() {
      this.$emit('newHand')
    },
    hitMe(player) {
      this.$emit('hitMe', player)
    },
    dealerPlay() {
      this.$emit('dealerPlay')
    }
  }
}
</script>

<style lang="scss">
.controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0.5rem 2rem;

  @include for-tablet-portrait-up {
    justify-content: flex-start;
  }
}

button {
  background: $blue-button;
  border-radius: 5px;
  border: none;
  color: $white;
  cursor: pointer;
  font-family: $font-primary;
  font-size: 0.8rem;
  margin: 0.5rem 0.8rem;
  min-width: 5rem;
  padding: 0.75rem;

  &:disabled {
    background: lighten($blue-button, 15%);
    cursor: not-allowed;
  }
}
</style>
