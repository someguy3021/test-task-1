import { describe, it, expect, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { setActivePinia, createPinia } from 'pinia'
import UserList from '~/features/user-list/index.vue'
import { useUsersStore } from '~/stores/users'

describe('User Management Integration', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('integrates entities, features and stores', async () => {
    const store = useUsersStore()
    const wrapper = await mountSuspended(UserList)
    
    // Проверяем, что фича отображает данные из store
    expect(wrapper.text()).toContain('Список пользователей')
    expect(store.users.length).toBeGreaterThan(0)
    
    // Проверяем, что кнопка создания ведет на правильный маршрут
    const createButton = wrapper.find('v-btn[to="/create"]')
    expect(createButton.exists()).toBe(true)
  })

  it('completes full entity lifecycle', () => {
    const store = useUsersStore()
    const initialCount = store.getUsersCount

    // Create
    const newUser = store.createUser({
      fullName: 'Интеграционный Тест',
      dateOfBirth: '2000-01-01',
      email: 'integration@example.com',
      phone: '+7-999-777-66-55'
    })

    expect(store.getUsersCount).toBe(initialCount + 1)

    // Read
    const foundUser = store.getUserById(newUser.id)
    expect(foundUser).toEqual(newUser)

    // Update
    store.updateUser(newUser.id, {
      ...newUser,
      fullName: 'Обновленный Интеграционный Тест'
    })

    expect(store.getUserById(newUser.id)?.fullName).toBe('Обновленный Интеграционный Тест')

    // Delete
    store.deleteUser(newUser.id)
    expect(store.getUsersCount).toBe(initialCount)
  })
})