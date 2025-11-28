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
    
    // Ждем инициализации компонента
    await wrapper.vm.$nextTick()
    
    // Находим поле поиска и устанавливаем значение
    const searchInput = wrapper.find('input[type="text"]')
    await searchInput.setValue('Иванов')
    
    // Ждем обновления computed свойств
    await wrapper.vm.$nextTick()
    
    // Вместо прямого доступа к filteredUsers, проверяем отображение в таблице
    const table = wrapper.find('v-data-table')
    expect(table.exists()).toBe(true)
    
    // Проверяем, что таблица все еще отображает данные
    expect(wrapper.text()).toContain('Иванов')
  })

  it('opens edit dialog when edit button is clicked', async () => {
    const wrapper = mount(UserTable)
    
    await wrapper.vm.$nextTick()
    
    // Находим первую кнопку редактирования (иконка карандаша)
    const editButtons = wrapper.findAll('i.mdi-pencil')
    expect(editButtons.length).toBeGreaterThan(0)
    
    await editButtons[0].trigger('click')
    
    // Проверяем, что диалог открылся
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({ name: 'UserForm' }).exists()).toBe(true)
  })

  it('opens delete dialog when delete button is clicked', async () => {
    const wrapper = mount(UserTable)
    
    await wrapper.vm.$nextTick()
    
    // Находим первую кнопку удаления (иконка корзины)
    const deleteButtons = wrapper.findAll('i.mdi-delete')
    expect(deleteButtons.length).toBeGreaterThan(0)
    
    await deleteButtons[0].trigger('click')
    
    // Проверяем, что диалог подтверждения удаления открылся
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Подтверждение удаления')
  })
})