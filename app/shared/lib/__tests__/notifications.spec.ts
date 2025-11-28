import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useSnackbar } from '../notifications'

describe('Notifications Shared', () => {
  const mockShowSnackbar = vi.fn()

  beforeEach(() => {
    vi.resetAllMocks()
    vi.stubGlobal('inject', () => ({
      showSnackbar: mockShowSnackbar
    }))
  })

  it('shows entity operation notifications', () => {
    const { showSuccess, showError } = useSnackbar()
    
    showSuccess('Пользователь создан')
    showError('Ошибка создания')
    
    expect(mockShowSnackbar).toHaveBeenCalledWith({
      message: 'Пользователь создан',
      color: 'success',
      timeout: 3000
    })
    expect(mockShowSnackbar).toHaveBeenCalledWith({
      message: 'Ошибка создания',
      color: 'error',
      timeout: 5000
    })
  })
})