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
import { useTheme } from 'vuetify'
import { computed } from "vue"
import { useDisplay } from 'vuetify'
import NavBarDesktop from '@/components/navbar/NavBarDesktop.vue'
import NavBarMobile from '@/components/navbar/NavBarMobile.vue'

const { md, smAndDown } = useDisplay()

const theme = useTheme()

const navbarStyle = computed(() => {
  if (theme.global.current.value.dark) {
    return '#66319c'
  } else {
    return '#8746cb'
  }
})
</script>

<style scoped></style>
