<template>
  <div class="controls">
    <div>
      <button class="button__red" @click="getNewDeck">
        New deck
      </button>
      <span test-id="remaining" class="small"> Remaining cards in deck: {{ remainingCards }} </span>
    </div>
    <div>
      <button class="button__red" @click="newHand">
        New hand
      </button>
      <button @click="hitMe('player')" :disabled="!gamePlaying">
        Hit me!
      </button>
      <button @click="dealerPlay" :disabled="!gamePlaying">
        Stay
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Controls',
  props: ['gamePlaying', 'remainingCards'],
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
  padding: 0.5rem 2rem;
}

button {
  background: $blue-button;
  border-radius: 5px;
  border: none;
  color: $white;
  cursor: pointer;
  font-family: $font-primary;
  font-size: 0.8rem;
  margin: 0.5rem;
  min-width: 5rem;
  padding: 0.75rem;

  &:disabled {
    background: lighten($blue-button, 15%);
    cursor: not-allowed;
  }

  &.button__red {
    background: $red-button;
  }
}

.small {
  font-size: 0.8rem;
  margin-left: 1rem;
}
</style>
