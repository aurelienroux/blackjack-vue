import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App component', () => {
  it('renders App component', () => {
    const wrapper = shallowMount(App)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('h1').exists()).toBe(true)
    expect(wrapper.find('h1').text()).toMatch('BlackJack')
    expect(wrapper.find('dealer-stub').exists()).toBe(true)
    expect(wrapper.find('player-stub').exists()).toBe(true)
    expect(wrapper.find('feedback-stub').exists()).toBe(true)
    expect(wrapper.find('controls-stub').exists()).toBe(true)
  })
})
