<template>
  <v-app>
    <NavBar />
    <router-view />
    <v-overlay class="align-center justify-center" v-model="loading">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script setup lang="ts">
import { computed } from "vue"
import NavBar from '@/components/navbar/NavBar.vue';
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/Global';

const { loadingSemaphore } = storeToRefs(useGlobalStore())

const loading = computed(() => {
  return loadingSemaphore.value > 0
})
</script>

<style scoped></style>
