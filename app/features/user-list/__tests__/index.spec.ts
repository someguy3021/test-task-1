import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import UserList from '../index.vue'

describe('UserList Feature', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders user list feature', async () => {
    const wrapper = await mountSuspended(UserList)
    
    expect(wrapper.text()).toContain('Список пользователей')
    expect(wrapper.find('v-btn').exists()).toBe(true)
  })

  it('navigates to create page', async () => {
    const wrapper = await mountSuspended(UserList)
    const createButton = wrapper.find('v-btn')
    
    expect(createButton.attributes('to')).toBe('/create')
  })
})