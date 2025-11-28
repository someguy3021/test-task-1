export const useSnackbar = () => {
  const snackbar = inject('snackbar') as {
    showSnackbar: (options: { message: string; color?: string; timeout?: number }) => void
  }

  const showSuccess = (message: string) => {
    snackbar?.showSnackbar({
      message,
      color: 'success',
      timeout: 3000
    })
  }
  
  const showError = (message: string) => {
    snackbar?.showSnackbar({
      message,
      color: 'error',
      timeout: 5000
    })
  }
  
  const showWarning = (message: string) => {
    snackbar?.showSnackbar({
      message,
      color: 'warning',
      timeout: 4000
    })
  }
  
  const showInfo = (message: string) => {
    snackbar?.showSnackbar({
      message,
      color: 'info',
      timeout: 3000
    })
  }

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
}