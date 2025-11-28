import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import UserTable from '../ui/UserTable.vue'

describe('UserTable Entity', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders user entities table', () => {
    const wrapper = mount(UserTable)
    
    expect(wrapper.find('v-data-table').exists()).toBe(true)
    expect(wrapper.find('v-text-field').exists()).toBe(true)
  })

  it('filters entities by search', async () => {
    const wrapper = mount(UserTable)
    
    await wrapper.find('input[type="text"]').setValue('Иванов')
    
    expect(wrapper.vm.filteredUsers.length).toBeGreaterThan(0)
    expect(wrapper.vm.filteredUsers[0].fullName).toContain('Иванов')
  })
})