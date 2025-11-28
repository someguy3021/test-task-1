import { describe, it, expect, vi } from 'vitest'
import { useSnackbar } from '../notifications'

describe('notifications', () => {
  it('provides notification functions', () => {
    // Мокаем inject
    const mockShowSnackbar = vi.fn()
    vi.stubGlobal('inject', () => ({
      showSnackbar: mockShowSnackbar
    }))

    const { showSuccess, showError } = useSnackbar()
    
    showSuccess('Test success')
    showError('Test error')
    
    // Проверяем, что функции вызываются
    expect(mockShowSnackbar).toHaveBeenCalledTimes(2)
  })
})