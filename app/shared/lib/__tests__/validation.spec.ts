import { describe, it, expect } from 'vitest'
import { useUserValidation } from '../validation'

describe('UserValidation Shared', () => {
  const { validateFullName, validateEmail, validateDateOfBirth, validatePhone } = useUserValidation()

  it('validates user entity fields', () => {
    expect(validateFullName('Иванов Иван')).toBe(true)
    expect(validateEmail('test@example.com')).toBe(true)
    expect(validateDateOfBirth('2000-01-01')).toBe(true)
    expect(validatePhone('+7-999-123-45-67')).toBe(true)
  })

  it('returns errors for invalid entity data', () => {
    expect(validateFullName('')).toBe('ФИО обязательно')
    expect(validateEmail('invalid')).toBe('Некорректный формат email')
    expect(validateDateOfBirth('3000-01-01')).toBe('Дата рождения не может быть в будущем')
    expect(validatePhone('123')).toContain('Введите корректный номер телефона')
  })
})