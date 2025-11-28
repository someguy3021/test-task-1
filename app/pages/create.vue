<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Создание пользователя</h1>
    <UserForm @submit="handleCreate" />
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '~/stores/users'

const usersStore = useUsersStore()
const router = useRouter()

const handleCreate = (userData: any) => {
  usersStore.createUser(userData)
  router.push('/')
}
</script>