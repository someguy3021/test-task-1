import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import UserList from '../index.vue'

describe('UserList', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders user list page', () => {
    const wrapper = mount(UserList)
    
    expect(wrapper.text()).toContain('Список пользователей')
    expect(wrapper.find('v-btn').exists()).toBe(true)
  })
})