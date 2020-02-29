<template>
  <div class="controls">
    <div class="controls__row">
      <button @click="getNewDeck">New deck</button>
    </div>
    <div class="controls__row">
      <button @click="newHand">New hand</button>
      <button @click="hitMe('player')" :disabled="!gamePlaying">Hit me</button>
      <button @click="dealerPlay" :disabled="!gamePlaying">Stay</button>
    </div>
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
  justify-content: space-evenly;
  padding: 0.5rem 2rem;

  &__row {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}

button {
  background: #292ba3;
  border-radius: 5px;
  border: none;
  color: #eee;
  cursor: pointer;
  font-family: 'Playfair Display', serif;
  margin: 0.5rem;
  min-width: 5rem;
  padding: 0.75rem;

  &:disabled {
    background: lighten(#292ba3, 15%);
    cursor: not-allowed;
  }
}
</style>
