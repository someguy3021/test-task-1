<template>
  <v-card>
    <v-card-title>
      <span class="text-2xl font-bold">{{ isEdit ? 'Редактирование' : 'Создание' }} пользователя</span>
    </v-card-title>
    
    <v-card-text>
      <v-form ref="form" v-model="valid" @submit.prevent="submit">
        <v-text-field
          v-model="formData.fullName"
          :rules="[validateFullName]"
          :error-messages="errors.fullName"
          label="ФИО"
          required
          variant="outlined"
          class="mb-4"
          @blur="validateField('fullName')"
          :disabled="loading"
        />

        <v-text-field
          v-model="formData.email"
          :rules="[validateEmail]"
          :error-messages="errors.email"
          label="Email"
          type="email"
          required
          variant="outlined"
          class="mb-4"
          @blur="validateField('email')"
          :disabled="loading"
        />

        <v-text-field
          v-model="formData.dateOfBirth"
          :rules="[validateDateOfBirth]"
          :error-messages="errors.dateOfBirth"
          label="Дата рождения"
          type="date"
          required
          variant="outlined"
          class="mb-4"
          @blur="validateField('dateOfBirth')"
          :disabled="loading"
        />

        <v-text-field
          v-model="formData.phone"
          :rules="[validatePhone]"
          :error-messages="errors.phone"
          label="Телефон"
          placeholder="+7-999-123-45-67"
          required
          variant="outlined"
          class="mb-4"
          @blur="validateField('phone')"
          :disabled="loading"
        />
      </v-form>
    </v-card-text>
    
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn 
        color="blue-darken-1" 
        variant="text" 
        @click="$emit('cancel')" 
        :disabled="loading"
      >
        Отмена
      </v-btn>
      <v-btn 
        color="blue-darken-1" 
        variant="text" 
        @click="submit" 
        :disabled="!valid || loading"
        :loading="loading"
      >
        Сохранить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { User, UserFormData } from '~/entities/user/model/types'
import { useUserValidation } from '~/shared/lib/validation'

interface Props {
  user?: User
  isEdit?: boolean
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: UserFormData): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  isEdit: false,
  loading: false
})
const emit = defineEmits<Emits>()

const { validateFullName, validateEmail, validateDateOfBirth, validatePhone } = useUserValidation()

const form = ref()
const valid = ref(false)
const errors = reactive({
  fullName: '',
  email: '',
  dateOfBirth: '',
  phone: ''
})

const formData = reactive<UserFormData>({
  fullName: props.user?.fullName || '',
  email: props.user?.email || '',
  dateOfBirth: props.user?.dateOfBirth || '',
  phone: props.user?.phone || ''
})

// Следим за изменениями пользователя для редактирования
watch(() => props.user, (newUser) => {
  if (newUser) {
    Object.assign(formData, newUser)
  }
}, { immediate: true })

const validateField = (field: keyof typeof errors) => {
  const validators = {
    fullName: validateFullName,
    email: validateEmail,
    dateOfBirth: validateDateOfBirth,
    phone: validatePhone
  }
  
  const result = validators[field](formData[field])
  errors[field] = typeof result === 'string' ? result : ''
}

const submit = async () => {
  if (!form.value) return
  
  const { valid } = await form.value.validate()
  if (valid) {
    emit('submit', { ...formData })
  }
}

// Валидируем форму при изменении данных
watch(formData, () => {
  if (form.value) {
    form.value.validate()
  }
}, { deep: true })
</script>