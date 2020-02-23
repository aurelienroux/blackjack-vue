<template>
  <div id="app">
    <p>score {{ dealerScore }}</p>
    <div class="dealer-section">
      <div v-for="(card, index) in dealerCards" :key="index">
        <img :src="card.image" alt="" />
      </div>
    </div>

    <button @click="newHand">New hand</button>
    <button @click="hitMe">Hit me</button>

    <p>score {{ playerScore }}</p>
    <div class="player-section">
      <div v-for="(card, index) in playerCards" :key="index">
        <img :src="card.image" alt="" />
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
      dealerScore: 0
    }
  },
  methods: {
    newHand() {
      axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=4`).then(response => {
        this.playerCards = []
        this.playerScore = 0
        this.dealerCards = []
        this.dealerScore = 0

        const cards = response.data.cards

        cards.forEach((card, index) => {
          if (index % 2 === 0) {
            this.dealerCards.push(card)

            if (card.value === 'ACE') {
              this.dealerScore += 11
            } else if (card.value === 'JACK' || card.value === 'QUEEN' || card.value === 'KING') {
              this.dealerScore += 10
            } else {
              this.dealerScore += Number(card.value)
            }
          } else {
            this.playerCards.push(card)

            if (card.value === 'ACE') {
              this.playerScore += 11
            } else if (card.value === 'JACK' || card.value === 'QUEEN' || card.value === 'KING') {
              this.playerScore += 10
            } else {
              this.playerScore += Number(card.value)
            }
          }
        })
      })
    },
    hitMe() {
      axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`).then(response => {
        const [card] = response.data.cards
        this.playerCards.push(card)

        if (card.value === 'ACE') {
          this.playerScore += 11
        } else if (card.value === 'JACK' || card.value === 'QUEEN' || card.value === 'KING') {
          this.playerScore += 10
        } else {
          this.playerScore += Number(card.value)
        }
      })
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
