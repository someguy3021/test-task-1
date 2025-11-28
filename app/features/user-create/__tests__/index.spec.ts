import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import UserCreate from '../index.vue'

// Мокаем useRouter
vi.mock('#app', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}))

describe('UserCreate', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders create user form', () => {
    const wrapper = mount(UserCreate)
    
    expect(wrapper.text()).toContain('Создание пользователя')
    expect(wrapper.findComponent({ name: 'UserForm' }).exists()).toBe(true)
  })
})