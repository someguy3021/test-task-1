<template>
  <v-app>
    <v-app-bar color="primary" prominent>
      <v-app-bar-title>User Management App</v-app-bar-title>
      <v-spacer/>
      <v-btn 
        icon 
        to="/"
        title="Список пользователей"
      >
        <v-icon>mdi-account-multiple</v-icon>
      </v-btn>
      <v-btn 
        icon 
        to="/create"
        title="Создать пользователя"
      >
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">

</script>