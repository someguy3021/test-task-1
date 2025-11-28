import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUsersStore } from '../users'
import type { UserFormData } from '~/entities/user/model/types'

describe('users store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should create user', () => {
    const store = useUsersStore()
    const newUser: UserFormData = {
      fullName: 'Test User',
      dateOfBirth: '2000-01-01',
      email: 'test@example.com',
      phone: '+7-999-888-77-66'
    }

    const created = store.createUser(newUser)
    
    expect(created.id).toBeDefined()
    expect(store.users).toHaveLength(4)
    expect(created.fullName).toBe(newUser.fullName)
  })

  it('should update user', () => {
    const store = useUsersStore()
    const userToUpdate = store.users[0]
    const updateData: UserFormData = {
      fullName: 'Updated Name',
      dateOfBirth: '1995-01-01',
      email: 'updated@example.com',
      phone: '+7-111-222-33-44'
    }

    const updated = store.updateUser(userToUpdate.id, updateData)
    
    expect(updated?.fullName).toBe(updateData.fullName)
    expect(store.users[0].fullName).toBe(updateData.fullName)
  })

  it('should delete user', () => {
    const store = useUsersStore()
    const userToDelete = store.users[0]
    const initialCount = store.getUsersCount

    const result = store.deleteUser(userToDelete.id)
    
    expect(result).toBe(true)
    expect(store.getUsersCount).toBe(initialCount - 1)
  })
})