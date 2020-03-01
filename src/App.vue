<template>
  <div id="app">
    <h1 class="title">BlackJack</h1>
    <Dealer :gamePlaying="gamePlaying" :dealerScore="dealerScore" :dealerCards="dealerCards" />
    <Player :playerScore="playerScore" :playerCards="playerCards" />
    <Feedback
      :feedback="feedback"
      :gamePlaying="gamePlaying"
      :loading="loading"
      :remainingCards="remainingCards"
    />
    <Controls
      :gamePlaying="gamePlaying"
      :remainingCards="remainingCards"
      @dealerPlay="dealerPlay"
      @getNewDeck="getNewDeck"
      @hitMe="hitMe"
      @newHand="newHand"
    />
  </div>
</template>

<script>
import axios from 'axios'
import Controls from '@/components/Controls.vue'
import Dealer from '@/components/Dealer.vue'
import Feedback from '@/components/Feedback.vue'
import Player from '@/components/Player.vue'

export default {
  name: 'App',
  data() {
    return {
      dealerCards: [],
      dealerScore: 0,
      deckId: '',
      feedback: '',
      gamePlaying: true,
      loading: false,
      playerCards: [],
      playerScore: 0,
      remainingCards: 0
    }
  },
  components: {
    Controls,
    Dealer,
    Feedback,
    Player
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
    resetGame() {
      this.playerCards = []
      this.dealerCards = []
      this.playerScore = 0
      this.dealerScore = 0
      this.gamePlaying = true
      this.dealerPlayState = false
      this.feedback = ''
    },
    newHand() {
      this.loading = true
      this.feedback = ''

      axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=4`).then(res => {
        this.loading = false
        this.remainingCards = this.remainingCards - 4
        this.resetGame()

        this.playerCards.push(res.data.cards[0], res.data.cards[2])
        this.dealerCards.push(res.data.cards[1], res.data.cards[3])

        this.playerScore = this.computeScore(this.playerCards, this.playerScore)
        this.dealerScore = this.computeScore(this.dealerCards, this.dealerScore)
      })
    },
    hitMe(person) {
      this.loading = true
      this.remainingCards = this.remainingCards - 1

      axios
        .get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`)
        .then(res => {
          this.loading = false
          const [card] = res.data.cards

          if (person === 'player') {
            this.playerCards.push(card)
            this.playerScore = this.computeScore(this.playerCards, this.playerScore)

            if (this.playerScore > 21) {
              this.gamePlaying = false
              this.feedback = 'Busted. You lost'
            }
          }

          if (person === 'dealer') {
            this.dealerCards.push(card)
            this.dealerScore = this.computeScore(this.dealerCards, this.dealerScore)

            this.dealerPlay()
          }
        })
        .catch(error => console.error(error)) // eslint-disable-line no-console
    },
    dealerPlay() {
      this.gamePlaying = false

      if (this.dealerScore < 17) {
        setTimeout(() => {
          this.hitMe('dealer')
        }, 1000)
      } else if (this.dealerScore > 21) {
        this.feedback = 'Dealer busted. You won!'
      } else if (this.dealerScore > this.playerScore) {
        this.feedback = 'You lost!'
      } else if (this.dealerScore === this.playerScore) {
        this.feedback = 'Tie round'
      } else if (this.playerScore === 21) {
        this.feedback = 'BlackJack! you won!'
      } else {
        this.feedback = 'You won!'
      }
    },
    getNewDeck() {
      this.resetGame()
      this.loading = true

      axios
        .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
        .then(res => {
          this.loading = false
          this.remainingCards = res.data.remaining
          this.deckId = res.data.deck_id
        })
        .catch(error => console.error(error)) // eslint-disable-line no-console
    }
  },
  created() {
    axios
      .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
      .then(res => {
        this.remainingCards = res.data.remaining
        this.deckId = res.data.deck_id
      })
      .catch(error => console.error(error)) // eslint-disable-line no-console
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Playfair+Display:400,500,900&display=swap');

html {
  box-sizing: border-box;
  height: 100vh;
}

body {
  background: $background;
  box-sizing: border-box;
  height: 100vh;
  margin: 0;

  @include for-tablet-portrait-up {
    padding: 2rem;
  }
}

#app {
  background: linear-gradient(190deg, lighten($green, 5%) 0%, darken($green, 5%) 100%);
  color: $white;
  flex-direction: column;
  flex: auto;
  font-family: $font-primary;
  font-size: 1rem;
  min-height: 100vh;

  @include for-tablet-portrait-up {
    border-radius: 10px;
    margin: 0 auto;
    max-width: 40rem;
    min-height: 0;
    padding: 2rem 2rem 4rem;
  }
}

.title {
  color: $green-title;
  font-size: 2.5rem;
  margin: 0;
  padding: 0.5rem 0;
  text-align: center;

  @include for-tablet-portrait-up {
    margin-bottom: 2rem;
  }
}

img {
  margin-left: 0.25rem;
  max-height: 6rem;

  @include for-tablet-portrait-up {
    max-height: 8rem;
  }
}
</style>
