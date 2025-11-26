<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">{{ isEdit ? 'Редактирование' : 'Создание' }} пользователя</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" @submit.prevent="submit">
        <v-text-field
          v-model="formData.fullName"
          :rules="[validateFullName]"
          label="ФИО"
          required
          variant="outlined"
          class="mb-4"
        />

        <v-text-field
          v-model="formData.email"
          :rules="[validateEmail]"
          label="Email"
          type="email"
          required
          variant="outlined"
          class="mb-4"
        />

        <v-text-field
          v-model="formData.dateOfBirth"
          :rules="[validateDateOfBirth]"
          label="Дата рождения"
          type="date"
          required
          variant="outlined"
          class="mb-4"
        />

        <v-text-field
          v-model="formData.phone"
          :rules="[validatePhone]"
          label="Телефон"
          placeholder="+7-999-123-45-67"
          required
          variant="outlined"
          class="mb-4"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="$emit('cancel')">
        Отмена
      </v-btn>
      <v-btn color="blue-darken-1" variant="text" @click="submit" :disabled="!valid">
        Сохранить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { type User, type UserFormData } from '~/shared/types/user'

interface Props {
  user?: User
  isEdit?: boolean
}

interface Emits {
  (e: 'submit', data: UserFormData): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  isEdit: false
})
const emit = defineEmits<Emits>()

const { validateFullName, validateEmail, validateDateOfBirth, validatePhone } = useUserValidation()

const form = ref()
const valid = ref(false)
const formData = reactive<UserFormData>({
  fullName: props.user?.fullName || '',
  email: props.user?.email || '',
  dateOfBirth: props.user?.dateOfBirth || '',
  phone: props.user?.phone || ''
})

const submit = async () => {
  const { valid } = await form.value.validate()
  if (valid) {
    emit('submit', { ...formData })
  }
}
</script>