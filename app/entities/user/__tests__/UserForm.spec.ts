import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import UserForm from '../ui/UserForm.vue'

describe('UserForm', () => {
  it('renders form fields', () => {
    const wrapper = mount(UserForm, {
      props: {
        isEdit: false
      }
    })

    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="date"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="+7-999-123-45-67"]').exists()).toBe(true)
  })

  it('emits submit event when form is submitted', async () => {
    const wrapper = mount(UserForm, {
      props: {
        isEdit: false
      }
    })

    await wrapper.find('form').trigger('submit.prevent')
    
    expect(wrapper.emitted('submit')).toBeTruthy()
  })

  it('emits cancel event when cancel button is clicked', async () => {
    const wrapper = mount(UserForm, {
      props: {
        isEdit: false
      }
    })

    const cancelButton = wrapper.findAll('button').find(btn => 
      btn.text().includes('Отмена')
    )
    
    await cancelButton?.trigger('click')
    
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })
})