<template>
  <div class="p-4 md:p-6">
    <v-text-field
      v-model="search"
      label="Поиск"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      class="mb-4"
      density="comfortable"
      clearable
    />

    <v-data-table
      :headers="headers"
      :items="filteredUsers"
      :search="search"
      :items-per-page="itemsPerPage"
      :items-per-page-options="[10, 25, 50, 100]"
      :page="page"
      @update:items-per-page="itemsPerPage = $event"
      @update:page="page = $event"
      :mobile-breakpoint="0"
      class="elevation-1 russian-pagination"
      loading-text="Загрузка..."
      no-data-text="Нет данных"
      items-per-page-text="Элементов на странице:"
    >
      <template #item.dateOfBirth="{ item }">
        {{ formatDate(item.dateOfBirth) }}
      </template>
      
      <template #item.actions="{ item }">
        <v-tooltip text="Редактировать">
          <template v-slot:activator="{ props }">
            <v-icon
              size="small"
              class="me-2"
              v-bind="props"
              @click="editUser(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
        </v-tooltip>
        
        <v-tooltip text="Удалить">
          <template v-slot:activator="{ props }">
            <v-icon
              size="small"
              v-bind="props"
              @click="deleteUser(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-tooltip>
      </template>
    </v-data-table>

    <!-- Диалог редактирования -->
    <v-dialog v-model="editDialog" max-width="600px" persistent>
      <UserForm
        v-if="editingUser"
        :user="editingUser"
        :is-edit="true"
        :loading="editLoading"
        @submit="handleEditSubmit"
        @cancel="editDialog = false"
      />
    </v-dialog>

    <!-- Диалог удаления -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">
          Подтверждение удаления
        </v-card-title>
        <v-card-text>
          Вы уверены, что хотите удалить пользователя <strong>{{ userToDelete?.fullName }}</strong>?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="deleteDialog = false" :disabled="deleteLoading">
            Отмена
          </v-btn>
          <v-btn color="red-darken-1" variant="text" @click="confirmDelete" :loading="deleteLoading">
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { User, UserFormData, DataTableHeader } from '~/entities/user/model/types'
import { useUsersStore } from '~/stores/users'

const usersStore = useUsersStore()

const search = ref('')
const page = ref(1)
const itemsPerPage = ref(10)
const editDialog = ref(false)
const deleteDialog = ref(false)
const editLoading = ref(false)
const deleteLoading = ref(false)
const editingUser = ref<User | null>(null)
const userToDelete = ref<User | null>(null)

const headers: DataTableHeader[] = [
  { title: 'ФИО', key: 'fullName', sortable: true },
  { title: 'Дата рождения', key: 'dateOfBirth', sortable: true },
  { title: 'Email', key: 'email', sortable: true },
  { title: 'Телефон', key: 'phone' },
  { title: 'Действия', key: 'actions', sortable: false }
]

const filteredUsers = computed(() => {
  if (!search.value) return usersStore.users

  const searchLower = search.value.toLowerCase()
  return usersStore.users.filter(user =>
    user.fullName.toLowerCase().includes(searchLower) ||
    user.email.toLowerCase().includes(searchLower) ||
    user.phone.includes(search.value) ||
    user.dateOfBirth.includes(search.value)
  )
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU')
}

// Функция для обновления текста пагинации
const updatePaginationText = () => {
  nextTick(() => {
    const infoDiv = document.querySelector('.v-data-table-footer__info')
    if (infoDiv) {
      const text = infoDiv.textContent
      if (text && text.includes('of')) {
        const [range, total] = text.split(' of ')
        infoDiv.textContent = `${range} из ${total}`
      }
    }
  })
}

// Обновляем текст при изменении страницы или количества элементов
watch([page, itemsPerPage, filteredUsers], () => {
  updatePaginationText()
})

onMounted(() => {
  updatePaginationText()
})

const editUser = (user: User) => {
  editingUser.value = { ...user }
  editDialog.value = true
}

const deleteUser = (user: User) => {
  userToDelete.value = user
  deleteDialog.value = true
}

const handleEditSubmit = async (userData: UserFormData) => {
  if (!editingUser.value) return
  
  editLoading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 500)) // Имитация загрузки
    usersStore.updateUser(editingUser.value.id, userData)
    editDialog.value = false
    editingUser.value = null
  } catch (error) {
    console.error('Ошибка при обновлении пользователя:', error)
  } finally {
    editLoading.value = false
  }
}

const confirmDelete = async () => {
  if (!userToDelete.value) return
  
  deleteLoading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 500)) // Имитация загрузки
    usersStore.deleteUser(userToDelete.value.id)
    deleteDialog.value = false
    userToDelete.value = null
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error)
  } finally {
    deleteLoading.value = false
  }
}
</script>

<style scoped>
.russian-pagination :deep(.v-data-table-footer__info) {
  font-size: 0.875rem;
}
</style>