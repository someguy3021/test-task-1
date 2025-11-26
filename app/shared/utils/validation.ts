export const useUserValidation = () => {
  const validateFullName = (value: string) => {
    if (!value) return 'ФИО обязательно'
    if (value.length < 2) return 'ФИО должно содержать минимум 2 символа'
    return true
  }

  const validateEmail = (value: string) => {
    if (!value) return 'Email обязателен'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) return 'Некорректный формат email'
    return true
  }

  const validateDateOfBirth = (value: string) => {
    if (!value) return 'Дата рождения обязательна'
    const date = new Date(value)
    const today = new Date()
    if (date > today) return 'Дата рождения не может быть в будущем'
    return true
  }

  const validatePhone = (value: string) => {
    if (!value) return 'Телефон обязателен'
    const phoneRegex = /^\+7-\d{3}-\d{3}-\d{2}-\d{2}$/
    if (!phoneRegex.test(value)) return 'Формат: +7-999-123-45-67'
    return true
  }

  return {
    validateFullName,
    validateEmail,
    validateDateOfBirth,
    validatePhone
  }
}