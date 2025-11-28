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

  it('validates entity data correctly', async () => {
    const wrapper = mount(UserForm, {
      props: {
        isEdit: true,
        user: mockUser
      }
    })

    // Вместо прямого доступа к formData, проверяем через значения input
    await wrapper.vm.$nextTick()
    
    const fullNameInput = wrapper.find('input[type="text"]').element as HTMLInputElement
    const emailInput = wrapper.find('input[type="email"]').element as HTMLInputElement
    
    expect(fullNameInput.value).toBe(mockUser.fullName)
    expect(emailInput.value).toBe(mockUser.email)
  })

  it('emits submit event with form data', async () => {
    const wrapper = mount(UserForm, {
      props: {
        isEdit: false
      }
    })

    // Заполняем форму через UI
    await wrapper.find('input[type="text"]').setValue('Test User')
    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="date"]').setValue('2000-01-01')
    await wrapper.find('input[placeholder="+7-999-123-45-67"]').setValue('+7-999-888-77-66')

    // Триггерим отправку
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('submit')).toBeTruthy()
    
    const submitEvent = wrapper.emitted('submit')![0][0]
    expect(submitEvent).toEqual({
      fullName: 'Test User',
      email: 'test@example.com',
      dateOfBirth: '2000-01-01',
      phone: '+7-999-888-77-66'
    })
  })

  it('emits cancel event when cancel button is clicked', async () => {
    const wrapper = mount(UserForm, {
      props: {
        isEdit: false
      }
    })

    const cancelButtons = wrapper.findAll('button')
    const cancelButton = cancelButtons.find(btn => btn.text().includes('Отмена'))
    
    await cancelButton?.trigger('click')
    
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('shows validation errors for invalid data', async () => {
    const wrapper = mount(UserForm, {
      props: {
        isEdit: false
      }
    })

    // Устанавливаем невалидные данные
    await wrapper.find('input[type="text"]').setValue('')
    await wrapper.find('input[type="email"]').setValue('invalid-email')
    
    // Триггерим blur для валидации
    await wrapper.find('input[type="text"]').trigger('blur')
    await wrapper.find('input[type="email"]').trigger('blur')

    await wrapper.vm.$nextTick()

    // Проверяем, что сообщения об ошибках отображаются
    expect(wrapper.text()).toContain('ФИО обязательно')
    expect(wrapper.text()).toContain('Некорректный формат email')
  })

  it('disables form when loading prop is true', () => {
    const wrapper = mount(UserForm, {
      props: {
        isEdit: false,
        loading: true
      }
    })

    const inputs = wrapper.findAll('input')
    const buttons = wrapper.findAll('button')

    inputs.forEach(input => {
      expect(input.attributes('disabled')).toBeDefined()
    })

    // Проверяем, что кнопка сохранения заблокирована
    const saveButton = buttons.find(btn => btn.text().includes('Сохранить'))
    expect(saveButton?.attributes('disabled')).toBeDefined()
  })
})