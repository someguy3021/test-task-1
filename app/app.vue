<template>
  <v-app>
    <v-app-bar color="primary" prominent>
      <v-app-bar-title class="text-white">User Management App</v-app-bar-title>
      <v-spacer/>
      <v-btn 
        icon 
        to="/"
        title="Список пользователей"
        class="text-white"
      >
        <v-icon>mdi-account-multiple</v-icon>
      </v-btn>
      <v-btn 
        icon 
        to="/create"
        title="Создать пользователя"
        class="text-white"
      >
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <NuxtPage />
      </v-container>
    </v-main>

    <!-- Глобальные уведомления -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-app>
</template>

<script setup lang="ts">
// Глобальное состояние для уведомлений
const snackbar = reactive({
  show: false,
  message: '',
  color: 'success',
  timeout: 3000
})

// Предоставляем функцию для показа уведомлений
const showSnackbar = (options: { message: string; color?: string; timeout?: number }) => {
  Object.assign(snackbar, {
    show: true,
    ...options
  })
}

provide('snackbar', { showSnackbar })
</script>

<style>
.text-white {
  color: white !important;
}
</style>