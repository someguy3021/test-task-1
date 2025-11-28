import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import UserForm from '../ui/UserForm.vue'
import type { User } from '../model/types'

describe('UserForm Entity', () => {
  const mockUser: User = {
    id: '1',
    fullName: 'Иванов Иван Иванович',
    dateOfBirth: '1990-05-15',
    email: 'ivanov@example.com',
    phone: '+7-999-123-45-67'
  }

  it('validates entity data correctly', () => {
    const wrapper = mount(UserForm, {
      props: {
        isEdit: true,
        user: mockUser
      }
    })

    expect(wrapper.vm.formData.fullName).toBe(mockUser.fullName)
    expect(wrapper.vm.formData.email).toBe(mockUser.email)
  })

  it('emits entity submit event', async () => {
    const wrapper = mount(UserForm, {
      props: { isEdit: false }
    })

    await wrapper.find('input[type="text"]').setValue('Test User')
    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="date"]').setValue('2000-01-01')
    await wrapper.find('input[placeholder="+7-999-123-45-67"]').setValue('+7-999-888-77-66')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('submit')).toBeTruthy()
  })
})