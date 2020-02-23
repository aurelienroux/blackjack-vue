<template>
  <div id="app">
    <p>score {{ dealerScore }}</p>
    <div class="dealer-section">
      <div v-for="(card, index) in dealerCards" :key="index">
        <img v-if="index === 0 && !dealerPlay" src="@/assets/card.png" alt="" />
        <img v-else-if="index === 0 && dealerPlay" :src="card.image" alt="" />
        <img v-else :src="card.image" alt="dealer card" />
      </div>
    </div>

    <button @click="newHand">New hand</button>
    <button @click="hitMe" :disabled="!gamePlaying">Hit me</button>
    <button @click="stay" :disabled="!gamePlaying">I stay</button>
    <p>game playing {{ gamePlaying }}</p>

    <p>score {{ playerScore }}</p>
    <div class="player-section">
      <div v-for="(card, index) in playerCards" :key="index">
        <img :src="card.image" alt="player card" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      deckId: '',
      gamePlaying: true,
      playerCards: [],
      playerScore: 0,
      dealerCards: [],
      dealerScore: 0,
      dealerPlay: false
    }
  },
  methods: {
    computeScore(cards, score) {
      let hasAce = false

      score = cards.reduce((acc, card) => {
        if (card.value === 'ACE') {
          hasAce = true
          return acc + 1
        }
        if (isNaN(card.value)) {
          return acc + 10
        }
        return acc + Number(card.value)
      }, 0)

      if (hasAce) {
        score = score + 10 > 21 ? score : score + 10
      }

      return score
    },
    newHand() {
      axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=4`).then(res => {
        this.gamePlaying = true
        this.playerCards = []
        this.dealerCards = []
        this.playerScore = 0
        this.dealerScore = 0

        this.playerCards.push(res.data.cards[0], res.data.cards[2])
        this.dealerCards.push(res.data.cards[1], res.data.cards[3])

        this.playerScore = this.computeScore(this.playerCards, this.playerScore)
        this.dealerScore = this.computeScore(this.dealerCards, this.dealerScore)
      })
    },
    hitMe() {
      axios
        .get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`)
        .then(response => {
          const [card] = response.data.cards

          this.playerCards.push(card)
          this.playerScore = this.computeScore(this.playerCards, this.playerScore)

          if (this.playerScore > 21) {
            this.gamePlaying = false
          }
        })
        .catch(error => console.log(error))
    },
    stay() {
      this.dealerPlay = true
    }
  },
  created() {
    axios
      .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2')
      .then(response => {
        this.deckId = response.data.deck_id
      })
      .catch(error => console.log(error))
  }
}
</script>

<style lang="scss">
.dealer-section,
.player-section {
  border: 1px solid;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
}

img {
  margin: 0.25rem;
  max-height: 120px;
}
</style>
