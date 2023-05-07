<template>
    <div class="d-flex justify-start align-center">
        <div class="font-weight-bold ml-5 mr-2 text-white" @click="Global.navigateTo('')">Stream Payment</div>
        <v-btn class="mx-2 text-white" @click="Global.navigateTo('dashboard')" variant="text">Dashboard</v-btn>
    </div>
    <div class="d-flex justify-start align-center">
        <v-btn class="mx-2 text-white" @click="toggleTheme()" icon="mdi-theme-light-dark" variant="text"></v-btn>
        <v-btn class="mx-2 text-white" variant="tonal" v-if="address == ''" @click="connectWallet()">Connect</v-btn>
        <v-btn class="mx-2 text-white" variant="text" v-else @click="openSettingDialog()" prepend-icon="mdi-account">{{
            beautifyAddress
        }}</v-btn>
    </div>

    <SettingDialog />
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { computed } from "vue"
import { useGlobalStore } from "@/stores/Global"
import { storeToRefs } from "pinia"
import SettingDialog from './SettingDialog.vue'
import Wallet from "@/composables/Wallet"
import Global from "@/composables/Global"

const theme = useTheme()
const { settingDialog } = storeToRefs(useGlobalStore())

const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const openSettingDialog = () => {
    settingDialog.value = true
}

const wallet = new Wallet()
const address = wallet.address

const connectWallet = async () => {
    await wallet.connect()
}

const beautifyAddress = computed(() => {
    const addr = address.value
    if (addr == '') return ''
    const length = addr.length
    return addr.substring(0, 4) + '...' + addr.substring(length - 4, length)
})
</script>

<style scoped></style>
