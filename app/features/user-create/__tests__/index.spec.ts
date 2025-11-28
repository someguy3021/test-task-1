import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import UserCreate from '../index.vue'

describe('UserCreate Feature', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders user creation feature', async () => {
    const wrapper = await mountSuspended(UserCreate)
    
    expect(wrapper.text()).toContain('Создание пользователя')
    expect(wrapper.findComponent({ name: 'UserForm' }).exists()).toBe(true)
  })

  it('handles user creation flow', async () => {
    const wrapper = await mountSuspended(UserCreate)
    const userForm = wrapper.findComponent({ name: 'UserForm' })
    
    await userForm.vm.$emit('submit', {
      fullName: 'Новый Пользователь',
      dateOfBirth: '2000-01-01',
      email: 'new@example.com',
      phone: '+7-999-999-99-99'
    })

    expect(wrapper.vm.loading).toBe(true)
  })
})