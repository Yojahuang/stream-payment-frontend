<template>
    <div class="d-flex justify-start align-center">
        <div class="font-weight-bold ml-5 mr-2 text-white">Stream Payment</div>
        <v-btn class="mx-2 text-white" variant="text">Dashboard</v-btn>
    </div>
    <div class="d-flex justify-start align-center">
        <v-btn class="mx-2 text-white" @click="toggleTheme()" icon="mdi-theme-light-dark" variant="text"></v-btn>
        <v-btn class="mx-2" variant="tonal" v-if="address == ''" @click="connectWallet()">Connect</v-btn>
        <v-btn class="mx-2" variant="text" v-else @click="openSettingDialog()" prepend-icon="mdi-account">{{
            beautifyAddress
        }}</v-btn>
    </div>

    <v-dialog v-model="settingDialog">
        <v-card width="400" class="mx-auto p-2">
            <v-select class="my-2 text-white" hide-details="auto" v-model="selectedChain" density="comfortable"
                :items="['ThunderCore Testnet']">
                <template v-slot:selection="{ item }">
                    <v-avatar size="25" :image="Global.getImageURL(Chain.getChainImage(item.value))"></v-avatar>
                </template>
            </v-select>
            <v-btn class="mx-2" color="danger" v-if="address != ''" @click="disconnectWallet()">Disconnect</v-btn>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { computed, ref } from "vue"
import { useGlobalStore } from "@/stores/Global"
import { storeToRefs } from "pinia"
import Wallet from "@/composables/Wallet"
import Global from "@/composables/Global"
import Chain from "@/composables/Chain"

const settingDialog = ref(false)

const theme = useTheme()
const { selectedChain } = storeToRefs(useGlobalStore())

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

const disconnectWallet = () => {
    wallet.disconnect()
    settingDialog.value = false
}
</script>

<style scoped></style>
