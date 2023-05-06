<template>
  <v-app>
    <NavBar />
    <router-view />
  </v-app>
</template>

<script setup lang="ts">
import NavBar from '@/components/navbar/NavBar.vue';
</script>

<style scoped></style>
