import { shallowMount } from '@vue/test-utils'
import Dealer from '@/components/Dealer.vue'

function createLocalWrapper(gamePlaying = false, dealerScore = 0, dealerCards = []) {
  return shallowMount(Dealer, {
    propsData: {
      gamePlaying,
      dealerScore,
      dealerCards
    }
  })
}

const dealerCards = [
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

describe('Dealer component', () => {
  describe('default state', () => {
    it('renders', () => {
      const wrapper = createLocalWrapper()
      expect(wrapper).toMatchSnapshot()
      expect(wrapper.find('.dealer').exists()).toBe(true)
      expect(wrapper.find('p').text()).toMatch('Dealer: 0')
    })
  })

  describe('game on', () => {
    it('renders', () => {
      const wrapper = createLocalWrapper(true, 8, dealerCards)
      expect(wrapper).toMatchSnapshot()
      expect(wrapper.find('p').text()).toMatch('Dealer: ?')
      expect(wrapper.findAll('img').length).toBe(2)
      expect(
        wrapper
          .findAll('img')
          .at(0)
          .attributes('src')
      ).toBe('@/assets/card.png')
      expect(
        wrapper
          .findAll('img')
          .at(1)
          .attributes('src')
      ).toBe('https://deckofcardsapi.com/static/img/3S.png')
    })
  })

  describe('game over', () => {
    it('renders', () => {
      const wrapper = createLocalWrapper(false, 20, dealerCards)
      expect(wrapper).toMatchSnapshot()
      expect(wrapper.find('p').text()).toMatch('Dealer: 20')
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
