import { shallowMount } from '@vue/test-utils'
import Player from '@/components/Player.vue'

function createLocalWrapper(playerScore = 0, playerCards = []) {
  return shallowMount(Player, {
    propsData: {
      playerScore,
      playerCards
    }
  })
}

const playerCards = [
  {
    code: '5C',
    image: 'https://deckofcardsapi.com/static/img/5C.png',
    images: {
      svg: 'https://deckofcardsapi.com/static/img/5C.svg',
      png: 'https://deckofcardsapi.com/static/img/5C.png'
    },
    value: '5',
    suit: 'CLUBS'
  },
  {
    code: '3S',
    image: 'https://deckofcardsapi.com/static/img/3S.png',
    images: {
      svg: 'https://deckofcardsapi.com/static/img/3S.svg',
      png: 'https://deckofcardsapi.com/static/img/3S.png'
    },
    value: '3',
    suit: 'SPADES'
  }
]

describe('Player component', () => {
  describe('default state', () => {
    it('renders', () => {
      const wrapper = createLocalWrapper()
      expect(wrapper).toMatchSnapshot()
      expect(wrapper.find('p').text()).toMatch('Player: 0')
    })
  })

  describe('playing', () => {
    it('renders', () => {
      const wrapper = createLocalWrapper(10, playerCards)
      expect(wrapper).toMatchSnapshot()
      expect(wrapper.find('p').text()).toMatch('Player: 10')
      expect(wrapper.findAll('img').length).toBe(2)
      expect(
        wrapper
          .findAll('img')
          .at(0)
          .attributes('src')
      ).toBe('https://deckofcardsapi.com/static/img/5C.png')
      expect(
        wrapper
          .findAll('img')
          .at(1)
          .attributes('src')
      ).toBe('https://deckofcardsapi.com/static/img/3S.png')
    })
  })
})
