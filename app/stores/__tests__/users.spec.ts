import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUsersStore } from '../users'
import type { UserFormData } from '~/entities/user/model/types'

describe('Users Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('Entity Management', () => {
    it('manages user entities state', () => {
      const store = useUsersStore()
      
      expect(store.users).toHaveLength(3)
      expect(store.getUsersCount).toBe(3)
    })

    it('creates user entities', () => {
      const store = useUsersStore()
      const userData: UserFormData = {
        fullName: 'Тестовый Пользователь',
        dateOfBirth: '2000-01-01',
        email: 'test@example.com',
        phone: '+7-999-888-77-66'
      }

      const user = store.createUser(userData)
      
      expect(user.id).toBeDefined()
      expect(store.users).toHaveLength(4)
      expect(store.getUserById(user.id)).toEqual(user)
    })

    it('updates user entities', () => {
      const store = useUsersStore()
      const userToUpdate = store.users[0]
      const updateData: UserFormData = {
        fullName: 'Обновленное Имя',
        dateOfBirth: '1995-01-01',
        email: 'updated@example.com',
        phone: '+7-111-222-33-44'
      }

      const updated = store.updateUser(userToUpdate.id, updateData)
      
      expect(updated?.fullName).toBe(updateData.fullName)
      expect(store.users[0].fullName).toBe(updateData.fullName)
    })

    it('deletes user entities', () => {
      const store = useUsersStore()
      const userToDelete = store.users[0]
      const initialCount = store.getUsersCount

      const result = store.deleteUser(userToDelete.id)
      
      expect(result).toBe(true)
      expect(store.getUsersCount).toBe(initialCount - 1)
      expect(store.getUserById(userToDelete.id)).toBeUndefined()
    })
  })
})