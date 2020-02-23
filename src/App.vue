<template>
  <div id="app">
    <p v-if="!dealerPlayState">score: ?</p>
    <p v-else>score: {{ dealerScore }}</p>
    <div class="dealer-section">
      <div v-for="(card, index) in dealerCards" :key="index">
        <img v-if="index === 0 && !dealerPlayState" src="@/assets/card.png" alt="" />
        <img v-else-if="index === 0 && dealerPlayState" :src="card.image" alt="" />
        <img v-else :src="card.image" alt="dealer card" />
      </div>
    </div>

    <p>score: {{ playerScore }}</p>

    <button @click="newHand">New hand</button>
    <button @click="hitMe('player')" :disabled="!gamePlaying">Hit me</button>
    <button @click="dealerPlay" :disabled="!gamePlaying">I stay</button>
    <p>game playing {{ gamePlaying }}</p>
    {{ feedback }}

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
      playerCards: [],
      playerScore: 0,
      dealerCards: [],
      dealerScore: 0,
      gamePlaying: true,
      dealerPlayState: false,
      feedback: 'playing'
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
        this.playerCards = []
        this.dealerCards = []
        this.playerScore = 0
        this.dealerScore = 0
        this.gamePlaying = true
        this.dealerPlayState = false

        this.playerCards.push(res.data.cards[0], res.data.cards[2])
        this.dealerCards.push(res.data.cards[1], res.data.cards[3])

        this.playerScore = this.computeScore(this.playerCards, this.playerScore)
        this.dealerScore = this.computeScore(this.dealerCards, this.dealerScore)
      })
    },
    hitMe(person) {
      axios
        .get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`)
        .then(res => {
          const [card] = res.data.cards

          if (person === 'player') {
            this.playerCards.push(card)
            this.playerScore = this.computeScore(this.playerCards, this.playerScore)

            if (this.playerScore > 21) {
              this.gamePlaying = false
              this.feedback = 'You lost'
            }
          }

          if (person === 'dealer') {
            this.dealerCards.push(card)
            this.dealerScore = this.computeScore(this.dealerCards, this.dealerScore)

            this.dealerPlay()
          }
        })
        .catch(error => console.log(error))
    },
    dealerPlay() {
      this.dealerPlayState = true

      if (this.dealerScore < 17) {
        setTimeout(() => {
          this.hitMe('dealer')
        }, 1000)
      }
    }
  },
  created() {
    axios
      .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => {
        this.deckId = res.data.deck_id
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
  min-height: 10rem;
}

img {
  margin-left: 0.5rem;
  max-height: 9rem;
}
</style>
