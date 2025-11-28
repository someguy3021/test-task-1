import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import UserTable from '../ui/UserTable.vue'

describe('UserTable', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders table with users', () => {
    const wrapper = mount(UserTable)
    
    expect(wrapper.find('v-data-table').exists()).toBe(true)
    expect(wrapper.find('v-text-field').exists()).toBe(true)
  })

  it('shows user data in table', async () => {
    const wrapper = mount(UserTable)
    
    await wrapper.vm.$nextTick()
    
    // Проверяем, что таблица содержит данные пользователей
    expect(wrapper.text()).toContain('Иванов')
    expect(wrapper.text()).toContain('Петрова')
    expect(wrapper.text()).toContain('Сидоров')
  })
})