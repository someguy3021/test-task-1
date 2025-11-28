<template>
  <div class="user-list">
    <v-card>
      <v-card-title class="d-flex align-center">
        <h1 class="text-2xl font-bold">Список пользователей</h1>
        <v-spacer />
        <v-btn 
          color="primary" 
          to="/create"
          prepend-icon="mdi-account-plus"
        >
          Создать пользователя
        </v-btn>
      </v-card-title>
      
      <v-card-text>
        <UserTable />
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
// Этот компонент-обертка может содержать дополнительную логику для страницы списка
// Например, фильтры, экспорт данных и т.д.
</script>

<style scoped>
.user-list {
  max-width: 1200px;
  margin: 0 auto;
}
</style>