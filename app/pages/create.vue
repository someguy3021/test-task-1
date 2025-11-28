<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Создание пользователя</h1>
    <UserForm @submit="handleCreate" />
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '~/stores/users'
import { UserFormData } from '~/shared/types/user'

const usersStore = useUsersStore()
const router = useRouter()

const handleCreate = (userData: UserFormData) => {
  usersStore.createUser(userData)
  router.push('/')
}
</script>