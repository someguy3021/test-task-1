<template>
  <div class="p-1 md:p-6">
    <v-text-field
      v-model="search"
      label="Поиск"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      class="mb-4"
      density="comfortable"
      clearable
    />

    <!-- Мобильный заголовок с селектом сортировки -->
    <div v-if="isMobile" class="mobile-sort-header mb-2">
      <v-select
        v-model="mobileSortBy"
        :items="sortableHeaders"
        item-title="title"
        item-value="key"
        label="Сортировка"
        density="comfortable"
        variant="outlined"
        hide-details
        class="mobile-sort-select"
      >
        <template #item="{ item, props }">
          <v-list-item v-bind="props">
            <template #prepend>
              <v-icon 
                v-if="mobileSortBy === item.value.key" 
                :color="mobileSortDesc ? 'primary' : 'primary'"
              >
                {{ mobileSortDesc ? 'mdi-sort-descending' : 'mdi-sort-ascending' }}
              </v-icon>
              <v-icon v-else color="grey">mdi-sort</v-icon>
            </template>
          </v-list-item>
        </template>
      </v-select>
      
      <v-btn
        variant="text"
        size="small"
        @click="toggleSortDirection"
        class="sort-direction-btn"
      >
        <v-icon>
          {{ mobileSortDesc ? 'mdi-sort-descending' : 'mdi-sort-ascending' }}
        </v-icon>
      </v-btn>
    </div>

    <div class="table-wrapper">
      <v-data-table
        :headers="headers"
        :items="filteredUsers"
        :search="search"
        :items-per-page="itemsPerPage"
        :items-per-page-options="[10, 25, 50, 100]"
        :page="page"
        :sort-by="sortBy"
        @update:items-per-page="itemsPerPage = $event"
        @update:page="page = $event"
        :mobile-breakpoint="600"
        class="elevation-1 russian-pagination mobile-table"
        loading-text="Загрузка..."
        no-data-text="Нет данных"
        items-per-page-text="Элементов на странице:"
        :sort-by-text="`Сортировка`"
        :show-select="false"
        select-strategy="single"
        :hide-default-header="isMobile"
      >
        <!-- Слот для заголовка таблицы (скрыт на мобильных) -->
        <template #header="{ props }">
          <thead v-if="!isMobile" class="v-data-table-header">
            <tr>
              <th
                v-for="header in props.headers"
                :key="header.key"
                :class="[
                  `text-${header.align || 'start'}`,
                  header.sortable && 'sortable'
                ]"
                @click="header.sortable && handleHeaderSort(header)"
                class="v-data-table-header__content"
              >
                <span class="header-text">{{ header.title }}</span>
                <v-icon
                  v-if="header.sortable"
                  small
                  class="sort-icon"
                  :class="{ active: sortBy[0]?.key === header.key }"
                >
                  {{ getSortIcon(header) }}
                </v-icon>
              </th>
            </tr>
          </thead>
        </template>

        <template #item.dateOfBirth="{ item }">
          {{ formatDate(item.dateOfBirth) }}
        </template>
        
        <template #item.actions="{ item }">
          <v-tooltip text="Редактировать">
            <template v-slot:activator="{ props }">
              <v-icon
                size="26px"
                class="me-4"
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
                size="26px"
                v-bind="props"
                @click="deleteUser(item)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-tooltip>
        </template>
      </v-data-table>
    </div>

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
import { useDisplay } from 'vuetify'

const usersStore = useUsersStore()
const { mobile: isMobile } = useDisplay()

const search = ref('')
const page = ref(1)
const itemsPerPage = ref(10)
const editDialog = ref(false)
const deleteDialog = ref(false)
const editLoading = ref(false)
const deleteLoading = ref(false)
const editingUser = ref<User | null>(null)
const userToDelete = ref<User | null>(null)

// Единая система сортировки для всех устройств
const sortBy = ref<{ key: string; order: 'asc' | 'desc' }[]>([{ key: 'fullName', order: 'asc' }])

// Сортировка для мобильных - синхронизирована с основной
const mobileSortBy = ref('fullName')
const mobileSortDesc = ref(false)

const headers: DataTableHeader[] = [
  { title: 'ФИО', key: 'fullName', sortable: true },
  { title: 'Дата рождения', key: 'dateOfBirth', sortable: true },
  { title: 'Email', key: 'email', sortable: true },
  { title: 'Телефон', key: 'phone', sortable: false },
  { title: 'Действия', key: 'actions', sortable: false }
]

// Заголовки доступные для сортировки
const sortableHeaders = computed(() => {
  return headers
    .filter(header => header.sortable)
    .map(header => ({
      title: header.title,
      key: header.key
    }))
})

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

// Синхронизация мобильной сортировки с основной
watch([mobileSortBy, mobileSortDesc], () => {
  sortBy.value = [{ key: mobileSortBy.value, order: mobileSortDesc.value ? 'desc' : 'asc' }]
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU')
}

// Переключение направления сортировки
const toggleSortDirection = () => {
  mobileSortDesc.value = !mobileSortDesc.value
  sortBy.value = [{ key: mobileSortBy.value, order: mobileSortDesc.value ? 'desc' : 'asc' }]
}

// Обработка сортировки по клику на заголовок (для десктопа)
const handleHeaderSort = (header: DataTableHeader) => {
  if (header.sortable) {
    const currentSort = sortBy.value[0]
    if (currentSort?.key === header.key) {
      // Переключаем направление, если уже сортируем по этому полю
      sortBy.value = [{
        key: header.key,
        order: currentSort.order === 'asc' ? 'desc' : 'asc'
      }]
      mobileSortDesc.value = sortBy.value[0].order === 'desc'
    } else {
      // Сортируем по новому полю
      sortBy.value = [{ key: header.key, order: 'asc' }]
      mobileSortBy.value = header.key
      mobileSortDesc.value = false
    }
  }
}

// Получение иконки для сортировки
const getSortIcon = (header: DataTableHeader) => {
  const currentSort = sortBy.value[0]
  if (currentSort?.key === header.key) {
    return currentSort.order === 'desc' ? 'mdi-sort-descending' : 'mdi-sort-ascending'
  }
  return 'mdi-sort'
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
.mobile-sort-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mobile-sort-select {
  flex: 1;
}

.sort-direction-btn {
  min-width: 48px;
  height: 40px;
}

/* Стили для заголовков на десктопе */
.v-data-table-header__content {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.sort-icon {
  opacity: 0.5;
  transition: opacity 0.2s;
}

.sort-icon.active {
  opacity: 1;
}

.header-text {
  white-space: nowrap;
}
</style>