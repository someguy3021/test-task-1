export const useUserValidation = () => {
  const validateFullName = (value: string) => {
    if (!value) return 'ФИО обязательно'
    if (value.length < 2) return 'ФИО должно содержать минимум 2 символа'
    if (value.length > 100) return 'ФИО слишком длинное'
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
    
    // Проверяем, что дата не в будущем
    if (date > today) return 'Дата рождения не может быть в будущем'
    
    // Проверяем, что пользователю не больше 150 лет
    const minDate = new Date()
    minDate.setFullYear(today.getFullYear() - 150)
    if (date < minDate) return 'Дата рождения не может быть раньше 150 лет назад'
    
    return true
  }

  const validatePhone = (value: string) => {
    if (!value) return 'Телефон обязателен'
    
    // Более гибкая валидация российских телефонов
    const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
    const cleanedPhone = value.replace(/[\s\-\(\)]/g, '')
    
    if (!phoneRegex.test(value) || cleanedPhone.length < 10) {
      return 'Введите корректный номер телефона. Пример: +7-999-123-45-67'
    }
    return true
  }

  return {
    validateFullName,
    validateEmail,
    validateDateOfBirth,
    validatePhone
  }
}