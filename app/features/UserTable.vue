<template>
  <div class="p-6">
    <v-text-field
      v-model="search"
      label="Поиск"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      class="mb-4"
    />

    <v-data-table
      :headers="headers"
      :items="filteredUsers"
      :search="search"
      :items-per-page="itemsPerPage"
      :page="page"
      @update:items-per-page="itemsPerPage = $event"
      @update:page="page = $event"
    >
      <template #item.actions="{ item }">
        <v-icon
          size="small"
          class="me-2"
          @click="editUser(item.raw)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          size="small"
          @click="deleteUser(item.raw)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <!-- Диалог редактирования -->
    <v-dialog v-model="editDialog" max-width="600px">
      <UserForm
        v-if="editingUser"
        :user="editingUser"
        :is-edit="true"
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
          Вы уверены, что хотите удалить пользователя {{ userToDelete?.fullName }}?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="deleteDialog = false">
            Отмена
          </v-btn>
          <v-btn color="red-darken-1" variant="text" @click="confirmDelete">
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { User } from '~/shared/types/user'
import { useUsersStore } from '~/stores/users'

const usersStore = useUsersStore()
const search = ref('')
const page = ref(1)
const itemsPerPage = ref(10)
const editDialog = ref(false)
const deleteDialog = ref(false)
const editingUser = ref<User | null>(null)
const userToDelete = ref<User | null>(null)

const headers = [
  { title: 'ФИО', key: 'fullName', sortable: true },
  { title: 'Дата рождения', key: 'dateOfBirth', sortable: true },
  { title: 'Email', key: 'email' },
  { title: 'Телефон', key: 'phone' },
  { title: 'Действия', key: 'actions', sortable: false }
]

const filteredUsers = computed(() => {
  if (!search.value) return usersStore.users

  const searchLower = search.value.toLowerCase()
  return usersStore.users.filter(user =>
    user.fullName.toLowerCase().includes(searchLower) ||
    user.email.toLowerCase().includes(searchLower) ||
    user.phone.includes(searchLower) ||
    user.dateOfBirth.includes(searchLower)
  )
})

const editUser = (user: User) => {
  editingUser.value = { ...user }
  editDialog.value = true
}

const deleteUser = (user: User) => {
  userToDelete.value = user
  deleteDialog.value = true
}

const handleEditSubmit = (userData: any) => {
  if (editingUser.value) {
    usersStore.updateUser(editingUser.value.id, userData)
    editDialog.value = false
    editingUser.value = null
  }
}

const confirmDelete = () => {
  if (userToDelete.value) {
    usersStore.deleteUser(userToDelete.value.id)
    deleteDialog.value = false
    userToDelete.value = null
  }
}
</script>