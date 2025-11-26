import { defineStore } from 'pinia'
import { type User, type UserFormData } from '~/shared/types/user'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([
    {
      id: '1',
      fullName: 'Иванов Иван Иванович',
      dateOfBirth: '1990-05-15',
      email: 'ivanov@example.com',
      phone: '+7-999-123-45-67'
    },
    {
      id: '2',
      fullName: 'Петрова Анна Сергеевна',
      dateOfBirth: '1985-12-03',
      email: 'petrova@example.com',
      phone: '+7-999-234-56-78'
    },
    {
      id: '3',
      fullName: 'Сидоров Алексей Петрович',
      dateOfBirth: '1995-07-22',
      email: 'sidorov@example.com',
      phone: '+7-999-345-67-89'
    }
  ])

  const createUser = (userData: UserFormData) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString()
    }
    users.value.push(newUser)
  }

  const updateUser = (id: string, userData: UserFormData) => {
    const index = users.value.findIndex(user => user.id === id)
    if (index !== -1) {
      users.value[index] = { ...userData, id }
    }
  }

  const deleteUser = (id: string) => {
    users.value = users.value.filter(user => user.id !== id)
  }

  const getUserById = (id: string) => {
    return users.value.find(user => user.id === id)
  }

  return {
    users,
    createUser,
    updateUser,
    deleteUser,
    getUserById
  }
})