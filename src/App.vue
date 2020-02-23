<template>
  <div id="app">
    <h1 class="title">BlackJack</h1>
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

    <div class="player">
      <p>Player: {{ playerScore }}</p>
      <div class="display">
        <div v-for="(card, index) in playerCards" :key="index">
          <img :src="card.image" alt="player card" />
        </div>
      </div>
    </div>

    <div class="feedback">
      <p v-if="!gamePlaying">{{ feedback }}</p>
    </div>

    <div class="controls">
      <button @click="newHand">New hand</button>
      <button @click="hitMe('player')" :disabled="!gamePlaying">Hit me</button>
      <button @click="dealerPlay" :disabled="!gamePlaying">I stay</button>
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
      feedback: ''
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
        this.feedback = ''

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
              this.feedback = 'You busted'
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
      this.gamePlaying = false

      if (this.dealerScore < 17) {
        setTimeout(() => {
          this.hitMe('dealer')
        }, 1000)
      } else if (this.dealerScore > 21) {
        this.feedback = 'dealer bust. you won'
      } else if (this.dealerScore > this.playerScore) {
        this.feedback = 'you lost!'
      } else if (this.dealerScore === this.playerScore) {
        this.feedback = 'tie round'
      } else if (this.playerScore === 21) {
        this.feedback = 'BlackJack! you won!'
      } else {
        this.feedback = 'You won!'
      }
    }
  },
  created() {
    axios
      .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
      .then(res => {
        this.deckId = res.data.deck_id
      })
      .catch(error => console.log(error))
  }
}
</script>

<style lang="scss">
html {
  height: 100vh;
}

body {
  background: #333;
  box-sizing: border-box;
  height: 100vh;
  margin: 0;
}

#app {
  background: linear-gradient(190deg, lighten(green, 5%) 0%, darken(green, 10%) 100%);
  flex-direction: column;
  flex: auto;
  height: 100vh;
}

.title {
  margin: 0;
  text-align: center;
}

.dealer,
.player {
  min-height: 10rem;
  padding: 0 2rem;
}

.display {
  display: flex;
  flex-wrap: wrap;
}

.feedback {
  align-items: center;
  background: blue;
  display: flex;
  flex: 1;
  justify-content: center;
}

.controls {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

img {
  margin-left: 0.25rem;
  max-height: 6rem;
}

button {
  border-radius: 5px;
  border: 1px solid black;
  cursor: pointer;
  margin: 0 0.5rem;
  min-width: 5rem;
  padding: 1rem;
}
</style>
