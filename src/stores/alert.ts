import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useAlertStore = defineStore('alertStore', () => {
  const alert = ref(false)
  const alertMessage = ref('')
  const alertType = ref('success')

  const showAlert = (type: string, message: string) => {
    alertType.value = type
    alertMessage.value = message
    alert.value = true
  }

  const showSuccessAlert = (message: string) => {
    showAlert('success', message)
  }

  const showErrorAlert = (message: string) => {
    showAlert('error', message)
  }

  return {
    showErrorAlert,
    showSuccessAlert,
    alert,
    alertMessage,
    alertType,
  }
})
