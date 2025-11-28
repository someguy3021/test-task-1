import { describe, it, expect } from 'vitest'
import { useUserValidation } from '../validation'

describe('useUserValidation', () => {
  const { validateFullName, validateEmail, validateDateOfBirth, validatePhone } = useUserValidation()

  it('validates email correctly', () => {
    expect(validateEmail('test@example.com')).toBe(true)
    expect(validateEmail('invalid')).toBe('Некорректный формат email')
  })

  it('validates full name correctly', () => {
    expect(validateFullName('Valid Name')).toBe(true)
    expect(validateFullName('')).toBe('ФИО обязательно')
  })

  it('validates date of birth correctly', () => {
    expect(validateDateOfBirth('2000-01-01')).toBe(true)
    expect(validateDateOfBirth('')).toBe('Дата рождения обязательна')
  })

  it('validates phone correctly', () => {
    expect(validatePhone('+7-999-123-45-67')).toBe(true)
    expect(validatePhone('123')).toContain('Введите корректный номер телефона')
  })
})