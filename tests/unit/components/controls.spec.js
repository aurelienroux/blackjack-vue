import { shallowMount } from '@vue/test-utils'
import Controls from '@/components/Controls.vue'

function createLocalWrapper(gamePlaying) {
  return shallowMount(Controls, {
    propsData: {
      gamePlaying: gamePlaying,
      remainingCards: 100
    }
  })
}

describe('Controls component', () => {
  describe('with game on', () => {
    const wrapper = createLocalWrapper(true)
    it('renders', () => {
      expect(wrapper).toMatchSnapshot()
      expect(wrapper.findAll('button').length).toBe(4)
      expect(wrapper.find('[test-id="remaining"]').text()).toMatch('Remaining cards in deck: 100')
    })
  })

  describe('with game off', () => {
    const wrapper = createLocalWrapper(false)
    it('renders', () => {
      expect(wrapper).toMatchSnapshot()
      expect(
        wrapper
          .findAll('button')
          .at(2)
          .attributes('disabled')
      ).toBe('disabled')
      expect(
        wrapper
          .findAll('button')
          .at(3)
          .attributes('disabled')
      ).toBe('disabled')
    })
  })
})
