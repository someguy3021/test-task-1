<template>
  <div class="user-create">
      <v-card-text>
        <UserForm 
          @submit="handleCreate" 
          @cancel="handleCancel"
          :loading="loading"
        />
      </v-card-text>
  </div>
</template>

<script setup lang="ts">
import { UserFormData } from '~/entities/user/model/types'
import { useUsersStore } from '~/stores/users'
import { useSnackbar } from '~/shared/lib/notifications'

const usersStore = useUsersStore()
const router = useRouter()
const { showSuccess, showError } = useSnackbar()
const loading = ref(false)

const handleCreate = async (userData: UserFormData) => {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 500)) // Имитация загрузки
    usersStore.createUser(userData)
    showSuccess('Пользователь успешно создан')
    router.push('/')
  } catch (error) {
    showError('Ошибка при создании пользователя')
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  router.push('/')
}
</script>

<style scoped>
.user-create {
  max-width: 600px;
  margin: 0 auto;
}
</style>