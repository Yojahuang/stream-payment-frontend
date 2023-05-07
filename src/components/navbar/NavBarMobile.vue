<template>
    <div class="d-flex justify-space-between align-center">
        <div class="font-weight-bold ml-5 text-white" @click="Global.navigateTo('')">Stream Payment</div>
        <div class="d-flex align-center justify-begin">
            <v-btn class="text-white" @click="toggleTheme()" icon="mdi-theme-light-dark" variant="text"></v-btn>
            <v-btn class="mx-2 text-white" variant="tonal" v-if="address == ''" @click="connectWallet()">Connect</v-btn>
            <v-btn class="mx-2 text-white" variant="text" v-else @click="openSettingDialog()" icon="mdi-account"></v-btn>
            <v-btn class="text-white" @click="toggleMenu()" icon="mdi-menu" variant="text"></v-btn>
        </div>
    </div>
    <div class="my-2" v-if="showMenu">
        <v-btn class="my-2 text-white" @click="Global.navigateTo('dashboard'); showMenu = false"
            variant="text">Dashboard</v-btn>
    </div>

    <SettingDialog />
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { ref } from "vue"
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/Global'
import SettingDialog from '@/components/navbar/SettingDialog.vue'
import Wallet from "@/composables/Wallet"
import { Global } from "@/composables/Global"


const theme = useTheme()

const showMenu = ref(false)

const { settingDialog } = storeToRefs(useGlobalStore())

const openSettingDialog = () => {
    settingDialog.value = true
}

const toggleMenu = () => {
    showMenu.value = !showMenu.value
}

const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const wallet = new Wallet()
const address = wallet.address

const connectWallet = async () => {
    await wallet.connect()
}
</script>

<style scoped></style>
