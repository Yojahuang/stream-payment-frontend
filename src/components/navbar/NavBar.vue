<template>
  <div class="w-full" :style="{ 'background-color': navbarStyle }">
    <div v-if="smAndDown">
      <NavBarMobile />
    </div>
    <div v-else-if="md" class="w-full mx-auto d-flex align-center justify-space-between">
      <NavBarDesktop />
    </div>
    <div v-else class="w-75 mx-auto d-flex align-center justify-space-between">
      <NavBarDesktop />
    </div>
  </div>
  <v-divider class="mb-6"></v-divider>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useDisplay } from 'vuetify'
import { Global } from "@/composables/Global"
import NavBarDesktop from '@/components/navbar/NavBarDesktop.vue'
import NavBarMobile from '@/components/navbar/NavBarMobile.vue'

const { md, smAndDown } = useDisplay()

const navbarStyle = computed(() => {
  if (Global.currentThemeIsDark()) {
    return '#66319c'
  } else {
    return '#8746cb'
  }
})
</script>

<style scoped></style>
