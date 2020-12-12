import { shallowMount } from '@vue/test-utils'
import Feedback from '@/components/Feedback.vue'

function createLocalWrapper(loading = false, gamePlaying = false, feedback = '') {
  return shallowMount(Feedback, {
    propsData: {
      loading,
      gamePlaying,
      feedback
    }
  })
}

describe('Feedback component', () => {
  describe('default state', () => {
    it('renders', () => {
      const wrapper = createLocalWrapper()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('loading', () => {
    it('renders', () => {
      const wrapper = createLocalWrapper(true)
      expect(wrapper).toMatchSnapshot()
      expect(
        wrapper
          .findAll('p')
          .at(0)
          .text()
      ).toMatch('Loading...')
    })
  })

  describe('game over', () => {
    it('renders', () => {
      const feedbackText = 'feedback text'
      const wrapper = createLocalWrapper(false, false, feedbackText)
      expect(wrapper).toMatchSnapshot()
      expect(wrapper.find('p').text()).toMatch(feedbackText)
    })
  })
})
